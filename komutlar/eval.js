const Discord = require("discord.js");

exports.run = async (client, message, args, color, prefix) => {
    if(message.author.id !== "417633615204188171") return message.reply(`bu komutu sadece Bot Sahibi kullanabilir!`);
    try {
        let codein = args.join(" ");
        let code = eval(codein);

      if (codein.length < 1) return message.reply(`deneyebilmek için bir kod girmelisin!`)
      
        if (typeof code !== 'string')
            code = require('util').inspect(code, { depth: 0 });
        let embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .addField(':inbox_tray: | Kod', `\`\`\`js\n${codein}\`\`\``)
        .addField(':outbox_tray: | Sonuç', `\`\`\`js\n${code}\n\`\`\``)
        message.channel.send(embed)
    } catch(e) {
      let embed2 = new Discord.RichEmbed()
      .setColor('RANDOM')
      .addField('Hata', "\`\`\`js\n"+e+"\n\`\`\`")
        message.channel.send(embed2);
    }
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['kod'],
    permLevel: `Bot sahibi olmak gerekir. (${4})`
  };
  
  exports.help = {
    name: 'eval',
    description: 'Kod denemeyi sağlar.',
    usage: 'sm!eval'
  };