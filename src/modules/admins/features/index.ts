import AuthNavigator from "./auth/authNavigators";
import { AuthorizationNavigator } from "./authorization";
import { StudentNavigator } from "./students/navigator/student-navigator";

export const AdminNavigators={
    Auth:AuthNavigator,
    Student:StudentNavigator,
    Authorization:AuthorizationNavigator
    // Teacher:TeacherNavigator
}