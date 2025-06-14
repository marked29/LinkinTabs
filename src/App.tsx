import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Toaster } from '@/components/ui/sonner';

import OpenTabs from '@/components/molecules/openTabs/openTabs';
import CurrentTabsDataTable from '@/components/molecules/currentTabsDataTable/page';

const TAB_TRIGGER_VALUES = {
  CURRENT_TABS: 'Manage Tabs',
  NEW_TABS: 'Open New Tabs',
};

function App() {
  return (
    <>
      <Toaster position="top-center" richColors />
      <main className="w-[370px] p-4 space-y-4">
        <div className="flex items-center justify-center gap-2">
          <img src="icons/icon128.png" alt="Linkin Tabs Logo" className="w-8 h-8 " />
          <h1 className="text-xl font-bold text-center">Linkin Tabs</h1>
        </div>
        <Tabs defaultValue={TAB_TRIGGER_VALUES.NEW_TABS} className="w-full h-[inherit]">
          <TabsList className="w-full mx-auto flex justify-center">
            <TabsTrigger value={TAB_TRIGGER_VALUES.CURRENT_TABS}>{TAB_TRIGGER_VALUES.CURRENT_TABS}</TabsTrigger>
            <TabsTrigger value={TAB_TRIGGER_VALUES.NEW_TABS}>{TAB_TRIGGER_VALUES.NEW_TABS}</TabsTrigger>
          </TabsList>
          <TabsContent value={TAB_TRIGGER_VALUES.CURRENT_TABS}>
            <CurrentTabsDataTable />
          </TabsContent>
          <TabsContent value={TAB_TRIGGER_VALUES.NEW_TABS}>
            <OpenTabs />
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
}

export default App;
