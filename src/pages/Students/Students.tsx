import React from "react";
import { PROJECT_DESCRIPTION } from "../../constants/constants";
import Banner from "../../library/Banner/Banner";
import Container from "../../library/Container/Container";
import Table from "../../library/Table/Table";
import "./Students.scss";

const Students: React.FC = () => {
  const tableDefs = {
    columns: [
      {
        id: "image",
        label: "",
      },
      {
        id: "name",
        label: "Name",
      },
      {
        id: "phone",
        label: "Phone",
      },
      {
        id: "email",
        label: "Email",
      },
      {
        id: "major",
        label: "Major",
      },
      {
        id: "status",
        label: "Status",
      },
      {
        id: "totalCourse",
        label: "Total Course",
      },
    ],

    rows: [0, 1, 2, 3, 4, 5, 6, 7, 8].map((contact: any) => {
      return {
        image: "/assets/default.jpg",
        name: "Maria Anders",
        phone: "123-456-789",
        email: "dave@testdata.co",
        major: "Computer Science",
        status: "Good",
        totalCourse: "4",
      };
    }),
  };
  return (
    <div>
      <Container>
        <Banner
          title={PROJECT_DESCRIPTION.TITLE}
          description={PROJECT_DESCRIPTION.DESCRIPTION}
        />
        <Table cols={tableDefs.columns} rows={tableDefs.rows} />
      </Container>
    </div>
  );
};

export default Students;
