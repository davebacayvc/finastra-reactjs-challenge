import React, { useEffect, useState } from "react";
import { FaSortAmountDownAlt, FaSortAmountUpAlt } from "react-icons/fa";
import NoInformationToDisplay from "../NoInformationToDisplay/NoInformationToDisplay";
import "./Table.scss";

export type ColsType = {
  label: string;
  id: string;
  sort?: boolean;
};
export type RowsType = any[];
export type TableProps = {
  cols?: ColsType[];
  rows?: any[];
};

const Table: React.FC<TableProps> = (props) => {
  const [rows, setRows] = useState<RowsType[]>([]);
  const [sorted, setSorted] = useState({ sorted: "id", reversed: false });
  const [searchPhrase, setSearchPhrase] = useState("");

  useEffect(() => {
    setRows(props.rows ?? []);
  }, [props.rows]);

  useEffect(() => {}, [rows]);

  const renderArrow = (id: string) => {
    if (sorted.reversed) {
      return (
        <button className="sort-icon" onClick={() => sortByKey(id)}>
          <FaSortAmountUpAlt />
        </button>
      );
    }
    return (
      <button className="sort-icon" onClick={() => sortByKey(id)}>
        <FaSortAmountDownAlt />
      </button>
    );
  };

  const sortByKey = (key: string) => {
    const copiedRows = [...(props.rows ?? [])];
    copiedRows.sort((rowA, rowB) => {
      const keyA: string = `${rowA[key]}`;
      const keyB: string = `${rowB[key]}`;
      if (sorted.reversed) {
        return keyB.localeCompare(keyA);
      }
      return keyA.localeCompare(keyB);
    });
    setRows(copiedRows);
    setSorted({ sorted: key, reversed: !sorted.reversed });
  };

  const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchPhrase(event.target.value);
    const matchedRows = rows.filter((row: any) => {
      return (
        row.name.toLowerCase().includes(searchPhrase.toLowerCase()) ||
        row.email.toLowerCase().includes(searchPhrase.toLowerCase()) ||
        row.phone.toLowerCase().includes(searchPhrase.toLowerCase()) ||
        row.major.toLowerCase().includes(searchPhrase.toLowerCase()) ||
        row.status.toLowerCase().includes(searchPhrase.toLowerCase()) ||
        row.totalCourse.toLowerCase().includes(searchPhrase.toLowerCase())
      );
    });

    if (event.target.value === "") {
      setRows(props.rows ?? []);
    } else {
      setRows(matchedRows);
    }
  };

  return (
    <div className="table-container">
      <input
        type="text"
        onChange={searchHandler}
        value={searchPhrase}
        placeholder="Click here to search any data ..."
      />
      <table>
        <thead>
          <tr>
            {props.cols?.map((col, index) => {
              return (
                <th
                  key={index}
                  onClick={() => sortByKey(col.id)}
                  className={`${col.sort ? "sort" : ""}`}
                >
                  <span>{col.label}</span>
                  {col.sort
                    ? sorted.sorted === col.id
                      ? renderArrow(col.id)
                      : null
                    : null}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={props.cols?.length}>
                <NoInformationToDisplay showNull={true} />
              </td>
            </tr>
          ) : (
            rows?.map((row, index) => (
              <tr key={index}>
                {props.cols?.map((col: any, index) => {
                  return (
                    <td key={index}>
                      <span>{row[col.id]}</span>
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
