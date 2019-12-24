require('dotenv').config()
const Schedule = require('node-schedule');
const Discord = require('discord.js')

const client = new Discord.Client()

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

// client.on('message', msg => {
// //Fairly ugly way to see if runespirit has replied with tier list, then react for items
//   if (msg.author.username === 'Runespirit' && 
//     msg.embeds && msg.embeds[0].description.includes('tierlist')) {
//   }
// })

client.login(process.env.BOT_TOKEN)

Schedule.scheduleJob('0 17 * * *', function(){
    console.log('Running !r cron job');
    const tftChannel = client.channels.get('659065267095076864');
    const currentDate = new Date();
    tftChannel.send(`!r tierlist\n> TFT Item/Champs Tierlist ${currentDate.getDate()}/${currentDate.getMonth()+1}/${currentDate.getFullYear()}`);
    tftChannel.send(`!r teamcomps\n> TFT Team Comps ${currentDate.getDate()}/${currentDate.getMonth()+1}/${currentDate.getFullYear()}`);
  });