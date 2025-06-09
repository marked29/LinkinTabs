import { useState, useEffect, useCallback } from 'react';

export interface TabInfo {
  link: string | undefined;
}

export const useFetchTabs = () => {
  const [tabs, setTabs] = useState<TabInfo[] | undefined>();

  const fetchAllTabs = useCallback(async () => {
    if (!chrome || !chrome.tabs) {
      console.error('Chrome tabs API is not available');
      return;
    }
    const tabs = await chrome.tabs.query({});
    setTabs(tabs.map((tab) => ({ link: tab.url })));
  }, []);

  useEffect(() => {
    fetchAllTabs();
  }, [fetchAllTabs]);

  return { tabs, fetchAllTabs };
};

export default useFetchTabs;
