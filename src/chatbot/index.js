const { NlpManager } = require("node-nlp");
const { removeStopwords } = require("stopword");
const readline = require("readline");
const { intents } = require("./intents"); // Import file intents.js
const data = require("./response");
const cleanText = require("./function");

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

// Membuat readline interface untuk membaca input dari terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Random response
function getReply(intent, usr) {
  const sapaRule = data.rules.find((rule) => rule.pattern === intent);
  if (sapaRule) {
    const { responses } = sapaRule;
    const randomIndex = Math.floor(Math.random() * responses.length);
    console.log("Intents:" + intent);

    const { greets, yes, no, help, help2, server, desc, welcum } = data;
    const username = "ZYX";

    var randomResponse = responses[randomIndex].text;
    randomResponse = randomResponse
      .replace("{greets}", getRandomItem(greets))
      .replace("{yes}", getRandomItem(yes))
      .replace("{no}", getRandomItem(no))
      .replace("{help}", getRandomItem(help))
      .replace("{help2}", getRandomItem(help2))
      .replace("{welcum}", getRandomItem(welcum))
      .replace("{desc}", getRandomItem(desc))
      .replace("{server}", getRandomItem(server));

    return randomResponse.replace("{username}", username);
  }
}

// Fungsi untuk mendapatkan elemen acak dari sebuah array
function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Fungsi untuk menangani input pengguna
async function handleInput(input, usr) {
  const cleanedInput = cleanText(input);
  const respon = await manager.process("id", cleanedInput);
  const intent = respon.intent;
  const enRespon = await manager.process("en", cleanedInput);
  const enIntent = enRespon.intent;
  console.log("Questions:" + cleanedInput);

  const intentsToHandle = intents.map((intent) => intent.name);
  if (intentsToHandle.includes(intent)) {
    const reply = getReply(intent, usr);
    return reply;
  } else if (intentsToHandle.includes(enIntent)) {
    const reply = getReply(enIntent, usr);
    return reply;
  } else if (input.toLowerCase() === "quit") {
    rl.close();
    return "Terima kasih! Sampai jumpa lagi.";
  } else {
    const reply = getReply("default");
    return reply;
  }
}

// Membaca input dari terminal dan menangani input pengguna
function chat() {
  rl.question("Anda: ", async (input) => {
    const output = await handleInput(input, "ZYX");
    console.log("Chatbot: ", output);
    chat();
  });
}

rl.on("close", () => {
  console.log("Chatbot: Terima kasih! Sampai jumpa lagi.");
  process.exit(0);
});

chat();
