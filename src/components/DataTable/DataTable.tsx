
import { useState } from "react";

export interface Column<T> {
  key: keyof T;
  header: string;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

function DataTable<T extends { id: string | number }>({
  data,
  columns,
  loading,
  selectable,
  onRowSelect,
}: DataTableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<T[]>([]);

  const handleSelect = (row: T) => {
    let newSelection: T[] = [];
    if (selectedRows.includes(row)) {
      newSelection = selectedRows.filter((r) => r !== row);
    } else {
      newSelection = [...selectedRows, row];
    }
    setSelectedRows(newSelection);
    onRowSelect?.(newSelection);
  };

  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (data.length === 0) return <div className="p-4 text-center">No data available</div>;

  return (
    <table className="min-w-full border border-gray-200 text-sm">
      <thead className="bg-gray-100">
        <tr>
          {selectable && <th className="px-2 py-2">Select</th>}
          {columns.map((col) => (
            <th key={String(col.key)} className="px-4 py-2 text-left border-b">
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id} className="hover:bg-gray-50">
            {selectable && (
              <td className="px-2 py-2">
                <input
                  type="checkbox"
                  checked={selectedRows.includes(row)}
                  onChange={() => handleSelect(row)}
                />
              </td>
            )}
            {columns.map((col) => (
              <td key={String(col.key)} className="px-4 py-2 border-b">
                {String(row[col.key])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataTable;
