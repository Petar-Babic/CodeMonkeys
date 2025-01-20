import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ArrowUpDown, ArrowDown, ArrowUp, Search } from "lucide-react";
import debounce from "lodash/debounce";

interface Column<T> {
  title: string;
  key: keyof T;
  renderCell?: (row: T) => React.ReactNode;
  sortable?: boolean;
  customSort?: (a: T, b: T) => number;
  searchable?: boolean;
  width?: string;
}

interface UniversalTableProps<T> {
  data: T[];
  columns: Column<T>[];
  pageSize?: number;
  searchable?: boolean;
  onRowClick?: (row: T) => void;
  emptyStateMessage?: string;
}

export default function UniversalTable<T>({
  data,
  columns,
  pageSize = 10,
  searchable = true,
  onRowClick,
  emptyStateMessage = "No data available",
}: UniversalTableProps<T>) {
  const [sorting, setSorting] = useState<{
    column: keyof T | null;
    direction: "asc" | "desc";
  }>({
    column: null,
    direction: "asc",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  // Debounced search handler
  const debouncedSearch = useMemo(
    () => debounce((value: string) => setSearchTerm(value), 300),
    []
  );

  // Filter data based on search term
  const filteredData = useMemo(() => {
    if (!searchTerm) return data;

    return data.filter((item) =>
      columns.some((column) => {
        if (!column.searchable) return false;
        const value = item[column.key];
        return String(value).toLowerCase().includes(searchTerm.toLowerCase());
      })
    );
  }, [data, searchTerm, columns]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sorting.column) return filteredData;

    const column = columns.find((col) => col.key === sorting.column);

    return [...filteredData].sort((a, b) => {
      if (column?.customSort) {
        return sorting.direction === "asc"
          ? column.customSort(a, b)
          : column.customSort(b, a);
      }

      const aValue = a[sorting.column!];
      const bValue = b[sorting.column!];

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sorting.direction === "asc" ? aValue - bValue : bValue - aValue;
      }

      return sorting.direction === "asc"
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });
  }, [filteredData, sorting, columns]);

  // Pagination
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleSort = (column: Column<T>) => {
    if (!column.sortable) return;

    setSorting((prev) => ({
      column: column.key,
      direction:
        prev.column === column.key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const getSortIcon = (column: Column<T>) => {
    if (!column.sortable) return null;

    if (sorting.column !== column.key) {
      return <ArrowUpDown className="w-4 h-4 ml-2" />;
    }
    return sorting.direction === "asc" ? (
      <ArrowUp className="w-4 h-4 ml-2" />
    ) : (
      <ArrowDown className="w-4 h-4 ml-2" />
    );
  };

  return (
    <div className="w-full space-y-4 p-4">
      {searchable && (
        <div className="flex items-center space-x-2 relative">
          <Input
            placeholder="Search..."
            onChange={(e) => debouncedSearch(e.target.value)}
            className="max-w-sm bg-transparent"
          />{" "}
        </div>
      )}

      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={String(column.key)}
                className="font-medium"
                style={{ width: column.width }}
              >
                <Button
                  variant="ghost"
                  onClick={() => handleSort(column)}
                  className={`${
                    !column.sortable ? "cursor-default" : ""
                  } flex items-center`}
                  disabled={!column.sortable}
                >
                  {column.title}
                  {getSortIcon(column)}
                </Button>
              </TableCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center py-8">
                {emptyStateMessage}
              </TableCell>
            </TableRow>
          ) : (
            paginatedData.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                onClick={() => onRowClick?.(row)}
                className={onRowClick ? "cursor-pointer hover:bg-gray-50" : ""}
              >
                {columns.map((column) => (
                  <TableCell key={String(column.key)}>
                    {column.renderCell
                      ? column.renderCell(row)
                      : String(row[column.key] ?? "")}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {totalPages > 1 && (
        <div className="flex justify-center space-x-2">
          <Button
            variant="outline"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="py-2">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
