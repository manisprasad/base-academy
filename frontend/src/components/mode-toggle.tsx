import { Moon, Settings, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/theme-provider"
import { FaCheckCircle, FaMoon, FaSun } from "react-icons/fa"

export function ModeToggle() {
  const { setTheme, theme } = useTheme()
  console.log("Current theme:", theme)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full cursor-pointer">
          <Sun className=" scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute  scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <FaSun /> Light
          {
            theme === "light" && (
              <FaCheckCircle  className="text-green-500 absolute right-0" />
            )
          }
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <FaMoon /> Dark
           {
            theme === "dark" && (
              <FaCheckCircle  className="text-green-500 absolute right-0" />
            )
          }
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
         <Settings />  System
          {
            theme === "system" && (
              <FaCheckCircle  className="text-green-500 absolute right-0" />
            )
          }
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}