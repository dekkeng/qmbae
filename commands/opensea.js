const { SlashCommandBuilder } = require('discord.js');
const sdk = require('api')('@opensea/v2.0#'+process.env.OPENSEA_API_KEY);

function round(value, decimals) {
  return Number([value.toString().slice(0, decimals*-1), ".", value.toString().slice(decimals*-1)].join('')).toFixed(4);
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('os')
    .setDescription('Opensea price bot')
    .addStringOption(option =>
      option.setName('slug')
        .setDescription('Collection slug from Opensea')
        .setRequired(true)
    ),

  async execute(interaction) {
    const slug = interaction.options.getString('slug');

    sdk.auth(process.env.OPENSEA_API_KEY);
    sdk.server('https://api.opensea.io');

    await sdk.get_best_listings_on_collection_v2({ limit: '1', collection_slug: slug })
      .then(({ data }) => {
        const currentPrice = data.listings[0].price.current;
        const currency = currentPrice.currency;
        const price = round(currentPrice.value, currentPrice.decimals);
        const collectionUrl = `https://opensea.io/collection/${slug}`;

        interaction.reply(`Collection: ${slug}\nFloor Price: ${price} ${currency}\nLink: ${collectionUrl}`);
      })
      .catch(err => {
        interaction.reply('An error occurred while fetching collection information.');
        console.error(err);
      });
  },
};
