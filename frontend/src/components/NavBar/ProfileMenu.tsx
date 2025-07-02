// components/UserDropdown.tsx
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    User,
    MessageSquare,
    LogOut,
    LayoutDashboardIcon,
    Settings2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FaBookOpen } from "react-icons/fa";
import type { AuthContextType } from "@/types/user";
import { RiAdminFill } from "react-icons/ri";

interface UserDropdownProps {
    auth: AuthContextType;
    onLogout: () => void;
}

const ProfileMenu: React.FC<UserDropdownProps> = ({ auth, onLogout }) => {
    const navigate = useNavigate();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="w-10 h-10 cursor-pointer border hover:shadow-lg transition">
                    <AvatarFallback className="text-base font-bold uppercase bg-primary text-primary-foreground">
                        {auth.user?.name?.charAt(0)}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56 mt-2 rounded-xl shadow-xl border">
                <DropdownMenuItem
                    onClick={() => navigate('/profile')}
                    className="text-base gap-2"
                >
                    <User size={18} /> Profile
                </DropdownMenuItem>
                  <DropdownMenuItem
                            onClick={() => navigate('/student/my-courses')}
                            className="text-base gap-2"
                        >
                            <FaBookOpen size={18} /> My Courses
                </DropdownMenuItem>

                {
                    auth.user?.roles === 5150 ? (
                            <DropdownMenuItem
                            onClick={() => navigate('/admin/dashboard')}
                            className="text-base gap-2"
                        >
                            <LayoutDashboardIcon size={18} /> Admin Dashboard
                        </DropdownMenuItem>
                       
                    ) : null
                }
              

              {
                    auth.user?.roles === 5150 ? (
                        <DropdownMenuItem
                            onClick={() => navigate('/admin/settings')}
                            className="text-base gap-2"
                        >
                            <RiAdminFill size={18} /> Site Settings
                        </DropdownMenuItem>
                    ) : null
              }

            
                        <DropdownMenuItem
                            onClick={() => navigate('/settings')}
                            className="text-base gap-2"
                        >
                            <Settings2 size={18} /> Settings
                        </DropdownMenuItem>
                   






                <DropdownMenuItem
                    onClick={() => navigate('/feedback')}
                    className="text-base gap-2"
                >
                    <MessageSquare size={18} /> Feedback
                </DropdownMenuItem>


                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={onLogout}
                    className="text-base gap-2 text-red-600 font-semibold"
                >
                    <LogOut size={18} /> Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ProfileMenu;
