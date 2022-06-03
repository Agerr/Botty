const fetchMember = require(`../modules/fetchMember`),
      config = require(`../config.json`);

module.exports.run = async (bot, message, args) => {
    let success = true;

    if(!args[1]) return message.channel.send({ content: `No user inputted!! Bad!! :c` });

    if(args[2] && args[2].length > 100) return message.channel.send({ content: `Reason can't be longer than 100 characters!! Soweee ${config.emojis.pandaScared}` });

    await message.guild.members.unban(args[1]).catch((error) => {
        message.channel.send({ content: `Can't unban this person :c\n\`\`${error.message}\`\`` });
        success = false;
    })

    if(success === false) return;

    message.channel.send({ content: `Successfully unbanned ${(await bot.users.fetch(args[1])).tag}!! ${config.emojis.pandaYay}` });
}

module.exports.info = {
    "name": "unban",
    "description": "Un-bans someone 👀",
    "usage": "unban [id]",
    "aliases": [],
    "category": "moderation",
    "botPerms": [`VIEW_CHANNEL`, `SEND_MESSAGES`,`SEND_MESSAGES_IN_THREADS`, `USE_EXTERNAL_EMOJIS`, `BAN_MEMBERS`],
    "userPerms": [`BAN_MEMBERS`],
    "perm": "guild"
}