import ContactInfo from '@/components/adminSettings/ContactInfo';
import GeneralSettings from '@/components/adminSettings/GeneralSetting';
import SocialLinks from '@/components/adminSettings/SocialLinks';
import ProfileAvatar from '@/components/profile/ProfileAvatar'

import { useAuth } from '@/hooks/useAuth';

import {ChevronRight, Pencil,} from 'lucide-react';
import {
    Home,
    Link2,
    Share2,
    Phone,
} from 'lucide-react';
import { useState } from 'react';
import UsefulLinks from '@/components/adminSettings/UsefullLinks';



export const sidebarItems: SidebarItem[] = [
  {
    name: 'General',
    icon: <Home className="w-4 h-4" />,
    component: <GeneralSettings />,
  },
  {
    name: 'Useful Links',
    icon: <Link2 className="w-4 h-4" />,
    component: <UsefulLinks />,
  },
  {
    name: 'Social Links',
    icon: <Share2 className="w-4 h-4" />,
    component: <SocialLinks />,
  },
  {
    name: 'Contact Info',
    icon: <Phone className="w-4 h-4" />,
    component: <ContactInfo />,
  },
];


export type SidebarItem = {
    name: string;
    icon: React.ReactNode;
    component: React.ReactNode;
};

const Setting = () => {
    const auth = useAuth();
     const [activeIndex, setActiveIndex] = useState<number>(0);



    if (!auth.user || !auth.user.roles) {
        return <div className='text-center text-2xl font-semibold'>Please Login to see your profile</div>
    }

    return (
        <div className='flex flex-col items-center justify-center gap-4 mt-22 w-screen  p-3'>
            <div>
                <ProfileAvatar name={auth.user?.name} role={auth.user?.roles} key={"hello"} />
            </div>

            <div>
                <p className='text-gray-600 flex justify-center items-center gap-2 text-lg font-semibold  mb-10'>
                    <Pencil />
                    Edit Site</p>
            </div>
         


        <div className="flex flex-col md:flex-row gap-6 w-full p-5">
  <ul className="space-y-2 w-full md:w-[20%] mb-4 md:mb-0">
    {sidebarItems.map((item, index) => (
      <li
        key={index}
        className={`flex items-center gap-2 cursor-pointer px-3 py-1 rounded-md  ${
          activeIndex === index ? ' font-semibold text-primary bg-gray-500/10' : 'text-accent-foreground'
        }`}
        onClick={() => setActiveIndex(index)}
      >
        {item.icon}
        <span className='flex w-full justify-between gap-2'>
          {item.name}
          <ChevronRight />
        </span>
      </li>
    ))}
  </ul>

  <div className="flex-1 p-4 w-full md:w-[80%] border-t-2 md:border-t-0 md:border-l-2">
    {sidebarItems[activeIndex].component}
  </div>
</div>

        </div>
    )
}

export default Setting