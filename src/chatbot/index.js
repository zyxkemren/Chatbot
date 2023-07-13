const { NlpManager } = require("node-nlp");
const readline = require("readline");
const { intents } = require("./intents");
const data = require("./response");
const f = require("./function");
const mongoose = require("mongoose");

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

// Database
mongoose.connect(
  "mongodb+srv://ai:ai@cluster0.wvqheix.mongodb.net/?retryWrites=true&w=majority"
);

const Schema = new mongoose.Schema({
  LastID: { type: Number, default: 0 },
  LastUser: String,
});

const db = mongoose.model("db", Schema);

// Random response
function getReply(intent, usr, input) {
  let sapaRule = data.rules.find((rule) => rule.pattern === intent);
  if (sapaRule) {
    const { responses } = sapaRule;
    const randomIndex = Math.floor(Math.random() * responses.length);
    console.log("Intents:" + intent);

    const { greets, yes, no, help, help2, server, desc, welcum, salah } = data;
    const username = usr;

    let randomResponse = responses[randomIndex].text;

    if (intent === 'question') {
      return f.search(input)
      .then((res) => {
        return res;
      })
    }
    if (intent === "mtk") {
      const hasil = f.mtk(input);
      randomResponse = randomResponse
        .replace("{hasil}", hasil[0])
        .replace("{question}", hasil[1]);
    }
    randomResponse = randomResponse
      .replace("{greets}", getRandomItem(greets))
      .replace("{yes}", getRandomItem(yes))
      .replace("{no}", getRandomItem(no))
      .replace("{help}", getRandomItem(help))
      .replace("{help2}", getRandomItem(help2))
      .replace("{welcum}", getRandomItem(welcum))
      .replace("{desc}", getRandomItem(desc))
      .replace("{server}", getRandomItem(server))
      .replace("{salah}", getRandomItem(salah));

    return randomResponse.replace("{username}", username);
  }
}

// Fungsi untuk mendapatkan elemen acak dari sebuah array
function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// function buat inputnya coyy
async function handleInput(input, usr) {
  const cleanedInput = f.cleanText(input);
  const respon = await manager.process("id", cleanedInput);
  const intent = respon.intent;
  const enRespon = await manager.process("en", cleanedInput);
  const enIntent = enRespon.intent;
  console.log("Questions:" + cleanedInput);

  const intentsToHandle = intents.map((intent) => intent.name);
  if (intentsToHandle.includes(intent)) {
    const reply = getReply(intent, usr, cleanedInput);
    return reply;
  } else if (intentsToHandle.includes(enIntent)) {
    const reply = getReply(enIntent, usr, cleanedInput);
    return reply;
  } else if (input.toLowerCase() === "quit") {
    rl.close();
    return "Terima kasih! Sampai jumpa lagi.";
  } else {
    const reply = getReply("question", usr, cleanedInput);
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

module.exports = handleInput;
