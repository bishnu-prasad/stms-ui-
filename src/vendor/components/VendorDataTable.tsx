import { ReactNode } from "react";

interface Column<T> {
  header: string;
  accessor: (row: T) => ReactNode;
  className?: string;
}

interface VendorDataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
}

export function VendorDataTable<T>({ columns, data, emptyMessage = "No records available.", onRowClick }: VendorDataTableProps<T>) {
  if (!data || data.length === 0) {
    return (
      <div className="py-12 text-center text-slate-400 text-sm font-medium">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto -mx-6 -my-6">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50/70">
            {columns.map((col, i) => (
              <th 
                key={i}
                className={`py-3.5 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider ${col.className || ""}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.map((row, i) => (
            <tr 
              key={i} 
              className={`transition-colors ${onRowClick ? "hover:bg-slate-50/60 cursor-pointer" : "hover:bg-slate-50/60"}`}
              onClick={() => onRowClick && onRowClick(row)}
            >
              {columns.map((col, j) => (
                <td 
                  key={j}
                  className={`py-3.5 px-6 text-[13.5px] text-slate-700 ${col.className || ""}`}
                >
                  {col.accessor(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
