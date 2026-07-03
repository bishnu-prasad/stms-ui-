import { ReactNode } from "react";

interface Column<T> {
  header: string;
  accessor: (row: T) => ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
}

export function DataTable<T>({ columns, data, emptyMessage = "No data available." }: DataTableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="py-12 text-center text-slate-500 text-[14px]">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto -mx-6 -my-6">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50/80">
            {columns.map((col, i) => (
              <th 
                key={i}
                className={`py-3.5 px-6 text-[12px] font-semibold text-slate-600 uppercase tracking-wider ${col.className || ""}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.map((row, i) => (
            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
              {columns.map((col, j) => (
                <td 
                  key={j}
                  className={`py-4 px-6 text-[14px] text-slate-700 ${col.className || ""}`}
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
