import React from "react";
import { PROJECT_DESCRIPTION } from "../../constants/constants";
import Banner from "../../library/Banner/Banner";
import Container from "../../library/Container/Container";
import "./Students.scss";

const Students: React.FC = () => {
  return (
    <div>
      <Container>
        <Banner
          title={PROJECT_DESCRIPTION.TITLE}
          description={PROJECT_DESCRIPTION.DESCRIPTION}
        />
      </Container>
    </div>
  );
};

export default Students;
