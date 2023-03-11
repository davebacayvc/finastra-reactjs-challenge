import React, { useEffect, useState } from "react";
import { FaSortAmountDownAlt, FaSortAmountUpAlt } from "react-icons/fa";
import { ColsType, RowsType } from "../library/Table/Table";

const useTableHandlers = (origRows: RowsType[], origCols: ColsType[]) => {
  const [rows, setRows] = useState<RowsType[]>([]);
  const [sorted, setSorted] = useState({ sorted: "name", reversed: false });
  const [searchPhrase, setSearchPhrase] = useState("");

  useEffect(() => {
    setRows(origRows ?? []);
  }, [origRows]);

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
    const copiedRows = [...(origRows ?? [])];
    copiedRows.sort((rowA: any, rowB: any) => {
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
      setRows(origRows ?? []);
    } else {
      setRows(matchedRows);
    }
  };

  return {
    searchHandler,
    sortByKey,
    sorted,
    renderArrow,
    rows,
    searchPhrase,
  };
};

export default useTableHandlers;
