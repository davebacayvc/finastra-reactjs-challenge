import React from "react";
import {
  DEFAULT_USER_IMAGE,
  PROJECT_DESCRIPTION,
} from "../../constants/constants";
import Banner from "../../library/Banner/Banner";
import Container from "../../library/Container/Container";
import "./StudentProfile.scss";
import { useNavigate, useParams } from "react-router-dom";
import PATHS from "../../constants/routes";
import useFetchStudents from "../../hooks/useFetchStudents";
import useStudentInformation from "../../hooks/useStudentInformation";
import Wrapper from "../../library/Wrapper/Wrapper";
import {
  FaCalendarDay,
  FaGraduationCap,
  FaUserAlt,
  FaUserTag,
} from "react-icons/fa";
import getStudentStatus from "../../helpers/getStudentStatus";
import LabeledValue from "../../library/LabeledValue/LabeledValue";
import Table from "../../library/Table/Table";

const StudentProfile: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { studentData, loading } = useStudentInformation();

  /** Find the student by using find method and filtered by user_id */
  const filteredStudentData = studentData?.filter(
    (data) => data.user_id === id
  );
  const student = filteredStudentData![0];

  const studentImage = student?.image
    ? `/assets/${student?.image}`
    : DEFAULT_USER_IMAGE;

  const studentStatus = getStudentStatus(student?.status as any);
  return (
    <div className="student-profile-container">
      <Container>
        <Banner
          title={PROJECT_DESCRIPTION.TITLE}
          description={PROJECT_DESCRIPTION.DESCRIPTION}
          backConfigs={{
            handler: () => navigate(PATHS.STUDENTS),
            isVisible: true,
            text: "Go back to the student page",
          }}
        />
        <Wrapper loading={loading} className="profile-wrapper">
          <div className="user-summary">
            <div className="wrapper-holder">
              <img src={studentImage} alt={student?.image} />
            </div>
            <div className="wrapper-holder wrapper-captions">
              <h2>{student?.name}</h2>
              <LabeledValue
                label="Major"
                value={student?.major ?? ""}
                icon={<FaGraduationCap />}
              />
              <LabeledValue
                label="Status"
                value={studentStatus}
                icon={<FaUserTag />}
              />
              <LabeledValue
                label="Year"
                value={student?.year ?? ""}
                icon={<FaCalendarDay />}
              />
              <Table hasSearch={false} />
            </div>
          </div>
        </Wrapper>
      </Container>
    </div>
  );
};

export default StudentProfile;
