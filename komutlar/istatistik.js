const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

module.exports.run = async (client, message, args) => {
   const seksizaman = moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");
   const istatistikler = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setFooter('Zula Bot', client.user.avatarURL)
  .addField("» Botun Sahibi", "<@4417633615204188171> | Y.G.V.#2993")
  .addField("» Bellek kullanımı", (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + ' MB', true)  
  .addField("» Çalışma süresi", seksizaman)
  .addField("» Kullanıcılar", client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString(), true)
 .addField("» Sunucular", client.guilds.size.toLocaleString(), true)
  .addField("» Kanallar", client.channels.size.toLocaleString(), true)
  .addField("» Discord.JS sürüm", "v"+Discord.version, true)
  .addField(`» Node.JS sürüm`, `${process.version}`, true)
  .addField("» Ping", client.ping+" ms", true)
  .addField("**❯ Sitemiz**", " [Site](https://forum.suprayapim.com)", )
  return message.channel.send(istatistikler);
  };

exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: ['i', 'bot durum', 'botdurumu', 'botdurum', 'botistatistik', 'durum'],
  permLevel: 0 
};

exports.help = {
  name: 'istatistik', 
  description: 'Belirtilen işlemi yapar.',
  usage: 'istatistik'
};