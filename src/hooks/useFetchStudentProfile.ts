import axios from "axios";
import { useEffect, useState } from "react";
import ENDPOINTS from "../constants/endpoints";

type StatusType = {
  date: Date;
  type: number;
};
type StudentProfile = {
  id: number;
  user_id: string;
  user_img: string;
  major: string;
  year: string;
  status: StatusType[];
};
const useFetchStudentProfile = () => {
  const [studentProfile, setStudentProfile] = useState<StudentProfile[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(ENDPOINTS.PROFILE)
      .then((response) => {
        setStudentProfile(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, []);

  return {
    studentProfile,
    loading,
  };
};

export default useFetchStudentProfile;
