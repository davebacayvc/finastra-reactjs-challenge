import React from "react";
import "./Table.scss";

export type ColsType = {
  label: string;
  id: string;
};
export type RowsType = any[];
export type TableProps = {
  cols?: ColsType[];
  rows?: any[];
};

const Table: React.FC<TableProps> = (props) => {
  return (
    <table className="table-container">
      <thead>
        <tr>
          {props.cols?.map((col, index) => {
            return <th key={index}>{col.label}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {props.rows?.map((row, index) => (
          <tr key={index}>
            {props.cols?.map((col, index) => {
              return (
                <td key={index}>
                  <span>{row[col.id]}</span>
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
