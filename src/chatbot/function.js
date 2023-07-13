const Typo = require("typo-js");
const dictionary = new Typo("id_ID");
const gptapi = "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";
const serpapi =
  "b41467e40323c1c9adcc4f980eb5e9cdc78e2e374113d072f04a6f6f51b3d0f8";
const fetch = require("node-fetch");
const SerpApi = require("google-search-results-nodejs");
const google = new SerpApi.GoogleSearch();

// Fungsi untuk membersihkan teks dari stopwords dan karakter khusus, serta memperbaiki teks typo
function cleanText(text) {
  let cleanedText = text
    .toLowerCase()
    .replace(/([^0-9\s])([0-9])/g, "$1 $2")
    .replace(/([0-9])([^0-9\s])/g, "$1 $2");

  const cleanedTokens = cleanedText.split(" ");

  const correctedTokens = cleanedTokens.map((token) => {
    if (/^[a-zA-Z]+$/.test(token)) {
      // Mengganti kalimat dengan saran dari dictionary.suggest
      const suggestions = dictionary.suggest(token);
      if (suggestions.length > 0) {
        return suggestions[0];
      }
    }
    return token; // Menjaga simbol dan angka tetap tidak berubah
  });

  return correctedTokens.join(" ");
}

// Mendeteksi prompt maths
function mtk(input) {
  const operations = {
    tambah: "+",
    kurang: "-",
    kali: "*",
    x: "*",
    bagi: "/",
    satu: "1",
    dua: "2",
    tiga: "3",
    empat: "4",
    lima: "5",
    enam: "6",
    tujuh: "7",
    delapan: "8",
    sembilan: "9",
    sepuluh: "10",
    sebelas: "11",
    nol: "0",
    puluh: "0",
    koma: ".",
    ratus: "00",
    ribu: "000",
    juta: "000000",
    milyar: "000000000",
  };

  let question = input;
  console.log(question);
  question = question
    .split(" ")
    .map((word) => {
      if (operations.hasOwnProperty(word)) {
        return operations[word];
      }
      return word;
    })
    .join(" ")
    .replace(",", ".");

  question = question.replace(/[^\d+-/*!]/g, "");
  console.log(question);
  try {
    let result = eval(question);
    return [result, question];
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function search(query) {
  try {
    const data = await new Promise((resolve) => {
      google.json(
        {
          api_key: serpapi,
          q: query,
          gl: "id",
          hl: "id",
          num: "1",
          location: "Indonesia",
        },
        (data) => {
          if (data.knowledge_graph && data.knowledge_graph.description) {
            resolve(data.knowledge_graph.description);
          } else {
            resolve(chatGPT("Pertanyaan: "+query + ". Jawab dengan bahasa Indonesia."));
          }
        }
      );
    });

    return data;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

async function chatGPT(prompt) {
  const data = await new Promise((resolve) => {
  fetch(`https://api.openai.com/v1/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + gptapi,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    }),
  })
    .catch(() => {})
    .then((res) => {
      res.json().then((data) => {
        if (data.error) return console.error(data.error);
        resolve(data.choices[0].message.content);
      });
    });
  });
  return data;
}


module.exports = {
  cleanText: cleanText,
  mtk: mtk,
  search: search,
};
