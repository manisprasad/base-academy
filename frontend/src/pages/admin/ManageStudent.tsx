
import { FaPlus } from 'react-icons/fa';
import { DataTable } from '@/components/manageStudentCard/StudentDataTable';
import { type Student, columns } from '@/components/manageStudentCard/columns';
import { useFetch } from '@/hooks/useFetchHook';
import Loading from '@/components/loading/Loading';

const ManageStudent = () => {
  const {data,loading,error} = useFetch<{data: Student[]}>('/api/user/admin', {
    method: 'GET'
  });
  console.log(data);
  if(loading){
    return <Loading />;
  }
  if(error){
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div className="mt-23 flex flex-col items-center min-h-screen p-4">
      <h2 className="text-3xl font-semibold mb-4">Manage Students</h2>
      <p className="mb-6 text-center">
        Here you can manage student accounts, view their progress, and more.
      </p>

      <div className="shadow-md rounded-lg ">
        <button className="bg-blue-500 flex items-center gap-2 text-white px-4 py-2 rounded hover:bg-blue-600">
          <FaPlus />
          Add New Student
        </button>
      </div>

      <div className="container mx-auto py-10 w-full">
       {
        data && data.data.length > 0 ? (
          <DataTable columns={columns} data={data.data} />
        ) : (
          <p className="text-gray-500">No students found.</p>
        )
       }
      </div>
    </div>
  );
};

export default ManageStudent;
