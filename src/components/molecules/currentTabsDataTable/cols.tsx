import { type ColumnDef } from '@tanstack/react-table';

import { Checkbox } from '@/components/ui/checkbox';
import { shortenUrl } from '@/lib/utils';
import type { TabInfo } from '@/hooks/useFetchTabs';

export const cols: ColumnDef<TabInfo>[] = [
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
    accessorKey: 'link',
    header: 'Link',
    cell: ({ row }) => {
      const link = row.getValue('link') as string;
      return (
        <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          {shortenUrl(link)}
        </a>
      );
    },
  },
];
