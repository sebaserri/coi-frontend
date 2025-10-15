"use client";
import { ReactNode } from "react";

export default function DataTable({
  header,
  rows,
  empty,
}: {
  header: ReactNode;
  rows: ReactNode;
  empty?: ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden">
      <table className="min-w-full">
        <thead className="bg-gray-50 text-left text-sm">{header}</thead>
        <tbody className="divide-y">
          {rows || (
            <tr>
              <td colSpan={12} className="p-6">
                {empty}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
