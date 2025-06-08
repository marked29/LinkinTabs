import React from 'react';

import CurrentTabsDataTable from '@/components/molecules/currentTabsDataTable/page';
import { Button } from '@/components/ui/button';

const CurrentTabs = React.memo(() => {
  return (
    <>
      <CurrentTabsDataTable />
    </>
  );
});

export default CurrentTabs;
