import React, { useEffect, useState } from "react";
import {
  DEFAULT_USER_IMAGE,
  EXCHANGE_RATE_API_KEY,
  PROJECT_DESCRIPTION,
} from "../../constants/constants";
import Banner from "../../library/Banner/Banner";
import Container from "../../library/Container/Container";
import "./StudentProfile.scss";
import { useNavigate, useParams } from "react-router-dom";
import PATHS from "../../constants/routes";
import useStudentInformation from "../../hooks/useStudentInformation";
import Wrapper from "../../library/Wrapper/Wrapper";
import { FaCalendarDay, FaGraduationCap, FaUserTag } from "react-icons/fa";
import getStudentStatus from "../../helpers/getStudentStatus";
import LabeledValue from "../../library/LabeledValue/LabeledValue";
import Table, { ColsType } from "../../library/Table/Table";
import useFetchStudentCourses from "../../hooks/useFetchStudentCourses";
import useGetCurrency from "../../hooks/useGetCurrency";
import axios from "axios";
import ENDPOINTS from "../../constants/endpoints";
import Spinner from "../../library/Spinner/Spinner";
import moneyFormat from "../../helpers/moneyFormat";

type CurrencyConfigTypes = {
  symbol: string;
  name: string;
  symbol_native: string;
  decimal_digits: number;
  rounding: number;
  code: string;
  name_plural: string;
};

const StudentProfile: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { studentData, loading: studentDataLoading } = useStudentInformation();
  const { studentCourses, loading: coursesLoading } = useFetchStudentCourses();
  const loading = studentDataLoading || coursesLoading;

  /** Find the student by using find method and filtered by user_id */
  const filteredStudentData = studentData?.filter(
    (data) => data.user_id === id
  );

  /** Call the first index */
  const student = filteredStudentData![0];

  /** Conditional Image */
  const studentImage = student?.image
    ? `/assets/${student?.image}`
    : DEFAULT_USER_IMAGE;

  /** Get the student status. Note: This is a reusable function */
  const studentStatus = getStudentStatus(student?.status as any);

  /** Get the currency that will display in the dropdown */
  const { currencies, loading: currenciesLoading } = useGetCurrency();
  const [changeCurrencyLoading, setChangeCurrencyLoading] = useState(false);

  /** Currency configs, this will be the default and based value for exchanging rate. */
  const [currencyConfigs, setCurrencyConfigs] = useState<CurrencyConfigTypes>({
    symbol: "$",
    name: "US Dollar",
    symbol_native: "$",
    decimal_digits: 2,
    rounding: 0,
    code: "USD",
    name_plural: "US dollars",
  });

  /** State for manipulating the currency came from Exchange Rate API. */
  const [exchangeRateConfigs, setExchangeRateConfigs] = useState<any>();

  useEffect(() => {
    setChangeCurrencyLoading(true);
    axios
      .get(
        ENDPOINTS.EXCHANGE_RATE.replace(":apiKey", EXCHANGE_RATE_API_KEY)
          /** Default value (base currency type) is USD. */
          .replace(":base", "USD")
          .replace(":target", currencyConfigs?.code)
      )
      .then((response) => {
        setExchangeRateConfigs(response.data);
        setChangeCurrencyLoading(false);
      })
      .catch((error) => {
        setChangeCurrencyLoading(false);
        console.log(error);
      });
  }, [currencyConfigs]);

  const changeCurrencyHandler = (data: any) => {
    setChangeCurrencyLoading(true);
    setCurrencyConfigs(data[1]);
    setChangeCurrencyLoading(false);
  };

  const cols: ColsType[] = [
    {
      id: "semester_code",
      label: "Semester Code",
      sort: true,
    },
    {
      id: "course_name",
      label: "Course Name",
    },
    {
      id: "course_selection",
      label: "Course Selection",
    },
    {
      id: "course_fee",
      label: "Course Fee",
      dropdownConfig: {
        visible: true,
        content: (
          <React.Fragment>
            {Object.entries(currencies || {}).map((data: any) => {
              return (
                <button
                  className="link"
                  onClick={() => changeCurrencyHandler(data)}
                >
                  {data[1].symbol + " " + data[1].name}
                </button>
              );
            })}
          </React.Fragment>
        ),
      },
    },
  ];

  const rows = studentCourses
    ?.filter((course) => course.user_id === id)
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

  const filteredRows = rows?.map((data) => {
    const courseFee =
      parseInt(data.course_fee) * exchangeRateConfigs?.conversion_rate;
    return {
      ...data,
      course_fee: `${currencyConfigs.symbol} ${moneyFormat(
        (Math.round(courseFee * 100) / 100).toFixed(
          currencyConfigs.decimal_digits
        )
      )}`,
    };
  });

  const tableDefs = {
    cols,
    rows: filteredRows,
  };

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
        <Wrapper
          loading={loading || currenciesLoading}
          className="profile-wrapper"
        >
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
              <div className="course-table-container">
                <h3>Student Courses ({rows?.length})</h3>
                {changeCurrencyLoading ? (
                  <Spinner isVisible={true} />
                ) : (
                  <Table
                    hasSearch={false}
                    cols={tableDefs.cols}
                    rows={tableDefs.rows}
                  />
                )}
              </div>
            </div>
          </div>
        </Wrapper>
      </Container>
    </div>
  );
};

export default StudentProfile;
