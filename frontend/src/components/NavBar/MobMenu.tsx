import { useState } from "react"
import { motion } from "framer-motion"
import { Menu, X, ChevronDown } from "lucide-react"
import type { MenuItem } from "./utils"
import { Link } from "react-router-dom"

interface MobMenuProps {
  Menus: MenuItem[]
}

export default function MobMenu({ Menus }: MobMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [clickedIndex, setClickedIndex] = useState<number | null>(null)

  const toggleDrawer = () => {
    setIsOpen((prev) => !prev)
    setClickedIndex(null)
  }

  const subMenuDrawer = {
    enter: {
      height: "auto",
      overflow: "hidden",
      transition: { duration: 0.3 },
    },
    exit: {
      height: 0,
      overflow: "hidden",
      transition: { duration: 0.2 },
    },
  }

  return (
    <div>
      <button className="lg:hidden z-[999] relative" onClick={toggleDrawer}>
        {isOpen ? <X /> : <Menu />}
      </button>

      <motion.div
        className="fixed left-0 right-0 top-16 h-screen bg-[#18181A] text-white p-6 pb-20 backdrop-blur overflow-y-auto z-50"
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? "0%" : "-100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <ul className="space-y-2">
          {Menus.map(({ name, subMenu }, i) => {
            const isOpenSubMenu = clickedIndex === i
            const hasSubMenu = Array.isArray(subMenu) && subMenu.length > 0

            return (
              <li key={name}>
                <span
                  className="flex items-center justify-between p-4 hover:bg-white/5 rounded-md cursor-pointer"
                  onClick={() => setClickedIndex(isOpenSubMenu ? null : i)}
                >
                  {name}
                  {hasSubMenu && (
                    <ChevronDown
                      className={`ml-2 transition-transform ${isOpenSubMenu ? "rotate-180" : ""}`}
                    />
                  )}
                </span>

                {hasSubMenu && (
                  <motion.ul
                    initial="exit"
                    animate={isOpenSubMenu ? "enter" : "exit"}
                    variants={subMenuDrawer}
                    className="ml-6 space-y-1"
                  >
                    {subMenu.map(({link, name, icon: Icon }) => (
                      <Link
                        to={`${link}`}
                        key={name}
                        className="flex items-center gap-2 p-2 rounded-md hover:bg-white/5 cursor-pointer"
                      >
                        {Icon && <Icon size={17} />}
                        {name}
                      </Link>
                    ))}
                  </motion.ul>
                )}
              </li>
            )
          })}
        </ul>
      </motion.div>
    </div>
  )
}
