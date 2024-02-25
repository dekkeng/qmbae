const moment = require('moment');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("tz")
    .setDescription('Convert timezone to your locale tz')
    .addStringOption(option =>
      option.setName('time')
        .setDescription('eg. 10:00 AM')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('timezone')
        .setDescription('eg. EST, PST')
        .setRequired(true)
        .addChoices(
          { name: "UTC/GMT", value: "0" },
          { name: "ECT (+1)", value: "1" },
          { name: "ART (+2)", value: "2" },
          { name: "AST (+3)", value: "3" },
          { name: "AMT (+4)", value: "4" },
          { name: "PLT (+5)", value: "5" },
          { name: "BST (+6)", value: "6" },
          { name: "THAI (+7)", value: "7" },
          { name: "CTT (+8)", value: "8" },
          { name: "JST (+9)", value: "9" },
          { name: "AET (+10)", value: "10" },
          { name: "SST (+11)", value: "11" },
          { name: "NST (+12)", value: "12" },
          { name: "MIT (-11)", value: "-11" },
          { name: "HST (-10)", value: "-10" },
          { name: "AST (-9)", value: "-9" },
          { name: "PST (-8)", value: "-8" },
          { name: "PDT (-7)", value: "-7" },
          { name: "CST (-6)", value: "-6" },
          { name: "EST (-5)", value: "-5" },
          { name: "EDT (-4)", value: "-4" },
          { name: "ART (-3)", value: "-3" }
        )
    )
    .addStringOption(option =>
      option.setName('date')
        .setDescription('eg. 2023-03-15')
    )
  ,
  async execute(interaction) {
    const time = interaction.options.getString('time') ?? moment().format("HH:mm A");
    const timezone = interaction.options.getString('timezone') ?? '0';
    const date = interaction.options.getString('date') ?? moment().format("YYYY-MM-DD");
    out = moment.utc(date + ' ' + time, 'YYYY-MM-DD HH:mm');
    let ext_gmt = "+";
    if (timezone > 0) { ext_gmt = "+"; out.subtract(timezone, 'hours'); }
    else { ext_gmt = ""; out.add(Math.abs(timezone), 'hours'); }

    await interaction.reply(`${date} ${time} GMT${ext_gmt}${timezone} is <t:${out.unix()}> or <t:${out.unix()}:R> in your timezone`);
  },
};