import React from "react";
import {
  Box,
  TableCell,
  TableHead as MuiTableHead,
  TableRow,
  TableSortLabel,
} from "@material-ui/core";
import ImportExportIcon from "@mui/icons-material/ImportExport";

import { Alignment } from "./table.types";

interface Props {
  columns: {
    title: string;
    field?: string;
    align?: Alignment;
    disableSort?: boolean;
    width?: number;
  }[];
  orderBy: string;
  order: "asc" | "desc";
  onRequestSort: (property: string) => void;
}

const IconComponent = () => (
  <Box ml={1} mt={1}>
    <ImportExportIcon />
  </Box>
);

const TableHead = (props: Props) => {
  const { columns, orderBy, order, onRequestSort } = props;

  return (
    <MuiTableHead>
      <TableRow>
        {columns?.map((column, index) => (
          <TableCell
            key={index}
            align={column.align ? column.align : "inherit"}
            style={{
              width: column.width || "auto",
              minWidth: column.width || "auto",
              maxWidth: column.width || "auto",
              color: "#fff",
              whiteSpace: 'nowrap',
            }}
          >
            {column.field !== "actions" && (
              <TableSortLabel
                IconComponent={IconComponent}
                active={orderBy === column.field}
                hideSortIcon={!!column.disableSort}
                direction={orderBy === column.field ? order : "asc"}
                onClick={() =>
                  !column.disableSort && onRequestSort(column.field || "")
                }
              >
                {column.title}
              </TableSortLabel>
            )}
          </TableCell>
        ))}
      </TableRow>
    </MuiTableHead>
  );
};

export default TableHead;
