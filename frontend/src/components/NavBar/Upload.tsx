
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
 
    NotebookTabs,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FaBookOpen, FaPlus } from "react-icons/fa";



const Upload: React.FC = () => {
    const navigate = useNavigate();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="w-10 h-10 cursor-pointer border hover:shadow-lg transition">
                    <AvatarFallback className="text-base font-bold uppercase ">
                      <FaPlus />
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="center" className="w-56 mt-2 rounded-xl shadow-xl border">
                <DropdownMenuItem
                    onClick={() => navigate('/admin/upload')}
                    className="text-base gap-2"
                >
                    <FaBookOpen size={18} /> Course
                </DropdownMenuItem>
                  <DropdownMenuItem
                            onClick={() => navigate('/admin/upload/notes')}
                            className="text-base gap-2"
                        >
                            <NotebookTabs size={18} /> Notes
                </DropdownMenuItem>
                <DropdownMenuItem
                            onClick={() => navigate('/admin/upload/test')}
                            className="text-base gap-2 "
                        >
                              <svg
                              className="bg-white"
    fill="#000000"
    height="200px"
    width="200px"
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 508 508"
    xmlSpace="preserve"
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      <g>
        <g>
          <path d="M293.7,70.302H168.1c-7.8,0-14.1,6.3-14.1,14.1c0,7.8,6.3,14.1,14.1,14.1h125.6c7.8,0,14.1-6.3,14.1-14.1 C307.8,76.602,301.5,70.302,293.7,70.302z" />
        </g>
      </g>
      <g>
        <g>
          <path d="M293.7,142.402H75.5c-7.8,0-14.1,6.3-14.1,14.1c-0.1,7.8,6.3,14.1,14.1,14.1h218.2c7.8,0,14.1-6.3,14.1-14.1 S301.5,142.402,293.7,142.402z" />
        </g>
      </g>
      <g>
        <g>
          <path d="M205.3,214.502H75.5c-7.8,0-14.1,6.3-14.1,14.1c0,7.8,6.3,14.1,14.1,14.1h129.9c7.7,0,14-6.3,14-14.1 S213.1,214.502,205.3,214.502z" />
        </g>
      </g>
      <g>
        <g>
          <path d="M173.9,358.703H75.5c-7.8,0-14.1,6.3-14.1,14.1s6.3,14.1,14.1,14.1h98.4c7.8,0,14.1-6.3,14.1-14.1 C188,365.003,181.7,358.703,173.9,358.703z" />
        </g>
      </g>
      <g>
        <g>
          <path d="M168.1,286.602H75.5c-7.8,0-14.1,6.3-14.1,14.1c-0.1,7.8,6.3,14.1,14.1,14.1h92.6c7.8,0,14.1-6.3,14.1-14.1 C182.2,292.902,175.9,286.602,168.1,286.602z" />
        </g>
      </g>
      <g>
        <g>
          <path d="M442.8,466.602c39.3-26.7,65.2-71.7,65.2-122.7c0-40-16-76.3-41.8-103l6.7-6.7l3.8,3.8c5.7,5.7,14.9,5,20,0 c5.5-5.5,5.5-14.5,0-20l-27.7-27.4c-5.5-5.5-14.4-5.5-20,0c-5.5,5.5-5.5,14.5,0,20l3.8,3.8l-8.2,8.2 c-21.7-15.2-47.5-24.6-75.5-26.4v-182.1c0-7.8-6.3-14.1-14.1-14.1H108.6c-3.7,0-7.3,1.5-10,4.1l-94.5,94.5 c-2.6,2.6-4.1,6.2-4.1,10v327.6c0,7.8,6.3,14.1,14.1,14.1h242.8c6.1,5.9,12.6,11.3,19.6,16.1l-17.7,17.7c-5.5,5.5-5.5,14.4,0,20 c4.6,4.7,14.4,5.6,20,0l23.6-23.5c17.7,7.5,37.1,11.6,57.5,11.6c20.2,0,39.5-4.1,57.1-11.5l23.5,23.5c5.5,5.5,15.3,4.6,20,0 c5.5-5.5,5.5-14.5,0-20L442.8,466.602z M94.5,48.203v46.3H48.2L94.5,48.203z M28.2,422.102v-299.4h80.4c7.8,0,14.1-6.3,14.1-14.1 v-80.4h218.2v168.8c-72.8,9.4-129.2,71.6-129.2,146.9c0,28.7,8.3,55.4,22.5,78.2H28.2z M359.8,463.902 c-66.1,0-119.9-53.8-119.9-120s53.8-120,119.9-120s119.9,53.8,119.9,120C479.8,410.102,426,463.902,359.8,463.902z" />
        </g>
      </g>
      <g>
        <g>
          <path d="M398.3,329.703h-24.6v-66.8c0-7.8-6.3-14.1-14.1-14.1c-7.8,0-14.1,6.3-14.1,14.1v80.9c0,7.8,6.3,14.1,14.1,14.1h38.7 c7.8,0,14.1-6.3,14.1-14.1C412.4,336.003,406.1,329.703,398.3,329.703z" />
        </g>
      </g>
    </g>
  </svg> Test
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default Upload;
