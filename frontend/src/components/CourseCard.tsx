import { useState } from "react";
import { Clock, ExternalLink, Eye, Pencil, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Course } from "../types/courses";
import { useAuth } from "@/hooks/useAuth";
import { RiDeleteBin5Line } from "react-icons/ri";
import ConfirmModal from "./ConfirmModal";

interface CourseCardProps {
  course: Omit<Course, "courseContent">;
  onCourseClick?: (courseId: string) => void;
  onEditClick?: (courseId: string) => void;
  onDeleteClick?: (courseId: string) => void;
  className?: string;
}

export function CourseCard({ course, onCourseClick, onDeleteClick, onEditClick }: CourseCardProps) {
  const auth = useAuth();
  const [imageError, setImageError] = useState(false);

  const formatPrice = (price: number, isFree: boolean) => {
    return isFree ? (
      <span className="px-2 py-0.5 text-sm font-semibold text-green-600 bg-green-100 rounded">
        Free
      </span>
    ) : (
      <span className="px-2 py-0.5 text-sm font-semibold text-primary bg-muted rounded">
        ₹{price}
      </span>
    );
  };

  const formatDuration = (minutes?: number) => {
    if (!minutes) return null;
    return minutes > 60 ? `${Math.floor(minutes / 60)}h` : `${minutes}m`;
  };

  const formatCount = (count: number) => {
    return 10; // override for demo
    if (count > 999999) return `${(count / 1000000).toFixed(1)}M`;
    if (count > 999) return `${(count / 1000).toFixed(1)}K`;
    return count;
  };

  const [open, setOpen] = useState(false);
  const [pendingDeleteCourseId, setPendingDeleteCourseId] = useState<string | null>(null);


  const levelColors = {
    beginner: "bg-emerald-500 text-white dark:bg-emerald-400 dark:text-black",
    intermediate: "bg-amber-500 text-white dark:bg-amber-400 dark:text-black",
    advanced: "bg-rose-500 text-white dark:bg-rose-400 dark:text-black",
  };


  return (
    <div
      onClick={() => onCourseClick?.(course._id)}
      className={cn(
        "group relative rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-lg transition-shadow cursor-pointer flex flex-col h-full",
      )}
    >
      {/* Thumbnail */}
      <div className="relative h-36 bg-muted">
        <img
          src={imageError ? "/placeholder.svg" : course.courseThumbnail}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          onError={() => setImageError(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

        <Badge className={`absolute scale-75 top-0 left-0 text-xs capitalize ${levelColors[course.level] || "bg-primary"}`}>
          {course.level}
        </Badge>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col justify-between flex-grow space-y-3">
        <div className="space-y-1">
          <h3 className="text-sm font-semibold line-clamp-2">{course.title}</h3>
          <p className="text-xs text-muted-foreground line-clamp-2">
            {course.shortDescription || course.description.substring(0, 80)}
          </p>
        </div>

        {/* Stats */}
        <div className="flex justify-between items-center text-xs text-muted-foreground mt-1">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {formatCount(course.viewsCount)}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {formatCount(course.enrolledUserCount)}
            </span>
          </div>
          {course.duration && (
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {formatDuration(course.duration)}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-center gap-2 items-center pt-2">
          <Badge variant="outline" className="text-sm px-2 py-0.5">
            {formatPrice(course.price, course.isFree)}
          </Badge>
          <Button
            size="sm"
            variant="default"
            className="h-8 text-xs"
            onClick={(e) => {
              e.stopPropagation();
              onCourseClick?.(course._id);
            }}
          >
            <ExternalLink className="w-4 h-4 mr-1" />
            {course.isFree ? "Enroll" : "View"}
          </Button>

          {
            auth.user?.roles === 5150 && (
              <div className=" flex justify-center items-center gap-2">
                <Button
                  size="sm"

                  variant="secondary"
                  className="h-8 text-xs px-5 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditClick?.(course._id);
                  }}
                >
                  <Pencil className="w-4 h-4 mr-1" />

                </Button>
                <Button

                  variant="destructive"
                  className=" cursor-pointer rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPendingDeleteCourseId(course._id); // set the course to delete
                    setOpen(true); // open modal
                  }}
                >
                  <RiDeleteBin5Line className="w-4 text-black " />

                </Button>
              </div>
            )
          }
        </div>
      </div>
      <ConfirmModal
        title="Delete this item?"
        des="This action cannot be undone."
        open={open}
        setOpen={setOpen}
        onCancel={() => {
          setOpen(false);
          setPendingDeleteCourseId(null);
        }}
        onConfirm={() => {
          if (pendingDeleteCourseId) {
            onDeleteClick?.(pendingDeleteCourseId);
          }
          setOpen(false);
          setPendingDeleteCourseId(null);
        }}
      />
    </div>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
