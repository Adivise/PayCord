require("dotenv").config();

module.exports = {
  // Discord bot token
  TOKEN: process.env.TOKEN || "DISCORD_BOT_TOKEN",

  // Role to give to members who set custom status!
  ROLE_ID: process.env.ROLE_ID || "ROLE_ID",

  // What you need people to set custom status
  CUSTOM_STATUS: process.env.CUSTOM_STATUS || "discord.gg/paycord",

  // Channel logs
  CHANNEL_LOG: process.env.CHANNEL_LOG || "CHANNEL_LOG",
}