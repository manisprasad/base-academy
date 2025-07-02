import React from 'react';
import * as Avatar from '@radix-ui/react-avatar';
import { Button } from '../ui/button';
import { Pencil } from 'lucide-react';

type ProfileAvatarProps = {
  name: string;
  role: number | string;
};

const getInitial = (name: string) => {
  return name?.charAt(0).toUpperCase() || '?';
};

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ name, role }) => {
  const initial = getInitial(name);

  return (
    <div className="flex flex-col items-center gap-4">
      <Avatar.Root className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
        <Avatar.Fallback className="text-gray-700 font-semibold text-4xl">
          {initial}
        </Avatar.Fallback>
      </Avatar.Root>
      <div>
        <div className=" font-medium text-3xl">{name}</div>
        <div className="text-md text-gray-500 text-center">{role === 5150 ? "ADMIN" : "Student"}</div>
      </div>
     <Button 
     className='absolute top-0 right-5 mt-28 cursor-pointer hover:text-primary hover:scale-110 transition-all duration-300'
     variant={"secondary"}
     > 
        <Pencil />
        Edit
    </Button>
    </div>
  );
};

export default ProfileAvatar;
