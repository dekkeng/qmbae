const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("c")
    .setDescription('Get cryptourrency price')
    .addStringOption(option =>
      option.setName('symbol')
        .setDescription('eg. ETH, BTC')
        .setRequired(true)
    )
  ,
  async execute(interaction) {
    const from = interaction.options.getString('symbol') ?? 'BTC';
    const to = 'USD';
    
    await interaction.reply(`...Getting...${from}..data...`);
      res = ""
      try {            
          const data = await axios({
              method: 'post',
              url: 'https://min-api.cryptocompare.com/data/price?fsym='+from+'&tsyms='+to+'&api_key='+process.env.CRYPTOCOMPARE_API_KEY,
          });
          
          res = data.data
      } catch (error) {
          res = "หาไม่เจอ.. ขออภัย "+error
      }

      await interaction.editReply(from+' : '+ res.USD);
  },
};