import { useState, useEffect, useCallback } from 'react';

export const useFetchTabs = () => {
  const [tabs, setTabs] = useState<any[]>([]);
  // const [error, setError] = useState<string | null>(null);

  const fetchAllTabs = useCallback(async () => {
    if (!chrome || !chrome.tabs) {
      // setError('Chrome tabs API is not available');
      console.error('Chrome tabs API is not available');
      return;
    }
    const tabs = await chrome.tabs.query({});
    setTabs(tabs.map((tab) => tab.url));
  }, []);

  useEffect(() => {
    fetchAllTabs();
  }, [fetchAllTabs]);

  return { tabs, fetchAllTabs };
};

export default useFetchTabs;
