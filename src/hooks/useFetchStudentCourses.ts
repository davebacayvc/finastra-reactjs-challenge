import axios from "axios";
import { useEffect, useState } from "react";
import ENDPOINTS from "../constants/endpoints";

type StudentCoursesType = {
  id: number;
  user_id: string;
  course_name: string;
  course_selection: string;
  semester_code: string;
  course_fee: string;
};
const useFetchStudentCourses = () => {
  const [studentCourses, setStudentCourses] = useState<StudentCoursesType[]>(
    []
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(ENDPOINTS.COURSES)
      .then((response) => {
        setStudentCourses(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, []);

  return {
    studentCourses,
    loading,
  };
};

export default useFetchStudentCourses;
