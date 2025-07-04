import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, GraduationCap, IndianRupee } from "lucide-react"

// Type definition based on your schema
type NotesCardProps = {
  title: string
  des: string
  subject?: string
  classes?: string
  isFree: boolean
  price?: number
  thumbnail?: string
}

const NotesCard: React.FC<NotesCardProps> = ({ title, des, subject, classes, isFree, price, thumbnail }) => {
  return (
    <Card className="group w-full max-w-sm border-0 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden rounded-2xl">
      {/* Thumbnail Section */}
      <div className="relative overflow-hidden">
        {thumbnail ? (
          <div className="relative h-48 sm:h-52 lg:h-48 xl:h-52">
            <img
              src={thumbnail || "/placeholder.svg"}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ) : (
          <div className="h-48 sm:h-52 lg:h-48 xl:h-52 bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 flex items-center justify-center">
            <BookOpen className="h-16 w-16 text-gray-400" />
          </div>
        )}

        {/* Price Badge Overlay */}
        <div className="absolute top-3 right-3">
          <Badge
            variant={isFree ? "default" : "secondary"}
            className={`${
              isFree
                ? "bg-green-500 hover:bg-green-600 text-white shadow-lg"
                : "bg-white/90 text-gray-900 shadow-lg backdrop-blur-sm"
            } px-3 py-1 text-xs font-semibold rounded-full border-0`}
          >
            {isFree ? (
              "FREE"
            ) : (
              <span className="flex items-center gap-1">
                <IndianRupee className="h-3 w-3" />
                {price}
              </span>
            )}
          </Badge>
        </div>
      </div>

      {/* Content Section */}
      <CardHeader className="">
        <CardTitle className="text-lg sm:text-xl font-bold  line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors duration-200">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="">
        {/* Description */}
        <p className="text-sm sm:text-base  line-clamp-3 leading-relaxed">{des}</p>

        {/* Subject and Class Badges */}
        <div className="flex flex-wrap gap-2 pt-2">
          {subject && (
            <Badge
              variant="outline"
              className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 px-3 py-1 text-xs font-medium rounded-full transition-colors duration-200"
            >
              <BookOpen className="h-3 w-3 mr-1" />
              {subject}
            </Badge>
          )}
          {classes && (
            <Badge
              variant="outline"
              className="bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 px-3 py-1 text-xs font-medium rounded-full transition-colors duration-200"
            >
              <GraduationCap className="h-3 w-3 mr-1" />
              Class {classes}
            </Badge>
          )}
        </div>

        {/* Bottom Action Area */}
        {/* <div className="pt-2 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 font-medium">Study Material</span>
            <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
          </div>
        </div> */}
      </CardContent>
    </Card>
  )
}

export default NotesCard
