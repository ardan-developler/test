const Discord = require('discord.js');

const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
  console.log(`online`)
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = '+';
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if(cmd === `${prefix}test`){
    return message.channel.send("test clear");
  }
})

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = '+';
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if(cmd === `${prefix}serverinfo`){

    let sicon = message.guild.displayAvatarURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("ServerInfo")
    .setColor("#6184ff")
    .setThumbnail(sicon)
    .addField("Server Name", message.guild.name)
    .addField("Created On", message.guild.createdAt)
    .addField("You joined", message.member.joinedAt)
    .addField("Total Members", message.guild.memberCount);

    return message.channel.send(serverembed);
  }
})

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = '+';
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if(cmd === `${prefix}userinfo`){
    let user = message.mentions.users.first() || message.author;

    let userinfo = {};
    userinfo.avatar = user.displayAvatarURL()
    userinfo.name = user.username;
    userinfo.discrim - `#${user.discriminator}`;
    userinfo.id = user.id;
    userinfo.status = user.presence.status;
    userinfo.registered = moment.utc(message.guild.members.get(user.id).user.createdAt).format("dddd, MMMM do, YYYY");
    userinfo.joined = moment.utc(message.guild.members.get(user.id).joinedAt).format("dddd, MMMM Do, YYYY");

    let userembed = new Discord.RichEmbed()
    .setAuthor(user.tag, userinfo.avatar)
    .setThumbnail(userinfo.avatar)
    .addField(`username`, userinfo.name, true)
    .addField(`Discriminator`, userinfo.discrim, true)
    .addField(`ID`, userinfo.id, true)
    .addField(`Status`, userinfo.status, true)
    .addField(`Account Creation Date`, userinfo.registered)
    .addField(`Server Joined`, userinfo.joined)

    return message.channel.send(userembed);
  }
})

bot.login("NjI1MTYxODkyNTc0Mzk2NDI3.XYtKYQ.7HL_6L2urR0ZSMahVNobfFlHSoQ");
