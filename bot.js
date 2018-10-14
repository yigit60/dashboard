
/////////////////////////////////////////////////////////////////////////////
const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const db = require('quick.db');
const moment = require('moment');
const Jimp = require('jimp');
const send = require('quick.hook')
const snekfetch = require('snekfetch');
require('./util/eventLoader')(client);

let cyber = "442321157320867841"








const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};


var prefix = ayarlar.prefix;


client.on("message", message => {
  const dmchannel = client.channels.find("name", "mod-log");
  if (message.channel.type === "dm") {
      if (message.author.id === client.user.id) return;
      dmchannel.sendMessage("", {embed: {
              color: 3447003,
              title: `DM Atan Kişi: **${message.author.tag}**`,
              description: `Dm Mesajı: **${message.content}**`
            }})
  }
  if (message.channel.bot) return;
});


client.on("ready", () => {
client.user.setStatus("dnd");
client.user.setActivity(`${client.user.username} ☩ ${client.guilds.size} Sunucu ☩ ${client.users.size} Kullanıcı!`, { type: 'WATCHING' });
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
}


client.on('message', async msg => {
  if (msg.content.toLowerCase() === 'sa') {
    await msg.react('🇦');
    msg.react('🇸');
  }
  });



client.on('message', msg => {
  if (msg.content === 'sa') {
    msg.reply('Aleyküm Selam! Hoşgeldin Kanka!  ');
  }
});

client.on("message", msg => {
    const kufur = ["chatsil"];
    if (kufur.some(word => msg.content.includes(word)) ) {
        msg.delete('50')
      msg.channel.bulkDelete('99')
        msg.reply("Chati siliyorum kardeşim..")
    }
});


client.on('message', msg => {
  if (msg.content.toLowerCase() === '<@483194308099440641>') {
        setTimeout(() => {
    }, 1000);//bekle
    msg.react('🇹')
    msg.react('🇲')
            setTimeout(() => {
    }, 1500);
    msg.reply('Botun Prefixi: r+');
  }
});


//dene

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (ayarlar.sahip.includes(message.author.id)) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});



client.on('message', msg => {
  if (msg.content === 'bb') {
    msg.reply('Görüşmek Üzere Dostum... :hand_splayed::skin-tone-2:  ');
  }
});


client.ayar = db;
client.config = require("./config.js");
require("./modules/functions.js")(client);

client.ayarlar = {
        "sahip": ["417633615204188171"],  //kendi IDnızı yazınız
};

client.on("ready", async () => {
  client.appInfo = await client.fetchApplication();
  setInterval( async () => {
    client.appInfo = await client.fetchApplication();
  }, 60000);
  
  require("./modules/dashboard.js")(client);
});



client.on('message', msg => {
 if (msg.content === 'Malım') { 
    msg.reply('Mallar Diyarına Hoşgeldin O Zaman. ! :clap:  ');
  }
});



client.on('message', msg => {
  if (msg.content === 'Naber Ryting') {
    msg.reply('İyi Senden Naber.  ');
  }
});



client.on('message', msg => {
  if (msg.content === 'Bende İyiyim') {
    msg.reply('Hadi Sağlıcakla Kal Ben Kaçtım....  ');
  }
});



client.on('message', msg => {
  if (msg.content === 'Teşekkürler Ryting') {
    msg.reply('Önemli Değil Knk r+yardım Yazarak Komutlarıma Bakabilirsin!  ');
  }
});



client.on('message', msg => {
  if (msg.content === 'Prefix') {
    msg.reply('Prefixim s? Bunu Kopyalaya Bilirsin!  ');
  }
});




client.on('message', message => {
if (message.content.toLowerCase() === prefix + "bot.js") {
message.member.addRole('name', 'bot.js');
  client.channels.get("478920305025351683").send("ROLÜ VERDİM DOSTUM!!!")
    }
});



	client.on('message', message => {
if (message.content.toLowerCase() === prefix + "espiri") {
    var sans = ["Geçen gün geçmiş günlerimi aradım ama meşguldü.", "Yağmur yağmış kar peynir", "Dünya dönermiş ay da köfte…", "Bu erikson başka erik yok.", "Yıkanan Ton a ne denir Washington", "Hadi oyun oynayalım. Vazgeçtim oymadan oynayalım!", "Geçen gün kamyonu sürdüm Leonardo da Vinci.", "Doğumdan sonra çok kilo aldım. Doğduğumda 2 kiloydum şimdi 62.", "Adam 7 gün boyunca nezle olmuş. Sıkılmış bugün de Petek le olayım demiş.", "Yarasa yararlı bir hayvandır. Yararlı bir hayvan olmasaydı yaramasa derlerdi.", " Benim neden kardeşim yok baba  Seni görünce ikincisine cesaret edemedik.", "Osmanlıda kimseye borç takamıyordun mesela sikke sikke ödüyodun…", "Tatlı yiyip, tatlı konuşuluyorsa bundan sonra mantı yiyip mantıklı konuşacağız.", "Babamı sahura kaldırmayı unuttuk anneme masada ne eksik diyorum tuzluk mu diyor.", "+Okeyde kıza elin nasıl dedim. Ojeli dedi. Ben Şoka girdim. O Migrosa.","En Hızlı Sayı Hangisidir? 10. Çünkü https://www.youtube.com/watch?v=vNq9JlNKhxQ .","Canım sıkkın kanka sonra gel"];
    var sonuc = sans[Math.floor((Math.random() * sans.length))];
    const embed = new Discord.RichEmbed()
    .addField(`***___Espri___***`, `${sonuc}`)
    return message.channel.sendEmbed(embed);
}
});



client.on('message', msg => {
if (msg.content.toLowerCase() === prefix + "sigara") {
  msg.react('🚬');
  msg.react('☁');
msg.channel.send('🚬☁☁☁')
.then(nmsg => nmsg.edit('🚬☁☁☁☁'))
.then(nmsg => nmsg.edit('🚬☁☁☁'))
.then(nmsg => nmsg.edit('🚬☁☁'))
.then(nmsg => nmsg.edit('🚬☁'))
.then(nmsg => nmsg.edit('🚬☁'))
.then(nmsg => nmsg.edit('**Sigaran bitti!** | **Sigara İçmeyiniz.** :no_smoking: **Sigara Sağlığa Zararlıdır Dostum.** **Ciğerlerinde Kanser Çıkıp Ölünce Sorumlusu Biz Değiliz.**'));
   msg.react('🚬')
  msg.react('☁')
}
});





//hataları sen çözersin artık dene bakım oldumu
client.on('message', message => {
if (message.content.toLowerCase() === prefix + "zekam") {
    var sans = ["11", "15", "20", "24", "28", "31? :D", "35", "39", "42", "48", "52", "54", "58", "63", "67", "77", "73", "84", "80", "83", "96", "94", "99", "Albert Einstein mısın lov?"];
    var sonuc = sans[Math.floor((Math.random() * sans.length))];
    const embed = new Discord.RichEmbed()
    .addField(`***___Zekan___***`, `${sonuc}`)
    return message.channel.sendEmbed(embed);
}
});
  
 
 
 client.on("message", async message => {
    const args = message.content.substring(prefix.length).split(" ");
    const command = args.shift().toLowerCase();
if(command === "discrim") {
        const discrim = args[0] || message.author.discriminator;
        const users = client.users.filter(user => user.discriminator === discrim).map(user => user.tag);
        
        if (users < 1) {
const embed2 = new Discord.RichEmbed()
.setColor(3447003)
.setDescription(`${discrim} bulunamadı!`)
            return message.channel.send({embed2});
        } else {
           message.channel.send(`${users.join('\n')}`, { split: true })
        }
    }
});
 
 
 
 
 client.on("message", async message => {
    const args = message.content.substring(prefix.length).split(" ");
    const command = args.shift().toLowerCase();
    if (command === "tersyazı") {
        const mapping = '¡"#$%⅋,)(*+\'-˙/0ƖᄅƐㄣϛ9ㄥ86:;<=>¿@∀qƆpƎℲפHIſʞ˥WNOԀQɹS┴∩ΛMX⅄Z[/]^_`ɐqɔpǝɟƃɥᴉɾʞlɯuodbɹsʇnʌʍxʎz{|}~';
        // Start with the character '!'
        const OFFSET = '!'.charCodeAt(0);
        if (args.length < 1) {
            message.channel.send('BOŞLUĞU TERS ÇEVİRMEMİMİ BEKLİYORSUN?');
        }

        message.channel.send(
            args.join(' ').split('')
            .map(c => c.charCodeAt(0) - OFFSET)
            .map(c => mapping[c] || ' ')
            .reverse().join('')
        )
    }
});
 

client.on('guildCreate', guild => {
  guild.owner.send('Beni Eklediğin İçin Teşekkürler | Komutlarıma r+yardım Yazarak Bakabilirsiniz | Discord Sunucuma Gidmek İçin [Tikla!]( https://goo.gl/fJg3z5)%27)')
})






client.on('message', message => {
    if (message.content.toLowerCase() === 's?kedim') {
var request = require('request');

request('http://aws.random.cat/meow', function (error, response, body) {
    if (error) return console.log('Hata:', error);
    else if (!error) { 
        var info = JSON.parse(body);
  const foto = new Discord.RichEmbed()
  .setImage(info.file)
      message.channel.send(foto)
    }
})
    }
});









client.on('message', async message => {
  if (message.content.toLowerCase() === prefix + 'döviz') {
var request = require('request');
request('https://www.doviz.com/api/v1/currencies/USD/latest', function (error, response, body) {
  if (error) return console.log('Hata:', error);
  else if (!error) { 
      var info = JSON.parse(body);
request('https://www.doviz.com/api/v1/currencies/EUR/latest', function (error, response, body) {
  if (error) return console.log('Hata:', error); 
  else if (!error) { 
      var euro = JSON.parse(body);

      let doviz = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setFooter(`${message.author.username} tarafından istendi.`, message.author.avatarURL)
      .addField("💎 Döviz", `**💵 Dolar: **${info.buying} TL\n**💶 Euro: **${euro.buying} TL`)
     
      message.channel.send(doviz);
}
})
  }
})
  }
});

client.on("message", async message => {
    const args = message.content.substring(prefix.length).split(" ");
    const command = args.shift().toLowerCase();
    if (command === "havalıyazı") {
        const mapping = '¡"#$%⅋,)(*+\'-˙/0ƖᄅƐㄣϛ9ㄥ86:;<=>¿@ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ[/]^_`ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ{|}~';
        const OFFSET = '!'.charCodeAt(0);
        if (args.length < 1) {
            message.channel.send('Boşluğu HAVALI YA-ZA-MAM! Bir KELİME YAZMALISIN!!!');
        }

        message.channel.send(
            args.join(' ').split('')
            .map(c => c.charCodeAt(0) - OFFSET)
            .map(c => mapping[c] || ' ')
            .join('')
        )
    }
});











client.on("message", async message => {
  var user = message.mentions.users.first() || message.author;
    if (message.content.toLowerCase() === prefix + "wasted") {
      message.channel.startTyping();
        var user = message.mentions.users.first() || message.author;
        if (!message.guild) user = message.author;

        Jimp.read(user.avatarURL, (err, image) => {
            image.resize(295, 295)
            image.greyscale()
            image.gaussian(3)
            Jimp.read("https://cdn.glitch.com/b18a2fa6-68cb-49d5-9818-64c50dd0fdab%2F1.png?1529363616039", (err, avatar) => {
                avatar.resize(295, 295)
                image.composite(avatar, 4, 0).write(`./img/wasted/${client.user.id}-${user.id}.png`);
                setTimeout(function() {
                    message.channel.send(new Discord.Attachment(`./img/wasted/${client.user.id}-${user.id}.png`));
                }, 1000);
          message.channel.stopTyping();
            });
        });
    }
});




const GIFEncoder = require('gifencoder');

client.on("message", async message => {
  var user = message.mentions.users.first() || message.author;
    if (message.content.toLowerCase() === prefix + "trigger") {
        const options = {
            size: 256,
          
            frames: 16
        }

        message.channel.send("Yapıyorum dostum sakin ol ve bekle.... ⏲").then(m => m.delete(1000));

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        const args = message.content.split(' ').slice(1);
        let member = message.mentions.users.first()
        if (args[0] === undefined) member = message.author;
        let avatarurl = member.avatarURL;
        if (['jpg', 'jpeg', 'gif', 'png', 'webp'].some(x => args.join(' ').includes(x))) {
            avatarurl = args.join(' ').replace(/gif|webp/g, 'png');
        }
        const base = new Jimp(options.size, options.size);
        const avatar = await Jimp.read(avatarurl);
        const text = await Jimp.read('https://cdn.glitch.com/a7d3b6b8-9b7a-4aab-9ee4-1db0c07ef1eb%2Ftriggered.png?1526842782410');
        const tint = await Jimp.read('https://cdn.glitch.com/5fed2789-b430-43c5-bf1b-a8dd32d46b97%2Fred.png?1527082445373');
        avatar.resize(320, 320);
        tint.scaleToFit(base.bitmap.width, base.bitmap.height);
        tint.opacity(0.2);
        text.scaleToFit(280, 60);
        const frames = [];
        const buffers = [];
        const encoder = new GIFEncoder(options.size, options.size);
        const stream = encoder.createReadStream();
        let temp;

        stream.on('data', async buffer => await buffers.push(buffer));
        stream.on('end', async () => {
            return await message.channel.send({
                files: [{
                    name: 'ygvtrigerred.gif',
                    attachment: Buffer.concat(buffers)
                }]
            });
        });
        for (let i = 0; i < options.frames; i++) {
            temp = base.clone();
            if (i === 0) {
                temp.composite(avatar, -16, -16);
            } else {
                temp.composite(avatar, -32 + getRandomInt(-16, 16), -32 + getRandomInt(-16, 16));
            }
            temp.composite(tint, 0, 0);
            if (i === 0) temp.composite(text, -10, 200);
            else temp.composite(text, -12 + getRandomInt(-8, 8), 200 + getRandomInt(-0, 12));
            frames.push(temp.bitmap.data);
        }
        encoder.start();
        encoder.setRepeat(0);
        encoder.setDelay(20);
        for (const frame of frames) {
            encoder.addFrame(frame);
        }
        encoder.finish();
    }
})








client.on("message", async message => {
  var user = message.mentions.users.first() || message.author;
    if (message.content.toLowerCase() === prefix + "sniper") {
        var user = message.mentions.users.first() || message.author;
        if (!message.guild) user = message.author;

        message.channel.send("Yapıyorum dostum sakin ol ve bekle....  ⏲").then(m => m.delete(1000));

        Jimp.read(user.avatarURL, (err, image) => {
            image.resize(310, 325)
            image.greyscale()
            image.gaussian(3)
            Jimp.read("https://cdn.glitch.com/b18a2fa6-68cb-49d5-9818-64c50dd0fdab%2FPNGPIX-COM-Crosshair-PNG-Transparent-Image.png?1529363625811", (err, avatar) => {
                avatar.resize(310, 325)
                image.composite(avatar, 2, 0).write(`./img/snip/${client.user.id}-${user.id}.png`);
                setTimeout(function() {
                    message.channel.send(new Discord.Attachment(`./img/snip/${client.user.id}-${user.id}.png`));
                }, 1000);
            });

        });
    }
});








let pprefix = "r+";
const table = require('table');
const arraySort = require('array-sort');

client.on("message", async message => {
  var user = message.mentions.users.first() || message.author;
    if (message.content.toLowerCase() === prefix + "davetler") {
        let invites = await message.guild.fetchInvites().catch(error => {
            return message.channel.send(`Davetleri görüntülemek için yetkim bulunmuyor.`);
        })
        invites = invites.array();
        arraySort(invites, 'uses', {
            reverse: true
        }); 
        let possibleInvites = [
            ['Kullanıcı', 'Kullanım']
        ]; 
        invites.forEach(function(invite) {
            possibleInvites.push([invite.inviter.username, invite.uses]);
        })
        const embed = new Discord.RichEmbed()
            .setColor("RANDOM")
            .addField('Oluşturulma Sıralaması', `\`\`\`${table.table(possibleInvites)}\`\`\``);
        message.channel.send(embed)
    }
});




client.on('message', message => {
  if (message.content.toLowerCase() === prefix + "şans") {
      var sans = ["💎|💳|⌛ - Malesef Kaybettin Be Kanka", "⌛|⌛|💎 - Tüh Be Tekrar Dene", "💳|💎|💳 - Hadi Be Az Kaldı", "💎|💎|💎 - Helal Sana Hepsini Tutturdun", "💎|⌛|⌛ - Az Kaldı Merak Etme", "💳|💳|💳 - Profesyonelsin Dostum", "💎|💳|⌛ - Birdaki Sefere", "⌛|⌛|⌛ - Bu İşte Ustasın Dostum"];
       var sonuc = sans[Math.floor((Math.random() * sans.length))];
    const embed = new Discord.RichEmbed()
    .addField(`***___Şans___***`, `${sonuc}`)
    return message.channel.sendEmbed(embed);
}
});









client.on("message", message => {
  if (message.author.bot) return;
 if (message.content.toLowerCase() === prefix + 'türkkahvesi')
    if (message.author.type !== "group") {
			 message.channel.send('Bağlanılıyor....').then(msg => {
            msg.react("☕").then((msgreaction) => msgreaction.message.edit(kahve))
        });
			message.delete()
      const kahve = new Discord.RichEmbed()
      .setImage("https://goo.gl/36DtWR")
      .setColor(Math.floor(Math.random() * (0xFFFFFF + 1)))
  };
});



    client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + 'ınflames') {
    if (msg.author.id !== ayarlar.sahip) {
        msg.channel.send('Kimliğin doğrulanıyor..')
        .then(nmsg => nmsg.edit('Sen InFlames değilsin.'));
    }else{
    msg.channel.send('InFlames yazılıyor....')
      .then(nmsg => nmsg.edit(':regional_indicator_i:'))
      .then(nmsg => nmsg.edit(':regional_indicator_i: :regional_indicator_n:'))
      .then(nmsg => nmsg.edit(':regional_indicator_i: :regional_indicator_n: :regional_indicator_f:'))
      .then(nmsg => nmsg.edit(':regional_indicator_i: :regional_indicator_n: :regional_indicator_f: :regional_indicator_l:'))
      .then(nmsg => nmsg.edit(':regional_indicator_i: :regional_indicator_n: :regional_indicator_f: :regional_indicator_l: :regional_indicator_a: :regional_indicator_m: :regional_indicator_e:'))
      .then(nmsg => nmsg.edit(':regional_indicator_i: :regional_indicator_n: :regional_indicator_f: :regional_indicator_l: :regional_indicator_a: :regional_indicator_m: :regional_indicator_e:'))
      .then(nmsg => nmsg.edit(':regional_indicator_i: :regional_indicator_n: :regional_indicator_f: :regional_indicator_l: :regional_indicator_a:  :regional_indicator_m: :regional_indicator_e: :regional_indicator_s:'));
  }
  }
});













client.on(`message`, msg => {
  if (msg.content.toLowerCase() === prefix + 'söz') {
    msg.delete();
    var Random = [
      'Herkes kendi kaderinin demircisidir',
      'Belki hiç bir şey yolunda gitmedi ama hiçbir şey de beni yolumdan etmedi!',
      'Gül biraz; bunca keder, bunca gözyaşı dinsin, gül biraz; şu gök kubbe kahkahanı işitsin. Her gidenin ardından koşmaya değmez hayat, gelecekleri bekle, gidecek varsın gitsin.',
      'Aşk davaya benzer, cefa çekmek de şahide. Şahidin yoksa davayı kazanamazsın ki!',
      'İnsan geride bıraktıklarını özler, sahip olduğundan sıkılır, ulaşamadığına tutulur. Genelde ulaşılmaz olan hep aşk olur.',
      'Salatalığın kabuğunu soymak, onun hıyar olduğu gerçeğini değiştirmez.',
      'Bu kadar yürekten çağırma beni. Bir gece ansızın gelebilirim. Beni bekliyorsan, uyumamışsan, sevinçten kapında ölebilirim.',
      'Nankör insan her şeyin fiyatını bilen hiçbir şeyin değerini bilmeyen kimsedir.',
      'Biz birbirimize dönmüş iki ayna gibiyiz. İçimizde binlerce olsa da görüntümüz bir biz sadece birbirimizi görürüz…',
      'Gittiğin yerde boşluk dolduran değil, gittiğin zaman boşluğu doldurulamayan ol.',
      'Eğer aç ve kimsesiz bir köpeği alıp bakar ve rahata kavuşturursanız sizi ısırmaz. İnsan ve köpek arasındaki temel fark budur.',
      'Bir ilişkiyi kadın başlatır, kadın bitirir. Ama başlatan ve bitiren aynı kadın olmayabilir.',
      'Bir tohum verdin çiçeğini al. Bir çekirdek verdin ağacını al. Bir dal verdin ormanını al. Dünyamı verdim sana bende kal.',
      'Yalnızca kültürlü insanlar öğrenmeyi sever cahiller ders vermeyi tercih eder.',
    ];
    var Sözver = Math.floor(Math.random()*Random.length);
    const söz = new Discord.RichEmbed()
    .setDescription(`${Random[Sözver]}`)
    .setColor(Math.floor(Math.random() * (0xFFFFFF + 1)))
    return msg.channel.sendEmbed(söz);
  }
});




client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + 'beşiktaş') {
    msg.delete();
    msg.channel.send({embed: {
        color:  0x000000,
        author: {
        },
        description: 'BEŞİKTAŞ TUTMAYİN',
        footer: {
        }
      }
    });
  }});




client.on('message', msg => {
  if (msg.content.toLowerCase() === 'beşiktaş')
    if (msg.author.type !== "group") {
      const beşiktaş = new Discord.RichEmbed()
      .setImage("https://goo.gl/KRfm45")
      .setColor(0x000000);
      return msg.channel.sendEmbed(beşiktaş);
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'fenerbahçe')
    if (msg.author.type !== "group") {
      const fenerbahçe = new Discord.RichEmbed()
      .setImage("https://goo.gl/uX2Sqa")
      .setColor(0xf2fc36);
      return msg.channel.sendEmbed(fenerbahçe);
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'ayı')
    if (msg.author.type !== "group") {
      const beşiktaş = new Discord.RichEmbed()
      .setImage("http://www.tekbasinadaolur.com/wp-content/uploads/2016/06/Grizzly-Bear-1-1100x580.jpg")
      .setColor(0x000000);
      return msg.channel.sendEmbed(beşiktaş);
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'hamster')
    if (msg.author.type !== "group") {
      const fenerbahçe = new Discord.RichEmbed()
      .setImage("https://i.ytimg.com/vi/_3RomdUiKng/hqdefault.jpg")
      .setColor(0xf2fc36);
      return msg.channel.sendEmbed(fenerbahçe);
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'galatasaray')
    if (msg.author.type !== "group") {
      const galatasaray = new Discord.RichEmbed()
      .setImage("https://goo.gl/7TLZ8H")
      .setColor(0xff3338);
      return msg.channel.sendEmbed(galatasaray);
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === '41kocaeli')
    if (msg.author.type !== "group") {
      const kocaelispor = new Discord.RichEmbed()
      .setImage("https://goo.gl/iXizxf")
      .setColor(0xff3338);
      return msg.channel.sendEmbed(kocaelispor);
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'trabzonspor')
    if (msg.author.type !== "group") {
      const trabzon = new Discord.RichEmbed()
      .setImage("https://goo.gl/q9AFbP")
      .setColor(0xff3338);
      return msg.channel.sendEmbed(trabzon);
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'başakşehir')
    if (msg.author.type !== "group") {
      const başakşehir = new Discord.RichEmbed()
      .setImage("https://goo.gl/3hC3wu")
      .setColor(0xff3338);
      return msg.channel.sendEmbed(başakşehir);
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'bursaspor')
    if (msg.author.type !== "group") {
      const bursaspor = new Discord.RichEmbed()
      .setImage("https://goo.gl/j5GC5E")
      .setColor(0xff3338);
      return msg.channel.sendEmbed(bursaspor);
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'karsspor')
    if (msg.author.type !== "group") {
      const karsspor = new Discord.RichEmbed()
      .setImage("https://cdn.discordapp.com/attachments/415626545538007073/442456119957389322/kars.jpg")
      .setColor(0x000000);
      return msg.channel.sendEmbed(karsspor);
  }
});














client.on("guildMemberAdd", async member => {
  const channel = member.guild.channels.find('name', 'log');//log ismini ayarlıyacaksınız log adında kanal açın
  if (!channel) return;
        let username = member.user.username;
        if (channel === undefined || channel === null) return;
        if (channel.type === "text") {
            const bg = await Jimp.read("https://cdn.discordapp.com/attachments/450693709076365323/473184528148725780/guildAdd.png");
            const userimg = await Jimp.read(member.user.avatarURL);
            var font;
            if (member.user.tag.length < 15) font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
            else if (member.user.tag.length > 15) font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
            else font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
            await bg.print(font, 430, 170, member.user.tag);
            await userimg.resize(362, 362);
            await bg.composite(userimg, 43, 26).write("./img/"+ member.id + ".png");
              setTimeout(function () {
                    channel.send(new Discord.Attachment("./img/" + member.id + ".png"));
              }, 1000);
              setTimeout(function () {
                fs.unlink("./img/" + member.id + ".png");
              }, 10000);
        }
    })

client.on("guildMemberRemove", async member => {
  const channel = member.guild.channels.find('name', 'log');//log ismini ayarlıyacaksınız log adında kanal açın
  if (!channel) return;
        let username = member.user.username;
        if (channel === undefined || channel === null) return;
        if (channel.type === "text") {            
                        const bg = await Jimp.read("https://cdn.discordapp.com/attachments/450693709076365323/473184546477572107/guildRemove.png");
            const userimg = await Jimp.read(member.user.avatarURL);
            var font;
            if (member.user.tag.length < 15) font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
            else if (member.user.tag.length > 15) font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
            else font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
            await bg.print(font, 430, 170, member.user.tag);
            await userimg.resize(362, 362);
            await bg.composite(userimg, 43, 26).write("./img/"+ member.id + ".png");
              setTimeout(function () {
                    channel.send(new Discord.Attachment("./img/" + member.id + ".png"));
              }, 1000);
              setTimeout(function () {
                fs.unlink("./img/" + member.id + ".png");
              }, 10000);
        }
    })












client.on('message', async msg => {
  if (msg.content.toLowerCase() === 'adamsın') {
    await msg.react('🇦');
    await msg.react('🇩');
    await msg.react('🅰');
    await msg.react('🇲');
  }
});
     





client.on('message', message => {
if (message.content === 'z?beniseviyormusun') {
       if (Math.floor((Math.random() * 15) + 1) === 1) {
           message.reply('%90😍');
       }else if (Math.floor((Math.random() * 15) + 1) === 2) {
           message.reply('%0😍');
       }else if (Math.floor((Math.random() * 15) + 1) === 3) {
           message.reply('%20😍');
       }else if (Math.floor((Math.random() * 15) + 1) === 4) {
           message.reply('%50😍 :)');
       }else if (Math.floor((Math.random() * 15) + 1) === 5) {
           message.reply('%70😍');
       }else if (Math.floor((Math.random() * 15) + 1) === 6) {
           message.reply('%80😍');
       }else if (Math.floor((Math.random() * 15) + 1) === 7) {
           message.reply('%95😍');
       }else if (Math.floor((Math.random() * 15) + 1) === 8) {
           message.reply('%81😍');
       }else if (Math.floor((Math.random() * 15) + 1) === 9) {
           message.reply('%50😍');
       }else if (Math.floor((Math.random() * 15) + 1) === 10) {
           message.reply('%35😍');
       }else if (Math.floor((Math.random() * 15) + 1) === 11) {
           message.reply('Kanka Durya Sonra Seversin Yoruldum.');
       }else if (Math.floor((Math.random() * 15) + 1) === 12) {
           message.reply('%100😍');
       }else if (Math.floor((Math.random() * 15) + 1) === 13) {
           message.reply('%1😍');
       }else if (Math.floor((Math.random() * 15) + 1) === 14) {
           message.reply('%99😍');
      }else if (Math.floor((Math.random() * 15) + 1) === 15) {
           message.reply('%3😍');
       }
  }
});




client.on('message', message => {
if (message.content === 's?bilardo') {
       if (Math.floor((Math.random() * 10) + 1) === 1) {
           message.reply('Vurduuu,ve siyah topu deliğe attı.🎱!');
       }else if (Math.floor((Math.random() * 15) + 1) === 2) {
           message.reply('Vurduuu,Ve Tüm Topları Deliğe Soktu🎱 ');
       }else if (Math.floor((Math.random() * 15) + 1) === 3) {
           message.reply('Hadi Son 1 Topun Kaldı Atarsın Bu Topu🎱');
       }else if (Math.floor((Math.random() * 15) + 1) === 4) {
           message.reply('Hadi Son 5 Topun Kaldı Atarsın Bu Topu Sen🎱');
       }else if (Math.floor((Math.random() * 15) + 1) === 5) {
           message.reply('Hadi Son 4 Topun Kaldı Atarsın Bu Topu Sen🎱');
       }else if (Math.floor((Math.random() * 15) + 1) === 6) {
           message.reply('Ehbe Kardeşim Biraz Dikkatli Olsana Beyaz Topu Attın🎱');
       }else if (Math.floor((Math.random() * 15) + 1) === 7) {
           message.reply('Helal Lan Sana Tüm Topları Deliğe Soktun🎱👏');
       }else if (Math.floor((Math.random() * 15) + 1) === 8) {
           message.reply('Ben Pes Ediyorum Oynamaya Korkuyorum🎱');
       }else if (Math.floor((Math.random() * 15) + 1) === 9) {
           message.reply('Ehbe Kardeşim Bkraz Dikkatli Olsana Rakibinin Topunu Attın Deliğe🎱');
       }else if (Math.floor((Math.random() * 15) + 1) === 10) {
           message.reply('Ve Sen Kazandın Bu Maçı Tebrikler👏');
       }
  }
});






































client.on("message", async message => {
if (message.content === 'z?profilim') {
      message.channel.startTyping()
        var user = message.mentions.users.first() || message.author;
        let memberID = await db.fetch(`memberID_${user.id}`);
        if (memberID == null) memberID = 'Biyografi Mesajı Ayarlanmamis.'
        let membername = await db.fetch(`membername_${user.id}`);
        if (membername == null) membername = `${user.tag}`
        let memberBadge = await db.fetch(`memberBadge_${user.id}`);
        if (memberBadge == null) memberBadge = `https://cdn.discordapp.com/attachments/461622592688619520/472923575049781268/profile.png`
        let memberBadge2 = await db.fetch(`memberBadge2_${user.id}`);
        if (memberBadge2 == null) memberBadge2 = `https://cdn.discordapp.com/attachments/461622592688619520/472923575049781268/profile.png`
        let memberBadge3 = await db.fetch(`memberBadge3_${user.id}`);
        if (memberBadge3 == null) memberBadge3 = `https://cdn.discordapp.com/attachments/461622592688619520/472923575049781268/profile.png`
        let memberBadge4 = await db.fetch(`memberBadge4_${user.id}`);
        if (memberBadge4 == null) memberBadge4 = `https://cdn.discordapp.com/attachments/461622592688619520/472923575049781268/profile.png`
        let memberBadge5 = await db.fetch(`memberBadge5_${user.id}`);
        if (memberBadge5 == null) memberBadge5 = `https://cdn.discordapp.com/attachments/461622592688619520/472923575049781268/profile.png`
				const bg = await Jimp.read("https://cdn.discordapp.com/attachments/474288593515315201/479224732647161856/profil.png");
				const userimg = await Jimp.read(user.avatarURL);
				const onay = await Jimp.read(`${memberBadge}`);
				const ekip = await Jimp.read(`${memberBadge2}`);
				const destek = await Jimp.read(`${memberBadge3}`);
				const mod = await Jimp.read(`${memberBadge4}`);
				const partner = await Jimp.read(`${memberBadge5}`);
				var font;
				if (membername.length < 12) font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
				else if (membername.length > 12) font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
				else font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
				var font2;
				if (user.tag.length < 15) font2 = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
				else if (user.tag.length > 15) font2 = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
				else font2 = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
				var font3;
				if (user.tag.length < 34) font3 = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
				else if (user.tag.length > 34) font3 = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
				else font3 = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
				var font4;
				if (user.tag.length < 15) font4 = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
				else if (user.tag.length > 15) font4 = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
				else font4 = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
				await bg.print(font, 270, 70, `${membername}`);
				await bg.print(font3, 40, 380, `Biyografi: ${memberID}`);
				await userimg.resize(200, 200);
				await (!userimg.resize(210, 210));
				await onay.resize(32, 32);
				await ekip.resize(32, 32);
				await destek.resize(32, 32);
				await mod.resize(32, 32);
				await partner.resize(32, 32);
        await bg.composite(onay, 270, 120).write("./img/onay/" + client.user.id + "-" + user.id + ".png");
        await bg.composite(ekip, 310, 120).write("./img/ekip/" + client.user.id + "-" + user.id + ".png");
        await bg.composite(destek, 350, 120).write("./img/destek/" + client.user.id + "-" + user.id + ".png");
        await bg.composite(mod, 390, 120).write("./img/mod/" + client.user.id + "-" + user.id + ".png");
        await bg.composite(partner, 430, 120).write("./img/mod/" + client.user.id + "-" + user.id + ".png");
        await bg.composite(userimg, 40, 40).write("./img/userimg/" + client.user.id + "-" + user.id + ".png");
				  setTimeout(function () {
message.channel.send(`:pencil: **| ${user.username} adlı kullanıcının profil kartı**`)
						message.channel.send(new Discord.Attachment("./img/userimg/" + client.user.id + "-" + user.id + ".png"));
				  }, 1000);
				  setTimeout(function () {
					fs.unlink("./img/userimg/" + client.user.id + "-" + user.id + ".png");
				  }, 10000);
      message.channel.stopTyping()
    }
});

  client.on('message', async message => {
       let command = message.content.split(' ')[0];
  command = command.slice(prefix.length);
  let args = message.content.split(' ').slice(1);
  if (command === "bioayarla" || command === "biyografi") {
        if (args.join(' ').length > 35) return message.channel.send(`${process.env.basarisiz} En fazla 35 karakter girebilirsiniz.`)
        if (!args.join(" ") && args.join(" ").toLowerCase() === `none`)
            return message.channel.send(`Uyarı: Geçerli bir yazı yazmalısın.\nDoğru kullanım: ${prefix}biyografi Ryting bot adamdır.`)
        let newMessage;
        if (args.join(" ").toLowerCase() === `none`) newMessage = '';
        else newMessage = args.join(" ").trim();
        db.set(`memberID_${message.author.id}`, newMessage).then(i => {
            return message.channel.send(` Yeni Biyografin Ayarlandı.`)
        });
  }
  });
         
client.on('message', async message => {
       let command = message.content.split(' ')[0];
  command = command.slice(prefix.length);
  let args = message.content.split(' ').slice(1);
 if (command === "isim" || command === "isimayarla") {
        if (args.join(' ').length > 15) return message.channel.send(`En fazla 15 karakter girebilirsiniz.`)
        if (!args.join(" ") && args.join(" ").toLowerCase() === `none`)
            return message.channel.send(`Uyarı: Geçerli bir yazı yazmalısın.\npcDoğru kullanım: ${prefix}isim Furkan`)
        let newMessage;
        if (args.join(" ").toLowerCase() === `none`) newMessage = '';
        else newMessage = args.join(" ").trim();
        db.set(`membername_${message.author.id}`, newMessage).then(i => {
            return message.channel.send(`Yeni İsmin Başarıyla Yapıldı`)
        })
 }
});



client.login(process.env.TOKEN);



client.on('guildMemberAdd', member => {
  let guild = member.guild;
  let joinRole = guild.roles.find('name', 'Üye'); 
  member.addRole(joinRole); 

  const channel = member.guild.channels.find('name', 'mod-log');
  if (!channel) return;
  const embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setAuthor(member.user.username, member.user.avatarURL)
  .setThumbnail(member.user.avatarURL)
  .setTitle('📥 | Sunucuya katıldı!')
  .setTimestamp()
  channel.sendEmbed(embed); 
});

client.on('guildMemberRemove', member => {
  const channel = member.guild.channels.find('name', 'mod-log');
  if (!channel) return;
  const embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setAuthor(member.user.username, member.user.avatarURL)
  .setThumbnail(member.user.avatarURL)
  .setTitle('📤 | Sunucudan ayrıldı')
  .setTimestamp()
  channel.sendEmbed(embed); 
});

client.on ('message', message => {
if (message.content === prefix + "emojiler") {
  const emojiList = message.guild.emojis.map(e=>e.toString()).join(" **|** ");
  message.channel.send(emojiList);
}
})






    client.on("message", message => {
    const dmchannel = client.channels.find("name", "botlog");
    if (message.channel.type === "dm") {
        if (message.author.id === client.user.id) return;
        dmchannel.sendMessage("", {embed: {
                color: 3447003,
                title: `Yazan: ${message.author.tag}`,
                description: `${message.content}`
              }})
    }
    if (message.channel.bot) return;
});




client.on("message", msg => {
        const kufur = [".com", ".io", ".gg", ".net",];
        if (kufur.some(word => msg.content.includes(word))) {
          try {
             if (!msg.member.hasPermission("BAN_MEMBERS")) {
                  msg.delete();

                  return msg.reply(`Küfür etti, küfürü engellendi.`).then(msg => msg.delete(3000));
             }              
          } catch(err) {
            console.log(err);
          }
        }
    });  



// Müzik Komutu // // API KODU DC DE //

const { GOOGLE_API_KEY } = require('./anahtarlar.json');
const YouTube = require('simple-youtube-api');
const queue = new Map();  
const youtube = new YouTube(GOOGLE_API_KEY);
const ytdl = require('ytdl-core');

client.on('message', async msg => {

	if (msg.author.bot) return undefined;
	if (!msg.content.startsWith(prefix)) return undefined;

	const args = msg.content.split(' ');
	const searchString = args.slice(1).join(' ');
	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	const serverQueue = queue.get(msg.guild.id);
	let command = msg.content.toLowerCase().split(' ')[0];
	command = command.slice(prefix.length)

	if (command === 'çal') {
		const voiceChannel = msg.member.voiceChannel;
		if (!voiceChannel) return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setColor('RANDOM')
    .setDescription(' <:basarisiz:474973245477486612> | İlk olarak sesli bir kanala giriş yapmanız gerek.'));
		const permissions = voiceChannel.permissionsFor(msg.client.user);
		if (!permissions.has('CONNECT')) {
			return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle(' <:basarisiz:474973245477486612> | İlk olarak sesli bir kanala giriş yapmanız gerek.'));
		}
		if (!permissions.has('SPEAK')) {
			 return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setColor('RANDOM')
      .setTitle(' <:basarisiz:474973245477486612> | Şarkı başlatılamıyor. Lütfen mikrofonumu açınız.'));
        }

		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
				await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
			}
			 return msg.channel.sendEmbed(new Discord.RichEmbed)
      .setTitle(`**✅ | Oynatma Listesi: **${playlist.title}** Kuyruğa Eklendi!**`)
		} else {
			try {
				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
					var videos = await youtube.searchVideos(searchString, 10);
					let index = 0;
          
				 msg.channel.sendEmbed(new Discord.RichEmbed()                  
         .setTitle('Thaypon Müzik | Şarkı Seçimi')
         .setDescription(`${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}`)
         .setFooter('Lütfen 1-10 arasında bir rakam seçiniz 10 saniye içinde liste iptal edilecektir.')
         .setColor('0x36393E'));
          msg.delete(5000)
					try {
						var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
							maxMatches: 1,
							time: 10000,
							errors: ['time']
						});
					} catch (err) {
						console.error(err);
						 return msg.channel.sendEmbed(new Discord.RichEmbed()
            .setColor('0x36393E')
            .setDescription('<:basarisiz:474973245477486612> | **Şarkı Değeri Belirtmediğiniz İçin Seçim İptal Edilmiştir**.'));
                    }
					const videoIndex = parseInt(response.first().content);
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
				} catch (err) {
					console.error(err);
					return msg.channel.sendEmbed(new Discord.RichEmbed()
          .setColor('0x36393E')
          .setDescription('<:basarisiz:474973245477486612> | **Aradaım Fakat Hiç Bir Sonuç Çıkmadı**'));
                }
            }
			return handleVideo(video, msg, voiceChannel);
      
		}
	} else if (command === 'geç') {
		if (!msg.member.voiceChannel) if (!msg.member.voiceChannel) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription(' <:basarisiz:474973245477486612> | **Lütfen öncelikle sesli bir kanala katılınız**.'));
		if (!serverQueue) return msg.channel.sendEmbed(new Discord.RichEmbed()
     .setColor('RANDOM')
     .setTitle('<:basarisiz:474973245477486612> | **Hiç Bir Müzik Çalmamakta**'));                                              
		serverQueue.connection.dispatcher.end('**Müziği Geçtim!**');
		return undefined;
	} else if (command === 'durdur') {
		if (!msg.member.voiceChannel) if (!msg.member.voiceChannel) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription('**<:basarisiz:474973245477486612> | Lütfen öncelikle sesli bir kanala katılınız.**'));
		if (!serverQueue) return msg.channel.sendEmbed(new Discord.RichEmbed()
     .setColor('RANDOM')
     .setTitle('<:basarisiz:474973245477486612> **| Hiç Bir Müzik Çalmamakta**'));                                              
		msg.channel.send(`:stop_button: **${serverQueue.songs[0].title}** Adlı Müzik Durduruldu`);
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('**Müzik Bitti**');
		return undefined;
	} else if (command === 'ses') {
		if (!msg.member.voiceChannel) if (!msg.member.voiceChannel) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription('<:basarisiz:474973245477486612> **| Lütfen öncelikle sesli bir kanala katılınız.**'));
		if (!serverQueue) return msg.channel.sendEmbed(new Discord.RichEmbed()
     .setColor('RANDOM')
     .setTitle('<:basarisiz:474973245477486612> | **Hiç Bir Müzik Çalmamakta**'));                                              
		if (!args[1]) return msg.channel.sendEmbed(new Discord.RichEmbed()
   .setTitle(`:loud_sound: Şuanki Ses Seviyesi: **${serverQueue.volume}**`)
    .setColor('RANDOM'))
		serverQueue.volume = args[1];
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
		return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setTitle(`:loud_sound: Ses Seviyesi Ayarlanıyor: **${args[1]}**`)
    .setColor('RANDOM'));                             
	} else if (command === 'çalan') {
		if (!serverQueue) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setTitle("<:basarisiz:474973245477486612> | **Çalan Müzik Bulunmamakta**")
    .setColor('RANDOM'));
		return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle("Thaypon Müzik | Çalan")                            
    .addField('Başlık', `[${serverQueue.songs[0].title}](${serverQueue.songs[0].url})`, true)
    .addField("Süre", `${serverQueue.songs[0].durationm}:${serverQueue.songs[0].durations}`, true))
	} else if (command === 'sıra') {
    let index = 0;
		if (!serverQueue) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setTitle("<:basarisiz:474973245477486612> | **Sırada Müzik Bulunmamakta**")
    .setColor('RANDOM'));
		  return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
     .setTitle('Zula Müzik | Şarkı Kuyruğu')
    .setDescription(`${serverQueue.songs.map(song => `**${++index} -** ${song.title}`).join('\n')}`))
    .addField('Şu anda çalınan: ' + `${serverQueue.songs[0].title}`);
	} else if (command === 'duraklat') {
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setTitle("**:pause_button: Müzik Senin İçin Durduruldu!**")
      .setColor('RANDOM'));
		}
		return msg.channel.send('<:basarisiz:474973245477486612> | **Çalan Müzik Bulunmamakta**');
	} else if (command === 'devam') {
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setTitle("**:arrow_forward: Müzik Senin İçin Devam Etmekte!**")
      .setColor('RANDOM'));
		}
		return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setTitle("**<:basarisiz:474973245477486612> | Çalan Müzik Bulunmamakta.**")
    .setColor('RANDOM'));
	}
  

	return undefined;
});

async function handleVideo(video, msg, voiceChannel, playlist = false) {
    const serverQueue = queue.get(msg.guild.id);
    console.log(video);
    const song = {
        id: video.id,
        title: video.title,
        url: `https://www.youtube.com/watch?v=${video.id}`,
    durationh: video.duration.hours,
    durationm: video.duration.minutes,
        durations: video.duration.seconds,
    views: video.views,
    };
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: msg.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};
		queue.set(msg.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(msg.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`<:basarisiz:474973245477486612> **Şarkı Sisteminde Problem Var Hata Nedeni: ${error}**`);
			queue.delete(msg.guild.id);
			return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setTitle(`<:basarisiz:474973245477486612> **Şarkı Sisteminde Problem Var Hata Nedeni: ${error}**`)
      .setColor('RANDOM'))
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (playlist) return undefined;
		return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setTitle(`<:onayland:474982945304608769> **${song.title}** Adlı Müzik Kuyruğa Eklendi!`)
    .setColor('RANDOM'))
	}
	return undefined;
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === '<:basarisiz:474973245477486612> | **Yayın Akış Hızı Yeterli Değil.**') console.log('Müzik Bitti.');
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

	 serverQueue.textChannel.sendEmbed(new Discord.RichEmbed()                                   
  .setTitle("**Zula Müzik | 🎙 Müzik Başladı**",`https://cdn.discordapp.com/avatars/473974675194511361/6bb90de9efe9fb80081b185266bb94a6.png?size=2048`)
  .setThumbnail(`https://i.ytimg.com/vi/${song.id}/default.jpg?width=80&height=60`)
  .addField('\nBaşlık', `[${song.title}](${song.url})`, true)
  .addField("\nSes Seviyesi", `${serverQueue.volume}%`, true)
  .addField("Süre", `${song.durationm}:${song.durations}`, true)
  .setColor('RANDOM'));
}
client.login(ayarlar.token);