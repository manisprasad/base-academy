import { type ColumnDef } from "@tanstack/react-table";
import { Clipboard, CopyIcon, Edit, Eye, Phone, Trash2, UserX } from "lucide-react";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";


import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export type Student = {
  _id: string;
  name: string;
  phone: string;
  classes: string;
  gender: "Male" | "Female" | "Others";
};

export const columns: ColumnDef<Student>[] = [
   
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="text-sm font-medium text-foreground">
        {row.getValue("name")}
      </div>
    ),
  },
  {
    accessorKey: "phone",
    header: () => (
      <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
        <Phone className="h-4 w-4" />
        Phone
      </div>
    ),
    cell: function PhoneCell({ row }) {
      const phone = row.getValue("phone") as string;
      const [isCopied, setIsCopied] = useState(false);

      const handleCopy = () => {
        navigator.clipboard.writeText(phone);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 4000);
      };

      if (!phone) {
        return <span className="text-sm text-destructive italic">N/A</span>;
      }

      return (
        <div className="flex items-center gap-2 text-sm text-foreground">
          <span>{phone}</span>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={handleCopy}
              >
                {isCopied ? (
                  <FaCheckCircle
                    className="h-4 w-4 text-green-500 transition-transform scale-110"
                    aria-label="Phone number copied"
                  />
                ) : (
                  <CopyIcon className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {isCopied ? "Copied!" : "Copy phone number"}
            </TooltipContent>
          </Tooltip>
        </div>
      );
    },
  },
  {
    accessorKey: "classes",
    header: "Class",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.getValue("classes")}
      </span>
    ),
  },
  {
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) => {
      const gender = row.getValue("gender") as Student["gender"];
      return (
        <span className="text-sm capitalize text-muted-foreground">
          {gender}
        </span>
      );
    },
  },
{
  id: "actions",
  cell: ({ row }) => {
    const student = row.original;

    const handleCopy = () => {
      navigator.clipboard.writeText(JSON.stringify(student, null, 2));
    };

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Open actions menu</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="center" className="w-44">
          <DropdownMenuLabel className="text-xs text-muted-foreground">
            Actions
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={handleCopy}>
            <Clipboard className="mr-2 h-4 w-4 text-muted-foreground" />
            Copy Details
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Edit className="mr-2 h-4 w-4 text-muted-foreground" />
            Edit
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Eye className="mr-2 h-4 w-4 text-muted-foreground" />
            View Details
          </DropdownMenuItem>

          <DropdownMenuItem className="text-yellow-600 hover:bg-yellow-500 dark:hover:bg-yellow-900">
            <UserX className="mr-2 h-4 w-4 text-yellow-600" />
            Suspend
          </DropdownMenuItem>

          <DropdownMenuItem className="text-red-600 hover:bg-red-700 dark:hover:bg-red-900">
            <Trash2 className="mr-2 h-4 w-4 text-red-600" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
}
];
