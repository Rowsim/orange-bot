require('dotenv').config()
const Discord = require('discord.js')

const client = new Discord.Client()

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', msg => {
    console.log(msg)
    if (msg.channel.id === '659065267095076864') //TFT Text channel
  if (msg.content === 'ping') {
    msg.reply('Pong!')
  }
})

client.login(process.env.BOT_TOKEN)