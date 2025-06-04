import { type ColumnDef } from '@tanstack/react-table';

import { Checkbox } from '@/components/ui/checkbox';

export type CurrentTabsDataTableProps = {
  id: string;
  link: string;
};

export const cols: ColumnDef<CurrentTabsDataTableProps>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />,
  },
  {
    accessorKey: 'id',
    header: 'Id',
    enableHiding: true,
  },
  {
    accessorKey: 'link',
    header: 'Link',
  },
];
