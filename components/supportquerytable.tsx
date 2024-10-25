"use client"; // Add this directive at the top

import { ColumnDef, useReactTable, getCoreRowModel } from "@tanstack/react-table";
import { motion } from "framer-motion";
import styles from "@/app/(dashboard)/(routes)/teacher/feedback/supportquerytable.module.css";

type SupportQuery = {
  id: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
};

type SupportQueryTableProps = {
  data: SupportQuery[];
};

const SupportQueryTable = ({ data }: SupportQueryTableProps) => {
  const columns: ColumnDef<SupportQuery>[] = [
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "subject",
      header: "Subject",
    },
    {
      accessorKey: "message",
      header: "Message",
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: (info) => new Date(info.getValue<string>()).toLocaleString(),
    },
  ];

  const table = useReactTable<SupportQuery>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={styles.tableContainer}
    >
      <table className={styles.table}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : typeof header.column.columnDef.header === "function"
                    ? header.column.columnDef.header(header.getContext())
                    : header.column.columnDef.header}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{cell.getValue() as string}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default SupportQueryTable;