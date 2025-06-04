import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import CurrentTabs from '@/components/molecules/currentTabs';
import OpenTabs from '@/components/molecules/openTabs';
import useFetchTabs from '@/hooks/useFetchTabs';

function App() {
  const { tabs, fetchAllTabs } = useFetchTabs();

  return (
    <>
      <main className="w-[300px] p-4 space-y-4">
        <h1 className="text-xl font-bold text-center">Linkin Tabs</h1>
        <Tabs defaultValue="opened">
          <TabsList className="w-full mx-auto flex justify-center">
            <TabsTrigger value="opened">Current tabs</TabsTrigger>
            <TabsTrigger value="closed">Open bulk</TabsTrigger>
          </TabsList>
          <TabsContent value="opened">
            <CurrentTabs tabLinks={tabs} fetchAllTabs={fetchAllTabs} />
          </TabsContent>
          <TabsContent value="closed">
            <OpenTabs />
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
}

export default App;
