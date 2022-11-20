const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client, MessageEmbed } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
const chalk = require('chalk')

const fs = require('fs')

module.exports = {
    data: new SlashCommandBuilder()
	.setName('botstats')
	.setDescription('Gives information about the bot.'),

    async execute(interaction) {
    console.log(chalk.blue(`${interaction.user.tag} used the command: /botstats`))
        fs.readFile("info.json", (err, jsonString) => {
            if (err) {
              console.log("Error reading file from disk:", err);
              return;
            }

            try {
              const info = JSON.parse(jsonString);
              const pingnumb = interaction.client.ws.ping;
              const ping = pingnumb.toString()
              const started = info.dateStarted + ", " + info.timeStarted
              const statsembed = new MessageEmbed()
              .setTitle("Bot Statistics")
              .setDescription(`
Hey! I'm ${info.botProfile}, a bot designed for the nerds! 
I was written in NodeJS by 49Hz#0140 (364902391717298181) using the [DJS](https://discord.js.org/#/) library.          

**Acknowledgements**
Thank you to **amplex#6131** for helping create a few of the commands, and being a massive help in the debugging phase.
Thank you to [Kyroskoh](https://www.twitch.tv/kyroskoh) for helping with the /rank command.

**Stats**`)
              .addFields(
                  { name: 'Last restart', value: started, inline: true},
                  { name: 'Bot Version', value: info.botver, inline: true},
                  { name: 'Number of servers', value: info.serverNumb.toString(), inline: true},
                  { name: 'Avg Ping', value: ping, inline: true}
              )
              .setFooter({ text: "Generated by " + interaction.user.username + "#" + interaction.user.discriminator})
              .setColor('DARK_BUT_NOT_BLACK')
              .setTimestamp();
     
              interaction.reply({ embeds: [statsembed] });
              } catch (err) {
              console.log("Error parsing JSON string:", err);
            }
          });
    },
}