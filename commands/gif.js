const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("gif")
    .setDescription('Show gif')
    .addStringOption(option =>
      option.setName('key')
        .setDescription('Gif key')
        .setRequired(true)
        .addChoices(
          { name: "REKT", value: "https://i.imgur.com/dpvArYK.png" }
        )
    ),
  async execute(interaction) {
    const key = interaction.options.getString('key');
    if (key) {
      //let image = new AttachmentBuilder(key, { name: "qmbaeimage.png" });
      await interaction.reply({ files: [key] });
    }
  },
};
