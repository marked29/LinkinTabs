import { cols } from '@/components/molecules/currentTabsDataTable/cols';

import { DataTable } from '@/components/molecules/currentTabsDataTable/currentTabsDataTable';
import { Button } from '@/components/ui/button';

import { useFetchTabs } from '@/hooks/useFetchTabs';

const CurrentTabsDataTable = () => {
  const { tabs, fetchAllTabs } = useFetchTabs();

  return (
    <>
      {tabs && tabs.length > 0 ? (
        <DataTable columns={cols} data={tabs} />
      ) : (
        /**
         *  TODO: Not sure if this logic is needed: because the only scenario
         * where `tabs` are not available is
         * when we run the code not in a Chrome
         * extension context, but keeping it for safety
         */

        <div className="flex flex-col items-center gap-4">
          <p className="text-gray-500">No tabs available.</p>
          <Button onClick={fetchAllTabs}>Fetch all tabs</Button>
        </div>
      )}
    </>
  );
};

export default CurrentTabsDataTable;
