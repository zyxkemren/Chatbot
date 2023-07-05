const { NlpManager } = require("node-nlp");
const { removeStopwords } = require("stopword");
const readline = require("readline");
const { intents } = require("./intents"); // Import file intents.js
const data = require("./response.js");
const cleanText = require('./function')


const manager = new NlpManager({ languages: ["id", "en"] });

intents.forEach((intent) => {
  intent.documents.forEach((document) => {
    manager.addDocument(intent.language, document, intent.name);
  });
});


(async () => {
  await manager.train();
  manager.save();
})();


// Random response
function getReply(intent, usr) {
  const sapaRule = data.rules.find((rule) => rule.pattern === intent);
  if (sapaRule) {
    var randomIndex = Math.floor(Math.random() * sapaRule.responses.length);
    console.log("Intents:" + intent);

    const rgreetings = data.greets[Math.floor(Math.random() * data.greets.length)];
    const ryes = data.yes[Math.floor(Math.random() * data.yes.length)];
    const rno = data.no[Math.floor(Math.random() * data.no.length)];
    const rhelp = data.help[Math.floor(Math.random() * data.help.length)];
    const rhelp2 = data.help2[Math.floor(Math.random() * data.help2.length)];
    if (usr === "zyxkemren") {
      var username = "ZYX";
    } else { username = usr; }

    randomIndex = sapaRule.responses[randomIndex].text;
    randomIndex = randomIndex.replace("{greets}", rgreetings);
    randomIndex = randomIndex.replace("{yes}", ryes);
    randomIndex = randomIndex.replace("{no}", rno);
    randomIndex = randomIndex.replace("{help}", rhelp);
    randomIndex = randomIndex.replace("{help2}", rhelp2);
    randomIndex = randomIndex.replace("{username}", username);
    return randomIndex;
  }
}

// Fungsi untuk menangani input pengguna
async function handleInput(input, usr) {
  const cleanedInput = cleanText(input);
  const respon = await manager.process("id", cleanedInput);
  const intent = respon.intent;
  const enRespon = await manager.process("en", cleanedInput);
  const enIntent = enRespon.intent;

  const intentsToHandle = intents.map((intent) => intent.name);
  if (intentsToHandle.includes(intent)) {
    const reply = getReply(intent, usr);
    return reply;
  } else if (intentsToHandle.includes(enIntent)) {
    const reply = getReply(enIntent, usr);
    return reply;
  } else if (input.toLowerCase() === "quit") {
    return "Terima kasih! Sampai jumpa lagi.";
  } else {
    const reply = getReply("default", usr);
    return reply;
  }
}

module.exports = handleInput;

