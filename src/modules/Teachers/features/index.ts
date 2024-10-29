import AuthNavigator from "./auth/authNavigators";
import { StudentNavigator } from "./students/navigator/student-navigator";
import { ParentsNavigator } from "./parents/navigator/parents-navigator";
import { ClassNavigator } from "./class/navigator/class-navigator";
import { SubjectNavigator } from "./subject/navigator/class-navigator";
import { Account } from "./account/account.tsx";

export const TeacherNavigators={
    Auth:AuthNavigator,
    Student:StudentNavigator,
    Parents:ParentsNavigator,
    Classes:ClassNavigator,
    Subjects:SubjectNavigator,
    profile:Account,
    
}