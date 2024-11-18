import {
    TableCell,
    TableRow,
} from "@/components/ui/table"

import {
MoreHorizontal,
PlusCircle,
} from "lucide-react"

import {
DropdownMenu,
DropdownMenuContent,
DropdownMenuItem,
DropdownMenuLabel,
DropdownMenuPortal,
DropdownMenuSeparator,
DropdownMenuSub,
DropdownMenuSubContent,
DropdownMenuSubTrigger,
DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useNavigate } from 'react-router-dom';


import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { memo } from "react"

interface Students{
    id:number,
    fullName:string,
    profilePicture:string,
    grade:string,   
    status:string,
    teacher:string,
    joinedAt:Date
}
interface StudentListComponentProps {
    students: Students[];
  }

export const StudentListComponent: React.FC<StudentListComponentProps> = memo(({ students })=>{
    const navigate = useNavigate();
    return (
        <>
        {students.map(student => (
            <TableRow key={student.id}>
            <TableCell className="hidden sm:table-cell">
            <Avatar>
                <AvatarImage src={student.profilePicture} />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            </TableCell>
            <TableCell className="font-medium">
                {student.fullName}
            </TableCell>
            <TableCell>
                <Badge variant="outline">{student.status}</Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell">
                {student.grade}
            </TableCell>
            <TableCell className="hidden md:table-cell">
                {student.teacher}
            </TableCell>
            <TableCell className="hidden md:table-cell">
                {student.joinedAt}
            </TableCell>
            <TableCell>
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                    aria-haspopup="true"
                    size="icon"
                    variant="ghost"
                    >
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={()=>navigate('/teacher/parents/1')}>View</DropdownMenuItem>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger className="focus:text-white">
                        <span>Mail</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                            <DropdownMenuItem>
                            <span>Email</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                            <span>Whatsapp</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            <span>More...</span>
                            </DropdownMenuItem>
                        </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuItem className="text-red-500 focus:bg-red-600">Delete</DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
            </TableRow>
        ))}
            
        </>
    )
})