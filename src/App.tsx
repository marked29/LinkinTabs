import { useState } from 'react';
import { Button } from './components/ui/button';
import { Card, CardContent } from './components/ui/card';

function App() {
  const [tabs, setTabs] = useState<any[]>([]);

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

  return (
    <>
      <main className="w-[300px] p-4 space-y-4">
        <h1 className="text-xl font-bold text-center">Linkin Tabs</h1>

        <Card>
          <CardContent className="space-y-2 py-2">
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
                <li className="text-sm text-gray-500">No tabs opened</li>
              )}
            </ul>
          </CardContent>
        </Card>

        <div className="flex gap-2">
          <Button className="flex-1" onClick={fetchAllTabs}>
            Get all tabs
          </Button>
          <Button className="flex-1" onClick={handleCopyAllLinks}>
            Add All links
          </Button>
        </div>
      </main>
    </>
  );
}

export default App;
