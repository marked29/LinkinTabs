import { useState } from 'react';
import { toast } from 'sonner';

import { type ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

import type { TabInfo } from '@/hooks/useFetchTabs';

interface DataTableProps<TData extends TabInfo, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

const copyToClipboard = (text: string) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      toast.success('Text copied to clipboard successfully.');
    })
    .catch(() => {
      toast.error('Failed to copy text to clipboard.');
    });
};

export function DataTable<TData extends TabInfo, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  });

  const handleCopyLinks = async () => {
    const selectedLinks = table
      .getFilteredSelectedRowModel()
      .rows.map((row) => row.original.link)
      .filter((link) => link); // Filter out any undefined or null links
    if (selectedLinks.length > 0) {
      copyToClipboard(selectedLinks.join('\n'));
    } else {
      toast.info('No links selected to copy.');
    }
  };

  return (
    <>
      <div className="rounded-md border h-100 overflow-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return <TableHead key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>;
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="text-muted-foreground text-sm mt-2">
        {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>{' '}
      <Button className="w-full mt-2" onClick={handleCopyLinks}>
        Copy links
      </Button>
    </>
  );
}
