import React from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import {
//   ColumnDef,
//   ColumnFiltersState,
//   flexRender,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   SortingState,
//   useReactTable,
//   VisibilityState,
// } from '@tanstack/react-table';

type CurrentTabsProps = {
  //   tabLink?: chrome.tabs.Tab[];
  tabLinks: string[];
  fetchAllTabs: () => void;
};

const Tab = React.memo(({ link }: { link: string }) => {
  return (
    <li className="text-sm text-blue-600 truncate">
      <a href={link} target="_blank" rel="noopener noreferrer">
        {link}
      </a>
    </li>
  );
});

const CurrentTabs = React.memo(({ tabLinks, fetchAllTabs }: CurrentTabsProps) => {
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      console.log('Text copied to clipboard:', text);
    } catch (err) {
      console.error('Failed to copy text to clipboard:', err);
    }
  };

  const handleCopyAllLinks = () => {
    if (tabLinks.length === 0) {
      alert('No links to copy');
      return;
    }
    const allLinks = tabLinks.join('\n');
    copyToClipboard(allLinks);
    alert('All links have been copied to clipboard');
  };

  return (
    <>
      <Card>
        <CardContent className="space-y-2 py-0.5">
          <ul>
            {tabLinks && tabLinks.length > 0 ? (
              tabLinks.map((tabLink) => <Tab key={tabLink} link={tabLink}></Tab>)
            ) : (
              <div className="flex flex-col items-center justify-center space-y-2">
                <li className="text-sm text-gray-500">No tabs opened</li>
                <li>
                  <Button onClick={fetchAllTabs}>Get all tabs</Button>
                </li>
              </div>
            )}
          </ul>
        </CardContent>
      </Card>

      <Button className="w-full mt-2" onClick={handleCopyAllLinks}>
        Copy all links
      </Button>
    </>
  );
});

export default CurrentTabs;
