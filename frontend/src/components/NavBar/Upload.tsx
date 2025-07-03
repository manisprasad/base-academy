// components/UserDropdown.tsx
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
import { FaBookOpen } from "react-icons/fa";
import { RiVideoUploadFill } from "react-icons/ri";


const Upload: React.FC = () => {
    const navigate = useNavigate();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="w-10 h-10 cursor-pointer border hover:shadow-lg transition">
                    <AvatarFallback className="text-base font-bold uppercase ">
                      <RiVideoUploadFill />
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56 mt-2 rounded-xl shadow-xl border">
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
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default Upload;
