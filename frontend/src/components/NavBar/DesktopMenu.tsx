import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // ✅ REACT ROUTER
import type { MenuItem } from "./utils";

export default function DesktopMenu({ menu }: { menu: MenuItem }) {
  const [isHover, toggleHover] = useState(false);
  const toggleHoverMenu = () => toggleHover(!isHover);

  const subMenuAnimate = {
    enter: { opacity: 1, rotateX: 0, transition: { duration: 0.5 }, display: "block" },
    exit: {
      opacity: 0,
      rotateX: -15,
      transition: { duration: 0.5 },
      transitionEnd: { display: "none" },
    },
  };

  const hasSubMenu = menu?.subMenu?.length;

  return (
    <motion.li
      className="group/link"
      onMouseEnter={toggleHoverMenu}
      onMouseLeave={toggleHoverMenu}
      key={menu.name}
    >
      <span  className="flex items-center gap-1 hover:bg-muted px-3 py-1 rounded-xl cursor-pointer transition-colors">
        {
          !hasSubMenu ? <Link to={menu.link || "/"} >{menu.name} </Link> : menu.name
        }
        {hasSubMenu && (
          <ChevronDown className="mt-[0.6px] group-hover/link:rotate-180 duration-200" />
          
        )}
      </span>

      {hasSubMenu && (
        <motion.div
          className="sub-menu mt-2 bg-popover text-popover-foreground shadow-lg rounded-xl p-4 z-50 absolute backdrop-blur-lg border border-border"
          initial="exit"
          animate={isHover ? "enter" : "exit"}
          variants={subMenuAnimate}
        >
          <div
            className={`grid gap-6 ${
              menu.gridCols === 3
                ? "grid-cols-3"
                : menu.gridCols === 2
                ? "grid-cols-2"
                : "grid-cols-1"
            }`}
          >
            {menu.subMenu?.map((submenu, i) => (
              <Link to={submenu.link ?? "#"} key={i}>
                <div className="relative p-2 rounded-md transition-all cursor-pointer hover:bg-muted/50 border border-transparent hover:border-muted">
                  {menu.gridCols && menu.gridCols > 1 && menu.subMenuHeading?.[i] && (
                    <p className="text-sm mb-3 text-muted-foreground">
                      {menu.subMenuHeading[i]}
                    </p>
                  )}
                  <div className="flex items-center gap-x-4 group/menubox">
                    <div className="w-fit p-2 rounded-md transition-colors group-hover/menubox:bg-muted group-hover/menubox:text-foreground">
                      {submenu.icon && <submenu.icon />}
                    </div>
                    <div>
                      <h6 className="font-semibold">{submenu.name}</h6>
                      <p className="text-sm text-muted-foreground">{submenu.desc}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </motion.li>
  );
}
