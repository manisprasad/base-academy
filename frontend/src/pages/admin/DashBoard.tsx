// pages/Dashboard.tsx or any parent component
import {
  DollarSign,
  Briefcase,
  Award,
  FileClock,
} from 'lucide-react';
import { DashboardCard } from '@/components/adminDashBoard/DashBoardCard';
import DateRangeToggleGroup from '@/components/adminDashBoard/ToggleTab';
import { useFetch } from '@/hooks/useFetchHook';
import { type CoursesT } from '../Courses';
import { CourseCard } from '@/components/CourseCard';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Loading from '@/components/loading/Loading';
import { toast } from 'sonner';
import { axiosInstance } from '@/api/axios';


export const Dashboard = () => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState<string>("");

   const { data, error, loading } = useFetch<CoursesT[]>("/api/courses/", {
    method: "GET",
  });

  const handleDeleteCourse = async (courseId: string) => {
    try {
      const response = await axiosInstance.delete(`/api/courses/${courseId}`);
     

      if (response.status !== 200) {
        toast.error('Failed to delete course');
        return;
      }

      
      toast.success('Course deleted successfully');
      //refresh the page
   
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };


  if(loading){
    return <Loading />
  }

  console.log(data, error, loading);
  return (
    <div className="mt-22 p-5 ">
      <div className='flex flex-wrap gap-4 w-full justify-center items-center'>
        <DashboardCard
        title="Total Revenue"
        description="+20.1% from last month"
        value="$45,231.89"
        trendColor="green"
        icon={<DollarSign className="size-5 lg:size-6" />}
      />
      <DashboardCard
        title="Active Projects"
        description="+5.02% from last month"
        value="1,423"
        trendColor="green"
        icon={<Briefcase className="size-5 lg:size-6" />}
      />
      <DashboardCard
        title="New Leads"
        description="-3.58% from last month"
        value="3,500"
        trendColor="red"
        icon={<Award className="size-5 lg:size-6" />}
      />
      <DashboardCard
        title="Time Spent"
        description="-3.58% from last month"
        value="168h 40m"
        trendColor="red"
        icon={<FileClock className="size-5 lg:size-6" />}
      />
      </div>

      <div className='flex flex-wrap gap-4 w-full justify-center items-center mt-5'>
          <input
                   onChange={(e) => setSearchQuery(e.target.value)}
                    value={searchQuery}
                    type="search"
                    placeholder="🔍 Search for links..."
                    className="w-full max-w-md px-4 py-3 border border-input rounded-lg bg-background mb-3  text-sm shadow-sm focus:outline-none focus:ring-1  focus:border-transparent transition-all"
                />

        <DateRangeToggleGroup />
      </div>
        <h1 className='text-center text-3xl font-bold'>Courses</h1>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5 p-5'>
        {
          data && data.length > 0 ? (
            data.map((course) => (
              <CourseCard
                key={course._id}
                course={course}
                onCourseClick={() => navigate(`/course/${course._id}`)}
                onEditClick={() =>  navigate(`/admin/upload/`, {
                  state: { courseId: course._id}
                })}
                onDeleteClick={handleDeleteCourse}
              />
            ))
          ) : (
            <div className="flex items-center justify-center w-full p-6">
              <p className="text-gray-500">No courses available</p>
            </div>
          )
        }
      </div>


    </div>
  );
};
