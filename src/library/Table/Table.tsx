import React from "react";
import "./Table.scss";

type ColsType = {
  label: string;
  id: string;
};
type TableProps = {
  cols?: ColsType[];
  rows?: any[];
};

const Table: React.FC<TableProps> = (props) => {
  return (
    <table className="table-container">
      <tr>
        {props.cols?.map((col) => {
          return <th>{col.label}</th>;
        })}
      </tr>
      {props.rows?.map((row) => (
        <tr>
          {props.cols?.map((col) => {
            return (
              <td>
                {col.id === "image" ? (
                  <img src={row[col.id]} alt="student-pic" />
                ) : (
                  <span>{row[col.id]}</span>
                )}
              </td>
            );
          })}
        </tr>
      ))}
    </table>
  );
};

export default Table;
