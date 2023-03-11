import { StudentCoursesType } from "../hooks/useFetchStudentCourses";
import { StudentProfileType } from "../hooks/useFetchStudentProfile";
import { StudentType } from "../hooks/useFetchStudents";

const joinedStudentData = (
  students: StudentType[],
  studentProfileData: StudentProfileType[],
  studentCourses: StudentCoursesType[]
) => {
  const studentData = students.map((t1) => {
    const userId = `user_${t1.id}`;
    const filteredData = {
      ...t1,
      ...studentProfileData.find((t2) => t2.user_id === userId),
    };

    const filteredCourses = studentCourses
      ?.filter((course) => course.user_id === userId)
      .map((data) => data)
      .filter(
        (value, index, self) =>
          index ===
          self.findIndex(
            (t) =>
              t.course_name === value.course_name ||
              t.semester_code === value.semester_code
          )
      );

    return {
      name: filteredData.name,
      image: filteredData.user_img,
      nickname: filteredData.nickname,
      phone: filteredData.phone,
      email: filteredData.email,
      user_id: filteredData.user_id,
      major: filteredData.major,
      year: filteredData.year,
      status: filteredData.status,
      totalCourse: filteredCourses,
    };
  });

  return studentData;
};

export default joinedStudentData;
