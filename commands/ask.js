const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const axios = require('axios');

require('dotenv').config()
    
module.exports = {
  data: new SlashCommandBuilder()
    .setName("ask")
    .setDescription('Ask me with any prompt')
    .addStringOption(option =>
      option.setName('prompt')
        .setDescription('Your prompt')
        .setRequired(true)
    ),
  async execute(interaction) {
    const prompt = interaction.options.getString('prompt');
    if (prompt) {
		await interaction.reply('You: '+prompt+'\nQMBAE:\n...คิดแปบน๊า...');
        res = ""
        try {            
            const data = await axios({
                method: 'post',
                url: 'https://generativelanguage.googleapis.com/v1beta/models/'+"gemini-pro"+':generateContent?key='+process.env.GEMINI_API_KEY,
                headers: {
                    'Content-Type': 'application/json'
                }, 
                data: {
                    "contents": [
                        {
                            "parts": [
                                {
                                    "text": prompt
                                }
                            ]
                        }
                    ]
                }
            });
            
            res = data.data.candidates[0].content.parts[0].text
        } catch (error) {
            res = "คิดไม่ออก"
        }

        await interaction.editReply('You: '+prompt+'\nQMBAE:\n'+res);
    }
  },
};
