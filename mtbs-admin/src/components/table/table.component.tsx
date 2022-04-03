import React, { useState } from "react";
import {
  TableContainer,
  Table as MuiTable,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from "@material-ui/core";
import TableHead from "./table-head.component";
import TableError from "./table-error.component";

import { sortArrayOfObjects } from "../../utils/array";
import { Column, Row } from "./table.types";
import styled from "styled-components";

const TableWrapper = styled.div`
  .MuiTablePagination-caption {
    font-weight: 400;
  }

  .MuiTablePagination-selectRoot {
    .MuiSelect-outlined {
      border: 1px solid #ced7df;
      padding-top: 10px;
      padding-bottom: 10px;
    }

    .MuiSelect-icon {
      color: #6d7c8b;
    }
  }
`;

interface Props {
  columns: Column[];
  rows?: Row[];
  loading?: boolean;
  error?: string;
}

const Table = (props: Props) => {
  const { columns, rows = [], loading, error } = props;

  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<string>("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handleSort = (columnField: string) => {
    const isAsc = orderBy === columnField && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(columnField);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableWrapper>
      <TableContainer
        style={{
          height: "calc(100vh - 64px - 32px - 36px - 36px)",
          overflowY: "auto",
        }}
      >
        {loading && <div>loading...</div>}
        <MuiTable>
          <TableHead
            columns={columns}
            orderBy={orderBy}
            order={order}
            onRequestSort={handleSort}
          />
          <TableBody>
            {rows
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.sort((a, b) => sortArrayOfObjects(a, b, orderBy, order))
              ?.map((row, index) => {
                return (
                  <TableRow key={index}>
                    {columns?.map((column, idx) => (
                      <TableCell
                        key={idx}
                        align={column.align || "left"}
                        style={{ color: "#fff" }}
                      >
                        {column.field ? row[column.field] : ""}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
          </TableBody>
        </MuiTable>
        <TablePagination
          style={{
            display: "block",
            overflowY: "hidden",
            borderBottom: "none",
            color: "#fff",
          }}
          rowsPerPageOptions={[10, 20, 50]}
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          labelRowsPerPage="Show:"
          labelDisplayedRows={() => ""}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          SelectProps={{ variant: "outlined" }}
          backIconButtonProps={{
            style: {
              color: "#fff",
            },
          }}
          nextIconButtonProps={{
            style: {
              color: "#fff",
            },
          }}
        />
      </TableContainer>
      {error && <TableError text={error} />}
    </TableWrapper>
  );
};

export default Table;
