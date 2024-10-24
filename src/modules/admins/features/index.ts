import AuthNavigator from "./auth/authNavigators";
import { AuthorizationNavigator } from "./authorization";
import { StudentNavigator } from "./students/navigator/student-navigator";
import { TeacherNavigator } from "./teachers/navigator/teacher-navigator";

export interface AdminNavigatorsType {
    Auth: React.FC; 
    Student: React.FC;
    Teacher: React.FC;
    Authorization: React.FC;
}

export const AdminNavigators: AdminNavigatorsType = {
    Auth: AuthNavigator,
    Student: StudentNavigator,
    Teacher: TeacherNavigator,
    Authorization: AuthorizationNavigator
    // Teacher: TeacherNavigator
};
