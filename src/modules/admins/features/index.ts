import React from "react";
import AuthNavigator from "./auth/authNavigators";
import { AuthorizationNavigator } from "./authorization";
import { ClassNavigator } from "./classes/navigators/class-navigator";
import { StudentNavigator } from "./students/navigator/student-navigator";
import { TeacherNavigator } from "./teachers/navigator/teacher-navigator";

export interface AdminNavigatorsType {
  Auth: React.FC;
  Student: React.FC;
  Teacher: React.FC;
  Authorization: React.FC;
  Class: React.FC;
}

export const AdminNavigators: AdminNavigatorsType = {
  Auth: AuthNavigator,
  Student: StudentNavigator,
  Teacher: TeacherNavigator,
  Authorization: AuthorizationNavigator,
  Class: ClassNavigator,
  // Teacher: TeacherNavigator
};
