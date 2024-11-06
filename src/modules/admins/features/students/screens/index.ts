import  StudentList  from "./student-list";
import StudentView from "./student-view";

export interface StudentScreensType {
    List: React.FC; 
    View: React.FC;
}

export const StudentScreens: StudentScreensType = {
    List: StudentList,
    View: StudentView
};
