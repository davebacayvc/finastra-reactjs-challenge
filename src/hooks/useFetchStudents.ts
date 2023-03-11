import axios from "axios";
import { useEffect, useState } from "react";
import ENDPOINTS from "../constants/endpoints";

export type StudentType = {
  id: number;
  name: string;
  nickname: string;
  phone: string;
  email: string;
};
const useFetchStudents = () => {
  const [students, setStudents] = useState<StudentType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(ENDPOINTS.STUDENTS)
      .then((response) => {
        setStudents(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, []);

  return {
    students,
    loading,
  };
};

export default useFetchStudents;
