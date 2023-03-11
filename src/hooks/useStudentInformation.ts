import joinedStudentData from "../helpers/joinedStudentData";
import useFetchStudentCourses from "./useFetchStudentCourses";
import useFetchStudentProfile from "./useFetchStudentProfile";
import useFetchStudents from "./useFetchStudents";

const useStudentInformation = () => {
  const { students, loading: studentsLoading } = useFetchStudents();
  const { studentProfile, loading: studentProfileLoading } =
    useFetchStudentProfile();
  const { studentCourses, loading: studentCoursesLoading } =
    useFetchStudentCourses();

  const studentData = joinedStudentData(
    students,
    studentProfile,
    studentCourses
  );

  return {
    studentData,
    loading: studentsLoading || studentCoursesLoading || studentProfileLoading,
  };
};

export default useStudentInformation;
