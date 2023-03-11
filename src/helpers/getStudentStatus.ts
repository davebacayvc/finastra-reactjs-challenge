import React from "react";

export enum StatusEnums {
  Withdrawn = "Withdrawn",
  Good = "Good",
  Probation = "Probation",
  Inactive = "Inactive",
}
type StatusTypes = {
  type: number;
  date: string;
};
export const getStudentType = (type: number) => {
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

const getStudentStatus = (studentStatus?: StatusTypes[]) => {
  const status = studentStatus?.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  if (status?.length ?? 0 > 0) {
    return getStudentType(status![0].type);
  }

  return getStudentType(0);
};

export default getStudentStatus;
