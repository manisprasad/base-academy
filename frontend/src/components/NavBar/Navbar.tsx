import { Menus } from "./utils";
import Logo from "../../../base_academy_logo.png";
import DesktopMenu from "./DesktopMenu";
import MobMenu from "./MobMenu";
import { ModeToggle } from "../mode-toggle";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "../ui/button";
import { Link} from "react-router-dom";

import ProfileMenu from "./ProfileMenu";
import { RiVideoUploadFill } from "react-icons/ri";

export default function NavBar() {
    const auth = useAuth();

  const handleLogout = () => {
    // logout logic here
    console.log("Logging out...");
  };

  return (
    <div className="">


      <header className="h-16 mt-9  text-[15px] fixed inset-x-0 top-0 flex-center bg-background/80 backdrop-blur border-b border-border z-50">
        <nav className="px-3.5 flex-center-between w-full max-w-7xl mx-auto">
          {/* Logo + Title */}
          <Link to={'/'} className="flex-center gap-x-3 z-[999] relative">
            <img src={Logo} alt="Logo" className="size-8" />
            <h3 className="text-lg font-semibold text-foreground hidden sm:block lg:block md:block">Base Academy</h3>
          </Link>

          {/* Desktop Menu */}
          <ul className="gap-x-1 lg:flex-center lg:flex hidden">
            {Menus.map((menu) => (
              <DesktopMenu menu={menu} key={menu.name} />
            ))}
          </ul>

          {/* Right Controls */}
          <div className="flex-center gap-x-5 z-[999] relative">
           {
            !auth.user? (
              <>
               <Button
              aria-label="sign-in"
              variant={"default"}
              asChild
            >
              <Link to="/login">
                Login
              </Link>
            </Button>
            <Button
              variant={"outline"}
              aria-label="sign-up"
              asChild
            >
              <Link to="/register">
                Sign Up
              </Link>
            </Button>
              </>
            ) :  <div className="flex items-center justify-center gap-4">
             {
              auth.user?.roles === 5150 && (
                <div>
                  <Button
                  variant="outline"
                  className="hidden sm:flex md:flex lg:flex items-center gap-2"
                  asChild
                >
                  <Link to="/admin/upload">
                    <RiVideoUploadFill className="size-4" />
                    Upload Course
                  </Link>
                </Button>

                 <Link to="/admin/upload" className="lg:hidden md:hidden sm:hidden">
                    <RiVideoUploadFill className="size-4" />
                  </Link>
                </div>

                
              )
             }
              <ProfileMenu auth={auth} onLogout={handleLogout} />
            </div>
           }
            <ModeToggle />
            <div className="lg:hidden">
              <MobMenu Menus={Menus} />
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}







// import type React from "react"
// import { useState, useEffect } from "react"
// import { Menu, ChevronRight } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import { Link } from "react-router-dom"

// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
// } from "@/components/ui/navigation-menu"
// import { cn } from "@/lib/utils"
// import { useAuth } from "@/hooks/useAuth"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

// // Course categories and their content
// const courseCategories = [
//   {
//     name: "CMA (Syllabus 2022)",
//     href: "/courses/cma-2022",
//     content: [
//       { name: "Foundation", href: "/courses/cma-2022/foundation" },
//       { name: "Intermediate", href: "/courses/cma-2022/intermediate" },
//       { name: "Final", href: "/courses/cma-2022/final" },
//     ],
//   },
//   {
//     name: "SKILL COURSES",
//     href: "/courses/skill",
//     content: [
//       { name: "Excel Mastery", href: "/courses/skill/excel" },
//       { name: "Financial Modeling", href: "/courses/skill/financial-modeling" },
//       { name: "Data Analytics", href: "/courses/skill/data-analytics" },
//     ],
//   },
//   {
//     name: "CA (New Syllabus)",
//     href: "/courses/ca-new",
//     content: [
//       { name: "Foundation", href: "/courses/ca-new/foundation" },
//       { name: "Intermediate", href: "/courses/ca-new/intermediate" },
//       { name: "Final", href: "/courses/ca-new/final" },
//     ],
//   },
//   {
//     name: "SCHOOL (CLASS 11/12)",
//     href: "/courses/school",
//     content: [
//       { name: "Commerce", href: "/courses/school/commerce" },
//       { name: "Science", href: "/courses/school/science" },
//       { name: "Arts", href: "/courses/school/arts" },
//     ],
//   },
//   {
//     name: "RENEWAL",
//     href: "/courses/renewal",
//     content: [
//       { name: "CMA Renewal", href: "/courses/renewal/cma" },
//       { name: "CA Renewal", href: "/courses/renewal/ca" },
//       { name: "Other Renewals", href: "/courses/renewal/other" },
//     ],
//   },
//   {
//     name: "GRADUATION",
//     href: "/courses/graduation",
//     content: [
//       { name: "B.Com", href: "/courses/graduation/bcom" },
//       { name: "BBA", href: "/courses/graduation/bba" },
//       { name: "Other Courses", href: "/courses/graduation/other" },
//     ],
//   },
//   {
//     name: "BASIC MODULE",
//     href: "/courses/basic",
//     content: [
//       { name: "Accounting Basics", href: "/courses/basic/accounting" },
//       { name: "Finance Fundamentals", href: "/courses/basic/finance" },
//       { name: "Business Essentials", href: "/courses/basic/business" },
//     ],
//   },
// ]

// // Custom component for the courses mega menu
// const CoursesMenu = () => {
//   const [activeCategory, setActiveCategory] = useState(courseCategories[0])

//   return (
//     <NavigationMenu className="border-2 ">
//       <NavigationMenuList>
//         <NavigationMenuItem>
//           <NavigationMenuTrigger className="text-sm">Courses</NavigationMenuTrigger>
//           <NavigationMenuContent className="w-[800px] md:w-[900px] lg:w-[1400px] overflow">
//             <div className="grid grid-cols-5 gap-0  ">
//               {/* Left panel - Categories */}
//               <div className=" border-r">
//                 <ul className="p-2 space-y-1">
//                   {courseCategories.map((category) => (
//                     <li key={category.name}>
//                       <button
//                         onClick={() => setActiveCategory(category)}
//                         className={cn(
//                           "w-full text-left px-3 py-2 rounded-md text-sm flex justify-between items-center",
//                           activeCategory.name === category.name ? "bg-muted font-medium" : "hover:bg-muted/50",
//                         )}
//                       >
//                         {category.name}
//                         <ChevronRight className="h-4 w-4 opacity-50" />
//                       </button>
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               {/* Right panel - Content */}
//               <div className="col-span-3 p-4">
//                 <h3 className="font-medium mb-3">{activeCategory.name}</h3>
//                 <div className="grid grid-cols-2 gap-2">
//                   {activeCategory.content.map((item) => (
//                     <NavigationMenuLink asChild key={item.name}>
//                       <Link to={item.href} className="block p-2 hover:bg-muted rounded-md text-sm">
//                         {item.name}
//                       </Link>
//                     </NavigationMenuLink>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </NavigationMenuContent>
//         </NavigationMenuItem>
//       </NavigationMenuList>
//     </NavigationMenu>
//   )
// }

// // Mobile version of the courses menu
// const MobileCoursesMenu = () => {
//   const [activeCategory, setActiveCategory] = useState(courseCategories[0])

//   return (
//     <div className="py-2 px-1">
//       <div className="space-y-4">
//         {/* Categories */}
//         <div className="space-y-1">
//           {courseCategories.map((category) => (
//             <div key={category.name} className="space-y-2">
//               <button
//                 onClick={() => setActiveCategory(category)}
//                 className={cn(
//                   "w-full text-left px-3 py-2 rounded-md text-sm flex justify-between items-center",
//                   activeCategory.name === category.name ? "bg-muted font-medium" : "hover:bg-muted/50",
//                 )}
//               >
//                 {category.name}
//                 <ChevronRight className="h-4 w-4 opacity-50" />
//               </button>

//               {/* Show content for active category */}
//               {activeCategory.name === category.name && (
//                 <div className="pl-6 space-y-1 border-l ml-4">
//                   {category.content.map((item) => (
//                     <Link
//                       key={item.name}
//                       to={item.href}
//                       className="block py-1.5 px-3 text-sm hover:bg-muted rounded-md"
//                     >
//                       {item.name}
//                     </Link>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }

// const Navbar: React.FC = () => {
//   const [isScrolled, setIsScrolled] = useState(false)


//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 10)
//     }
//     window.addEventListener("scroll", handleScroll)
//     return () => window.removeEventListener("scroll", handleScroll)
//   }, [])

//   const navLinks = [
//     { name: "About", href: "/about" },
//     { name: "Contact", href: "/contact" },
//     { name: "Blogs", href: "/blog" },
//     { name: "FAQs", href: "/faqs" },
//     { name: "Quiz", href: "/quiz" },
//   ]

//   const profileLinks = [
//     {
//       name: auth.user?.roles === 5150 ? "Upload Course" : "My Courses",
//       href: auth.user?.roles === 5150 ? "/admin/upload" : "/student/my-courses",
//     },
//     { name: "Settings", href: "/settings" },
//     { name: "Logout", href: "/logout" },
//   ]

//   if (auth.loading) return <div>Loading...</div>

//   return (
//     <header
//       className={cn(
//         "fixed top-2 left-0 right-0 z-50 px-4 w-11/12 mx-auto rounded-full transition-all",
//         isScrolled ? "bg-background/10 shadow-lg backdrop-blur-lg" : "bg-transparent",
//       )}
//     >
//       <div className="container-custom py-1 flex items-center justify-between">
//         <Link to="/" className="flex items-center gap-2">
//           <img src={logo || "/placeholder.svg"} alt="Base Academy Logo" width="40px" />
//           <span className="font-bold text-base">Base Academy</span>
//         </Link>

//         {/* Desktop Navigation */}
//         <div className="hidden md:flex items-center gap-6 ">
//           <NavigationMenu>
//             <NavigationMenuList className="flex gap-4">
//               <NavigationMenuItem >
//                 <CoursesMenu />
//               </NavigationMenuItem>
//               {navLinks.map((link) => (
//                 <NavigationMenuItem key={link.name}>
//                   <Link
//                     to={link.href}
//                     className="text-sm font-medium hover:text-primary hover:border-b-2 border-primary"
//                   >
//                     {link.name}
//                   </Link>
//                 </NavigationMenuItem>
//               ))}
//             </NavigationMenuList>
//           </NavigationMenu>
//           <div className="flex items-center gap-4">
//             {auth.user ? (
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button variant="ghost" className="h-8 w-8 p-0 rounded-full">
//                     <Avatar>
//                       <AvatarFallback>{auth.user.name.charAt(0)}</AvatarFallback>
//                     </Avatar>
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent align="end" className="w-56">
//                   <div className="p-2">
//                     <p className="text-sm font-medium">{auth.user.name}</p>
//                   </div>
//                   <DropdownMenuSeparator />
//                   {profileLinks.map((link) => (
//                     <DropdownMenuItem key={link.name} asChild>
//                       <Link to={link.href}>{link.name}</Link>
//                     </DropdownMenuItem>
//                   ))}
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             ) : (
//               <>
//                 <Button variant="outline">
//                   <Link to="/login">Login</Link>
//                 </Button>
//                 <Button>
//                   <Link to="/register">Sign Up</Link>
//                 </Button>
//               </>
//             )}
//             <ModeToggle />
//           </div>
//         </div>

//         {/* Mobile Navigation */}
//         <div className="flex md:hidden items-center gap-2">
//           <ModeToggle />
//           <Sheet>
//             <SheetTrigger asChild>
//               <Button variant="ghost" className="h-8 w-8 p-0">
//                 <Menu className="h-5 w-5" />
//               </Button>
//             </SheetTrigger>
//             <SheetContent side="right" className="w-[300px] sm:w-[350px] overflow-y-auto">
//               <div className="py-4 space-y-4">
//                 <h3 className="font-medium px-4">Courses</h3>
//                 <MobileCoursesMenu />

//                 <DropdownMenuSeparator />

//                 <div className="space-y-2 px-4">
//                   {navLinks.map((link) => (
//                     <Link key={link.name} to={link.href} className="block py-2 text-sm hover:text-primary">
//                       {link.name}
//                     </Link>
//                   ))}
//                 </div>

//                 <DropdownMenuSeparator />

//                 {auth.user ? (
//                   <div className="space-y-2 px-4">
//                     <div className="py-2">
//                       <p className="text-sm font-medium">{auth.user.name}</p>
//                     </div>
//                     {profileLinks.map((link) => (
//                       <Link key={link.name} to={link.href} className="block py-2 text-sm hover:text-primary">
//                         {link.name}
//                       </Link>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="flex flex-col gap-2 px-4">
//                     <Button variant="outline" className="w-full justify-start">
//                       <Link to="/login" className="w-full text-left">
//                         Login
//                       </Link>
//                     </Button>
//                     <Button className="w-full justify-start">
//                       <Link to="/register" className="w-full text-left">
//                         Sign Up
//                       </Link>
//                     </Button>
//                   </div>
//                 )}
//               </div>
//             </SheetContent>
//           </Sheet>
//         </div>
//       </div>
//     </header>
//   )
// }

// export default Navbar
