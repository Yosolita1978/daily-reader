# Daily Reader

A lightweight Telegram bot that sends daily reading reminders by fetching random links from your Notion database. Perfect for building a consistent reading habit.

## How It Works

1. Fetches a random entry from your Notion database
2. Sends it as a Telegram message with the title and URL
3. Runs automatically on weekdays via GitHub Actions

```
GitHub Actions (weekdays at 2 PM UTC)
    ↓
Notion API → Get random link
    ↓
Telegram API → Send message to you
```

## Features

- **Zero dependencies** - Uses native Node.js fetch API
- **Weekday-only reminders** - No notifications on weekends
- **Simple setup** - Just configure secrets and you're done
- **Manual trigger** - Can be run on-demand via GitHub Actions

## Prerequisites

- Node.js 18+ (for native fetch support)
- A Notion workspace with a database containing your reading list
- A Telegram bot (create one via [@BotFather](https://t.me/BotFather))

## Setup

### 1. Notion Configuration

1. Create a database in Notion with at least these properties:
   - `Title` (title) - Name of the resource
   - `URL` (url) - Link to the resource

2. Create a Notion integration at [notion.so/my-integrations](https://www.notion.so/my-integrations)
3. Share your database with the integration
4. Note your integration token and data source ID

### 2. Telegram Configuration

1. Create a bot via [@BotFather](https://t.me/BotFather) and save the token
2. Start a chat with your bot
3. Get your chat ID by messaging [@userinfobot](https://t.me/userinfobot) or using the Telegram API

### 3. GitHub Actions Setup

Add these secrets to your repository (Settings → Secrets and variables → Actions):

| Secret | Description |
|--------|-------------|
| `NOTION_TOKEN` | Your Notion integration token |
| `NOTION_DATA_SOURCE_ID` | Your Notion data source ID |
| `TELEGRAM_BOT_TOKEN` | Your Telegram bot token |
| `TELEGRAM_CHAT_ID` | Your Telegram chat ID |

The workflow runs automatically at 2 PM UTC on weekdays. You can also trigger it manually from the Actions tab.

## Local Development

```bash
# Clone the repository
git clone https://github.com/your-username/daily-reader.git
cd daily-reader

# Set environment variables
export NOTION_TOKEN="your_notion_token"
export NOTION_DATA_SOURCE_ID="your_data_source_id"
export TELEGRAM_BOT_TOKEN="your_telegram_bot_token"
export TELEGRAM_CHAT_ID="your_chat_id"

# Run
npm start
```

## License

MIT
