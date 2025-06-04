import { useState, useEffect } from 'react';
import { type CurrentTabsDataTableProps, cols } from '@/components/molecules/currentTabsDataTable/cols';
import { DataTable } from '@/components/molecules/currentTabsDataTable/currentTabsDataTable';

const tabsStubData: CurrentTabsDataTableProps[] = [
  { id: '1', link: 'https://example.com/1' },
  { id: '2', link: 'https://example.com/2' },
  { id: '3', link: 'https://example.com/3' },
  { id: '4', link: 'https://example.com/4' },
];

async function getData(): Promise<CurrentTabsDataTableProps[]> {
  // Simulate an API call to fetch data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(tabsStubData);
    }, 1000);
  });
}

const CurrentTabsDataTable = () => {
  const [data, setData] = useState<CurrentTabsDataTableProps[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await getData();
      setData(result);
    };
    fetchData();
  }, []);
  return (
    <div>
      <DataTable columns={cols} data={data} />
    </div>
  );
};

export default CurrentTabsDataTable;
