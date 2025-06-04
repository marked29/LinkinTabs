import { useEffect, useState } from 'react';
import { Button } from './components/ui/button';
import { Card, CardContent } from './components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

function App() {
  const [tabs, setTabs] = useState<any[]>([]);
  const [bulkLinks, setBulkLinks] = useState<string>('');

  useEffect(() => {
    if (!chrome || !chrome.tabs) {
      console.error('Chrome tabs API is not available');
      return;
    }

    fetchAllTabs();
  }, []);

  const fetchAllTabs = async () => {
    const tabs = await chrome.tabs.query({});
    console.log('Current tabs:', tabs);
    const openedTabs = tabs.map((tab) => tab.url);

    if (openedTabs.length === 0) {
      return;
    }

    setTabs(openedTabs);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      console.log('Text copied to clipboard:', text);
    } catch (err) {
      console.error('Failed to copy text to clipboard:', err);
    }
  };

  const handleCopyAllLinks = () => {
    if (tabs.length === 0) {
      alert('No links to copy');
      return;
    }
    const allLinks = tabs.join('\n');
    copyToClipboard(allLinks);
    alert('All links have been copied to clipboard');
  };

  const extractLinks = (text: string): string[] => {
    const urlRegex = /\b((?:https?:\/\/|www\.)[^\s"'<>]+(?:\.[^\s"'<>]+)*(?:\/[^\s"'<>]*)?)/gi;
    const matches = text.match(urlRegex);
    return matches ? matches.map((link) => link.trim()) : [];
  };

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
      <main className="w-[300px] p-4 space-y-4">
        <h1 className="text-xl font-bold text-center">Linkin Tabs</h1>
        <Tabs defaultValue="opened">
          <TabsList className="w-full mx-auto flex justify-center">
            <TabsTrigger value="opened">Current tabs</TabsTrigger>
            <TabsTrigger value="closed">Open bulk</TabsTrigger>
          </TabsList>
          <TabsContent value="opened">
            <Card>
              <CardContent className="space-y-2 py-1">
                <ul>
                  {tabs && tabs.length > 0 ? (
                    tabs.map((link, idx) => (
                      <li key={idx} className="text-sm text-blue-600 truncate">
                        <a href={link} target="_blank" rel="noopener noreferrer">
                          {link}
                        </a>
                      </li>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <li className="text-sm text-gray-500">No tabs opened</li>
                      <li>
                        <Button onClick={fetchAllTabs}>Get all tabs</Button>
                      </li>
                    </div>
                  )}
                </ul>
              </CardContent>
            </Card>

            <div className="flex gap-2 mt-2">
              <Button className="flex-1" onClick={handleCopyAllLinks}>
                Copy all links
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="closed">
            <Card>
              <CardContent>
                <Textarea placeholder="Type in your links to open" value={bulkLinks} onChange={(e) => setBulkLinks(e.target.value)} />
              </CardContent>
            </Card>

            <div className="flex gap-2 mt-2">
              <Button className="w-[100%]" onClick={openAllTabs}>
                Open all tabs
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
}

export default App;
