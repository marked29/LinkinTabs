import { useState } from 'react';

import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const REGEX_URL = /\b((?:https?:\/\/|www\.)[^\s"'<>]+(?:\.[^\s"'<>]+)*(?:\/[^\s"'<>]*)?)/gi;

const extractLinks = (text: string): string[] => {
  const matches = text.match(REGEX_URL);
  return matches ? matches.map((link) => link.trim()) : [];
};

const OpenTabs = () => {
  const [bulkLinks, setBulkLinks] = useState<string>('');

  const openAllTabs = () => {
    const links = extractLinks(bulkLinks);
    if (links.length === 0) {
      alert('No valid links to open');
      return;
    }
    // Open each link in a new tab (works in browser extension context)
    links.forEach((url) => {
      chrome.tabs.create({ url });
    });
  };

  return (
    <>
      <Textarea placeholder="Type in your links to open" value={bulkLinks} onChange={(e) => setBulkLinks(e.target.value)} />

      <Button className="w-[100%] mt-2" onClick={openAllTabs}>
        Open all tabs
      </Button>
    </>
  );
};

export default OpenTabs;
