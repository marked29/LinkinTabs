import { useState } from 'react';
import { toast } from 'sonner';

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
      toast.error('No valid links to open');
      return;
    }
    links.forEach((url) => {
      chrome.tabs.create({ url });
    });
  };

  return (
    <>
      <Textarea
        aria-placeholder="input for the links to be opened"
        className="h-[428px] w-full text-[12px] resize-none"
        placeholder="Type in your links to open"
        value={bulkLinks}
        onChange={(e) => setBulkLinks(e.target.value)}
      />
      <Button className="w-full mt-2" onClick={openAllTabs}>
        Open all tabs
      </Button>
    </>
  );
};

export default OpenTabs;
