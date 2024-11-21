import {
  Bell,
  CircleUser,
  Home,
 

  Menu,
  
  Package2,
  
  Users,
} from "lucide-react"


import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Link } from "react-router-dom"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import Logo from '@/assets/NZ.jpg'
interface Items {
  name: string;
  icon: JSX.Element;
  to: string
}

interface SidebarProps {
  children: React.ReactNode;
}

const itemList: Items[] = [
  { name: "Students", icon: <Home className="h-4 w-4" />, to: '/teacher/students' },
  { name: "Parents", icon: <Users className="h-4 w-4" />, to: '/teacher/parents' },
  { name: "Class", icon: <Users className="h-4 w-4" />, to: '/teacher/class' },
  { name: "Subject", icon: <Users className="h-4 w-4" />, to: '/teacher/subject' },
  { name: "Assignment", icon: <Users className="h-4 w-4" />, to: '/teacher/assignment' },
  { name: "Marks", icon: <Users className="h-4 w-4" />, to: '/teacher/marks' },
  { name: "Exam", icon: <Users className="h-4 w-4" />, to: '/teacher/exam' },
]


export function Sidebar({ children }: SidebarProps) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link
              to="/"
              
              className="flex items-center gap-2 font-semibold"
            >
              {/* Replace Package2 with an image */}
              <img
                src={Logo} // Replace this with your image URL or storage path
                alt="GHSS UDINUR Logo"
                className="h-11 w-11"
              />
              <span className="">GHSS UDINUR</span>
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {itemList.map((item, id) => (
                <Link
                  key={id}
                 
                  to={item.to}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="mt-auto p-4"></div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  
                  to={"s"}
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                {itemList.map((item, id) => (
                  <Link
                    key={id}
                    
                    to={item.to}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto"></div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <Breadcrumb className="hidden md:flex">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="#">Dashboard</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="#">Students</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>All Students</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full"
              >
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link to="./profile">
                <DropdownMenuItem>Profile</DropdownMenuItem>
              </Link>

              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        {children}
      </div>
    </div>
  );
}
