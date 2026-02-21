import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Column<T> = {
  header: string;
  accessorFn: (row: T) => React.ReactNode;
  className?: string;
};

export function DashboardTable<T>({
  data,
  columns,
  getRowKey,
}: {
  data: T[];
  columns: Column<T>[];
  getRowKey: (row: T) => string;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((col) => (
            <TableHead key={col.header} className={col.className}>
              {col.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row) => (
          <TableRow key={getRowKey(row)}>
            {columns.map((col) => (
              <TableCell key={col.header} className={col.className}>
                {col.accessorFn(row)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
