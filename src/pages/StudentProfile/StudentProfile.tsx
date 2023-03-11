import React from "react";
import { PROJECT_DESCRIPTION } from "../../constants/constants";
import Banner from "../../library/Banner/Banner";
import Container from "../../library/Container/Container";
import "./StudentProfile.scss";
import { useNavigate } from "react-router-dom";
import PATHS from "../../constants/routes";

const StudentProfile: React.FC = () => {
  const navigate = useNavigate();
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
        <div className="grid-container">
          <div className="item1">1</div>
          <div className="item2">2</div>
          <div className="item3">3</div>
          <div className="item4">4</div>
          <div className="item5">5</div>
          <div className="item6">6</div>
          <div className="item7">7</div>
          <div className="item8">8</div>
        </div>
      </Container>
    </div>
  );
};

export default StudentProfile;
