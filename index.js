require('dotenv').config()

const Discord = require('discord.js');
const fs = require('fs');
const moment = require('moment').locale('ko-KR');
const client = new Discord.Client({disableEveryone: true});
const Config = require('./Config/Config.json')
client.commands = new Discord.Collection();

client.on('ready', async () => {
    console.log(`\n[ Login ] ${client.user.tag}\n`)
});

fs.readdir('./Commands/', (err, files) => {
    if(err) console.error(err);

    let jsfile = files.filter(f => f.split('.').pop() == 'js')
    if(jsfile.length <= 0){
        console.log("[ Commands ] Could't find commands.");
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./Commands/${f}`);
        console.log(`[ Commands ] Successfully loaded ${f} file.`);
        client.commands.set(props.help, props);
    });
});

client.on('message', async message => {
    if (message.author.bot) return
    if (message.channel.type === 'dm') return
    if (message.system) return

    if(!message.content.startsWith(Config.PREFIX)) return
    let messageArray = message.content.split(' ');
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    let commandFile = client.commands.get(cmd.slice(Config.PREFIX.length));
    if (commandFile) commandFile.run(client, message, args);
});

client.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = '+';
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if(cmd === Config.PREFIX + `serverinfo`){

    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("ServerInfo")
    .setColor("RANDOM")
    .setThumbnail(sicon)
    .addField("Server Name", message.guild.name)
    .addField("Created On", message.guild.createdAt)
    .addField("You joined", message.member.joinedAt)
    .setFooter(message.author.tag, message.author.avatarURL)
    .setTimestamp() //메세지 생성 시간
    .addField("Total Members", message.guild.memberCount);

    return message.channel.send(serverembed);
  }
})

client.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = '+';
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if(cmd === Config.PREFIX + `ping`){

    let sicon = message.guild.iconURL;
    let botping = await message.channel.send("계산 중...") //await로 완료되길 기다리면서 메세지 전송

    let pEmbed = new Discord.RichEmbed() //임베드 생성
    .setTitle(`${client.user.tag}의 핑:`) //제목 설정
    .addField("💬메세지: ", `${botping.createdTimestamp - message.createdTimestamp}ms`) //필드에 botping의 메세지 생성시간 - 명령어 메세지 생성 시간
    .addField('📡API: ', `${Math.round(client.ping)}ms`) //필드에 WebSocket 핑 추가
    .addField('코드 출처 ', `제로ㅣBrazil#5005 `) 
    .setFooter(message.author.tag, message.author.avatarURL) //footer에 메세지를 친 유저의 이름#태그 형식으로 쓴 후 아이콘은 해당 유저의 프사로 설정
    .setColor("RANDOM") //랜덤 컬러
    .setTimestamp() //메세지 생성 시간
    botping.edit(pEmbed) //botping를 수정

    return message.channel.send(serverembed);
  }
})

client.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = '+';
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if(cmd === Config.PREFIX + `profile`){

    let user = message.author
    let member = message.author

    let sicon = message.author.iconURL;
    let embed = new Discord.RichEmbed()
    .setTitle(`${user.tag}'s profile`)
    .setColor("RANDOM")
    .setThumbnail(sicon)
    .addField("봇", `${user.bot}`, true)
    .addField("상태", `${user.presence.status}`, true)
    .addField("게임", `${user.presence.game ? user.presence.game.name : 'None'}`, true)
    .setFooter(message.author.tag, message.author.avatarURL)
    .setTimestamp(); //메세지 생성 시간

    return message.channel.send(embed);
  }
})

client.login(process.env.TOKEN)
