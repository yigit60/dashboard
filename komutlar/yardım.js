const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = (client, message, args) => {
  
  var sahip;

	if(ayarlar.sahip[0]) { //afrn tşk xd
  var sahip = ''
		for (var i = 0; i < ayarlar.sahip.length; i++) {
			var şuanki = client.users.get(ayarlar.sahip[i]).tag;
			if (i === 0) {
				sahip += şuanki
			}
			else if (i === ayarlar.sahip.length - 1) {
				sahip += ` ve ${şuanki}`;
			} else {
				sahip += ", " + şuanki
			}
		}
  }
  
  if (!args[0]) {
		const help = {}
		client.commands.forEach((command) => {
			const cat = command.conf.kategori;
			if (!help.hasOwnProperty(cat)) help[cat] = [];
			help[cat].push(`\`${command.help.name}\``);
		})
		var str = ''
		for (const kategori in help) {
			str += `**${kategori.charAt(0).toUpperCase() + kategori.slice(1)}** ${help[kategori].join(" | ")}\n\n`
		}

		const embed = new Discord.RichEmbed()
			.setAuthor(`${client.user.username} Komutları`)
			.setDescription(`= Komut Listesi =\n[Bir komut hakkında ayrıntılı bilgi için ${ayarlar.prefix}yardım <komut adı>]\n${str}`)
			.setColor("RANDOM")
		message.channel.send({embed})
		return
	}
	let command = args[0]
	if (client.commands.has(command)) {
		command = client.commands.get(command)
		var yetki = command.conf.permLevel.toString()
			.replace("0", `Yetki gerekmiyor.`)
			.replace("1", `Mesajları Yönet yetkisi gerekiyor.`)
			.replace("2", `Üyeleri At yetkisi gerekiyor.`)
			.replace("3", `Yönetici yetkisi gerekiyor.`)
			.replace("4", `Bot sahibi yetkisi gerekiyor.`)
		const embed = new Discord.RichEmbed()
			.addField('Komut', command.help.name, false)
			.addField('Açıklama', command.help.description, false)
			.addField('Kullanabilmek için Gerekli Yetki', yetki)
			.addField('Doğru Kullanım', ayarlar.prefix + command.help.usage)
			.addField('Alternatifler', command.conf.aliases[0] ? command.conf.aliases.join(', ') : 'Bulunmuyor')
			.setColor("RANDOM")
		message.channel.send({embed})
	} else {
		const embed = new Discord.RichEmbed()
			.setDescription(`Botta ${args[0]} isminde bir komut bulunamadı! ${ayarlar.prefix}yardım yazarak tüm komutlara bakabilirsiniz!`)
			.setColor("RANDOM")
		message.channel.send({embed})
	}
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['h', 'halp', 'help', 'y'],
  permLevel: 0
};

exports.help = {
  name: 'yardım',
  description: 'Tüm komutları listeler.',
  usage: 'yardım [komut]'
};
