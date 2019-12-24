require('dotenv').config()
const Schedule = require('node-schedule');
const Discord = require('discord.js')

const client = new Discord.Client()

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

// client.on('message', msg => {
//     console.log(msg)
//     if (msg.channel.id === '659065267095076864') //TFT Text channel
//   if (msg.content === 'ping') {
//     msg.reply('Pong!')
//   }
// })

client.login(process.env.BOT_TOKEN)

Schedule.scheduleJob('53 * * * *', function(){
    console.log('The answer to life, the universe, and everything!');
    const currentDate = new Date();
    client.channels.get('659065267095076864')
    .send(`!r teamcomps\n>TFT Team Comps ${currentDate.getDate()}/${currentDate.getMonth()+1}/${currentDate.getFullYear()}`)
  });