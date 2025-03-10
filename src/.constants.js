module.exports = Object.freeze({
  TOKEN: '733462745:AAHm9FIBR-Qd_M5PnvnkEPbMA5lxlLE_MSI',
  ARIA_SECRET: 'password',
  ARIA_DOWNLOAD_LOCATION: '/home/ubuntu/aria-telegram-mirror-bot/downloads',
  ARIA_DOWNLOAD_LOCATION_ROOT: '/', //The mountpoint that contains ARIA_DOWNLOAD_LOCATION
  ARIA_FILTERED_DOMAINS: [], // Prevent downloading from URLs containing these substrings
  ARIA_FILTERED_FILENAMES: [], // Files/top level directories with these substrings in the filename won't be downloaded
  GDRIVE_PARENT_DIR_ID: '1cpFPijI6AnRQNWsakt1NUYw1oniASICT',
  SUDO_USERS: [658490863,665100120],	// Telegram user IDs. These users can use the bot in any chat.
  AUTHORIZED_CHATS: [-1001337815489,-315293252,-1001255873545],	// Telegram chat IDs. Anyone in these chats can use the bot.
  STATUS_UPDATE_INTERVAL_MS: 12000, // A smaller number will update faster, but might cause rate limiting
  DRIVE_FILE_PRIVATE: {
    ENABLED: false,
    EMAILS: ['someMail@gmail.com', 'someOtherMail@gmail.com']
  },
  DOWNLOAD_NOTIFY_TARGET: {  // Information about the web service to notify on download completion.
    enabled: false,   // Set this to true to use the notify functionality
    host: 'hostname.domain',
    port: 80,
    path: '/botNotify'
  } 
});
