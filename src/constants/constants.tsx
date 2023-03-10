import PATHS from "./routes";
import Students from "../pages/Students/Students";
import { ReactRoutesType } from "./types";
import StudentProfile from "../pages/StudentProfile/StudentProfile";
import InvalidRoute from "../pages/InvalidRoute/InvalidRoute";

export const PROJECT_DESCRIPTION = {
  TITLE: "ReactJS Technical Project",
  DESCRIPTION:
    "In this mini project, your goal will be to develop a ReactJS app that displays a list of students and their courses. The data for this must be  fetched from the links provided below. The app should first launch to a page displaying all the student and their general informaAon in a table format. Clicking on a student from the table should route the app to another page with the student profile. The style of the table and theming of the app is dependent on you.",
};

export const REACT_ROUTES: ReactRoutesType[] = [
  {
    ELEMENT: <Students />,
    PATH: PATHS.STUDENTS,
  },
  {
    ELEMENT: <StudentProfile />,
    PATH: PATHS.STUDENT_PROFILE,
  },
  {
    ELEMENT: <StudentProfile />,
    PATH: PATHS.STUDENT_PROFILE,
  },
  {
    PATH: PATHS.INVALID,
    ELEMENT: <InvalidRoute />,
  },
  {
    PATH: "*",
    ELEMENT: <InvalidRoute />,
  },
];

export default REACT_ROUTES;
