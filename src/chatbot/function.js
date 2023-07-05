const Typo = require("typo-js");
const dictionary = new Typo("id_ID");
const data = require("./response");

// Mendeteksi prompt maths
function Math(input) {
  var question = input;
  question = question
    .replace("tambah", "+")
    .replace("kurang", "-")
    .replace("kali", "*")
    .replace("bagi", "/")
    .replace("satu", "1")
    .replace("dua", "2")
    .replace("tiga", "3")
    .replace("empat", "4")
    .replace("lima", "5")
    .replace("enam", "6")
    .replace("tujuh", "7")
    .replace("delapan", "8")
    .replace("sembilan", "9")
    .replace("nol", "0")
    .replace("puluh", "0")
    .replace("koma", ".")
    .replace("ratus", "00")
    .replace("ribu", "000")
    .replace("juta", "000000")
    .replace("milyar", "000000000")
    .replace(",", ".");

  question = question.replace(/[^\d+-/*.!]/g, "");
  console.log(question);
  try {
    question = eval(question);
  } catch (error) {
    return; //
  }
  return question;
}

// Fungsi untuk membersihkan teks dari stopwords dan karakter khusus, serta memperbaiki teks typo
function cleanText(text) {
  var cleanedText = text.toLowerCase().replace(/[^\w\s]/gi, "");
 
  const cleanedTokens = cleanedText.split(" ");

  const correctedTokens = cleanedTokens.map((token) => {
    const suggestions = dictionary.suggest(token);
    if (suggestions.length > 0) {
      return suggestions[0];
    }
    return token;
  });
  return correctedTokens.join(" ");
}

module.exports = cleanText;
