import AuthNavigator from "./auth/authNavigators";
import { StudentNavigator } from "./students/navigator/student-navigator";
import { ParentsNavigator } from "./parents/navigator/parents-navigator";

export const TeacherNavigators={
    Auth:AuthNavigator,
    Student:StudentNavigator,
    Parents:ParentsNavigator,
    Classes:StudentNavigator,
    Subjects:StudentNavigator,
    
}