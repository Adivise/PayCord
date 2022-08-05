const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");

class MainClient extends Client {
    constructor() {
       super({
           intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildPresences,
           ],
        });

/// Handlers
this.config = require("./config.js");
if (!this.token) this.token = this.config.TOKEN;

process.on('unhandledRejection', error => console.log(error));
process.on('uncaughtException', error => console.log(error));

const client = this;

client.on("ready", () => {
    console.log(`PayCord | Logged in as ${client.user.tag}!`);
    client.user.setPresence({ 
        activities: [
            { 
                name: `PayCord | Reading.. Status`, 
                type: 2 
            }
        ], 
        status: 'online', 
    });
});

client.on("presenceUpdate", async (oldMember, newMember) => {
    const guild = oldMember.guild;

    if (!oldMember || !newMember) return;
    if(oldMember.status !== newMember.status) return

    const roleId = client.config.ROLE_ID;
    const message = client.config.CUSTOM_STATUS;
    const chanelLog = client.config.CHANNEL_LOG;

    const role = guild.roles.cache.get(roleId)
    if (!role || role.deleted) return;

    const status = newMember.activities.map(a => a.state);

    const member = guild.members.cache.get(newMember.user.id);
    if (!member) return;

    if (status[0] && status[0].includes(message)) {
            await member.roles.add(roleId, 'PayCord | Giveing role');

            const embed = new EmbedBuilder()
                .setTitle(`Status Added`)
                .setColor(`#0000001`)
                .setDescription(`\`${member.user.tag}\` added the status and got the role \`${role.name}\``)
                .setTimestamp();

            return client.channels.cache.get(chanelLog).send({ embeds: [embed] });
    } else {
        if (member.roles.cache.some((r) => r.id === roleId)) {
            await member.roles.remove(roleId, 'PayCord | Removing role');

            const embed = new EmbedBuilder()
                .setTitle(`Status Removed`)
                .setColor(`#0000001`)
                .setDescription(`\`${role.name}\` revoked from \`${member.user.tag}\``)
                .setTimestamp();

            return client.channels.cache.get(chanelLog).send({ embeds: [embed] });
        }
    }
});  

   }
       connect() {
       return super.login(this.token);
   };
};

module.exports = MainClient;