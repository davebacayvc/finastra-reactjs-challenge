import React from "react";
import {
  DEFAULT_USER_IMAGE,
  PROJECT_DESCRIPTION,
} from "../../constants/constants";
import useStudentInformation from "../../hooks/useStudentInformation";
import Banner from "../../library/Banner/Banner";
import Container from "../../library/Container/Container";
import Table, { ColsType, RowsType } from "../../library/Table/Table";
import Wrapper from "../../library/Wrapper/Wrapper";
import "./Students.scss";

type TableDefsType = {
  cols: ColsType[];
  rows: any[];
};
enum StatusEnums {
  Withdrawn = "Withdrawn",
  Good = "Good",
  Probation = "Probation",
  Inactive = "Inactive",
}

const getStudentStatus = (type: number) => {
  let displayedType: string;
  switch (type) {
    case 1:
      displayedType = StatusEnums.Good;
      break;
    case 2:
      displayedType = StatusEnums.Probation;
      break;
    case 3:
      displayedType = StatusEnums.Inactive;
      break;
    default:
      displayedType = StatusEnums.Withdrawn;
  }

  return displayedType;
};

const Students: React.FC = () => {
  const { studentData, loading } = useStudentInformation();

  const cols: ColsType[] = [
    {
      id: "image",
      label: "",
    },
    {
      id: "name",
      label: "Name",
      sort: true,
      link: true,
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
      sort: true,
    },
    {
      id: "status",
      label: "Status",
      sort: true,
    },
    {
      id: "totalCourse",
      label: "Total Course",
    },
  ];

  const rows: RowsType = studentData?.map((student) => {
    const status = student.status?.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    const getStudentType = () => {
      if (status?.length ?? 0 > 0) {
        return getStudentStatus(status![0].type);
      }

      return getStudentStatus(0);
    };

    return {
      id: student.user_id,
      image: (
        <img
          src={student.image ? `/assets/${student.image}` : DEFAULT_USER_IMAGE}
          alt="student-pic"
        />
      ),
      name: `${student.name} ${
        student.nickname ? `(${student.nickname})` : ""
      }`,
      phone: student.phone,
      email: student.email,
      major: student.major,
      status: getStudentType(),
      totalCourse: student.totalCourse.length.toString(),
    };
  });

  const tableDefs: TableDefsType = {
    cols,
    rows,
  };

  return (
    <Container>
      <Banner
        title={PROJECT_DESCRIPTION.TITLE}
        description={PROJECT_DESCRIPTION.DESCRIPTION}
      />
      <Wrapper loading={loading}>
        <Table cols={tableDefs.cols} rows={tableDefs.rows} />
      </Wrapper>
    </Container>
  );
};

export default Students;
