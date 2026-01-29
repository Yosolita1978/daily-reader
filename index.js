const NOTION_TOKEN = process.env.NOTION_TOKEN;
const DATA_SOURCE_ID = process.env.NOTION_DATA_SOURCE_ID;
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

async function getRandomLink() {
  const response = await fetch(`https://api.notion.com/v1/data_sources/${DATA_SOURCE_ID}/query`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${NOTION_TOKEN}`,
      'Notion-Version': '2025-09-03',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      page_size: 100
    })
  });

  const data = await response.json();
  
  console.log('Notion response:', JSON.stringify(data, null, 2));

  if (!data.results || data.results.length === 0) {
    throw new Error('No items found in database');
  }

  const randomIndex = Math.floor(Math.random() * data.results.length);
  const item = data.results[randomIndex];

  const title = item.properties.Title?.title?.[0]?.plain_text || 'No title';
  const url = item.properties.URL?.url || 'No URL';

  return { title, url };
}

async function sendTelegramMessage(text) {
  const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: text
    })
  });

  const data = await response.json();
  
  if (!data.ok) {
    throw new Error(`Telegram error: ${data.description}`);
  }
}

async function main() {
  const { title, url } = await getRandomLink();
  
  const message = `📚 Link to check today:\n\n${title}\n${url}`;
  
  await sendTelegramMessage(message);
  
  console.log('Message sent:', title);
}

main();
