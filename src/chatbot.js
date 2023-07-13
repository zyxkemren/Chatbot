const Discord = require("discord.js");
const mongoose = require("mongoose");
const { NlpManager } = require("node-nlp");
const fetch = require("node-fetch");
const handleInput = require('./chatbot/index')

// Connect to database

const Schema = new mongoose.Schema({
  Guild: String,
  Channel: String,
});

const chatBotSchema = mongoose.model("chatbot", Schema);

console.log("DATABASE CONNECTED");

// Discord client
const client = new Discord.Client({
  allowedMentions: {
    parse: ["users", "roles"],
    repliedUser: true,
  },
  autoReconnect: true,
  disabledEvents: ["TYPING_START"],
  partials: [
    Discord.Partials.Channel,
    Discord.Partials.GuildMember,
    Discord.Partials.Message,
    Discord.Partials.Reaction,
    Discord.Partials.User,
    Discord.Partials.GuildScheduledEvent,
  ],
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMembers,
    Discord.GatewayIntentBits.GuildBans,
    Discord.GatewayIntentBits.GuildEmojisAndStickers,
    Discord.GatewayIntentBits.GuildIntegrations,
    Discord.GatewayIntentBits.GuildWebhooks,
    Discord.GatewayIntentBits.GuildInvites,
    Discord.GatewayIntentBits.GuildVoiceStates,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.GuildMessageReactions,
    Discord.GatewayIntentBits.GuildMessageTyping,
    Discord.GatewayIntentBits.DirectMessages,
    Discord.GatewayIntentBits.DirectMessageReactions,
    Discord.GatewayIntentBits.DirectMessageTyping,
    Discord.GatewayIntentBits.GuildScheduledEvents,
    Discord.GatewayIntentBits.MessageContent,
  ],
  restTimeOffset: 0,
});

let isProcessing = false;
let chatProcessing = false;
const acc3 =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkVqYmxXUlVCWERJX0dDOTJCa2N1YyJ9.eyJpc3MiOiJodHRwczovL2NoYXJhY3Rlci1haS51cy5hdXRoMC5jb20vIiwic3ViIjoib2F1dGgyfGRpc2NvcmR8NzcyNjQ2NjkzMDM2MDk3NTM2IiwiYXVkIjpbImh0dHBzOi8vYXV0aDAuY2hhcmFjdGVyLmFpLyIsImh0dHBzOi8vY2hhcmFjdGVyLWFpLnVzLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE2ODYzODYxMDEsImV4cCI6MTY4ODk3ODEwMSwiYXpwIjoiZHlEM2dFMjgxTXFnSVNHN0Z1SVhZaEwyV0VrbnFaenYiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIn0.e2c1AP94jw1XWyGfrxcvcHkc1SFbUPYZ5nhJuCxDuD2RPvoyahZXJnAyBQ6kAddAR5Bn0hedVo_Q8WNABT6XMXRiqgR85Ijspajx9YlDCYOH3mA7s_h2HU6hGJu26EC913E0VK_nbtiLkb26XYtdP9CeES1HGTUF9txe_A__31DleIGER9xxoTdOk8UrUeaNxqrrmuUDt6ZzbXP2GjDvMQVy7i8R2t_bDqxIxMee7S0AfKYHnRkl0ZcNnlhTBwzh_iVg8dIIFN8_wMVo68DNLWH3_FUgTL9aDlXk84bKqZb2NbTTCSnCYXOW-nN1AUd1yp0op6am8OO2gUqJPlCikw";

// Chatbot code
client.on("messageCreate", (message) => {
  chatBotSchema.findOne({ Guild: message.guild.id }, async (err, data) => {
    if (!data) return;
    if (message.author.bot) return;
    if (message.channel.id === data.Channel && !isProcessing) {
      isProcessing = true; // Mengatur status pemrosesan menjadi true

      const CharacterAI = require("node_characterai");
      const characterAI = new CharacterAI();

      (async () => {
        message.channel.sendTyping();
        await characterAI.authenticateWithToken(acc3);

        const characterId = "Ftn3JFvB8U8alNoJALoQvdmq4UCr6UD_vKTMd-VNKvo";
        const x = ": ";

        message.channel.sendTyping();
        const chat = await characterAI.createOrContinueChat(characterId);
        message.channel.sendTyping();
        const response = await chat.sendAndAwaitResponse(
          message.author.username + x + message.content,
          true
        );
        message.channel.sendTyping();

        message.reply({ content: response.text });
        console.log(message.author.username + x + message.content);
        console.log(response);

        isProcessing = false; // Mengatur status pemrosesan menjadi false setelah selesai
      })();
    } else if (message.channel.id === data.Channel && isProcessing) {
      // Jika pengguna mengirim pesan di saluran chatbot saat pemrosesan sedang berlangsung
      message.reply("Tunggu proses selesai...").then((reply) => {
        setTimeout(() => {
          message.delete().catch(console.error);
          reply.delete().catch(console.error);
        }, 1000); // Menghapus pesan setelah 3 detik
      });
    }
  });
});


client.on("messageCreate", (message) => {
  if (message.author.id === client.user.id) return;
  if (message.channel.id === "1100191709339582484") {
    message.channel.sendTyping();
    handleInput(message.content, message.member.nickname || message.author.username)
      .then((chat) => {
        message.channel.sendTyping();
        console.log("Discord Chat: " + chat);
        message.reply(chat);
      })
      .catch((error) => {
        console.error(error);
        // Handle error jika terjadi kesalahan dalam handleInput
      });
  }
});

// Client login
client.login(
  ""
);
console.log("CHATBOT STARTED");
