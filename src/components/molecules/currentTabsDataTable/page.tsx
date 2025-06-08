import { cols } from '@/components/molecules/currentTabsDataTable/cols';

import { DataTable } from '@/components/molecules/currentTabsDataTable/currentTabsDataTable';
import { Button } from '@/components/ui/button';

import { useFetchTabs } from '@/hooks/useFetchTabs';

const CurrentTabsDataTable = () => {
  const { tabs } = useFetchTabs();

  return (
    <>
      <DataTable columns={cols} data={tabs} />

      <Button className="w-full mt-2">Copy all links</Button>
    </>
  );
};

export default CurrentTabsDataTable;
