const Math = require('./function');

const ai = `Anno-AI`;

const greetings = [
  `Hai`,
  `Halo`,
  `Haii`,
  `Haloo`,
  `Hi`
];

const yes = [
  `Yup`,
  `Oke`,
  `Iya`,
  `Ya`
];

const no = [
  `Tidak`,
  `Nggak`,
  `Engga`,
  `Nggak`,
  `Ga`,
  `Gak`
];

const help = [
  `Ada yang bisa kubantu?`,
  `Apa ada yang bisa kubantu?`,
  `Ada yang mau ditanyakan?`,
  `Butuh bantuan?`,
  `Apa ada yang perlu kubantu?`,
  `Mau tanya sesuatu? Aku siap menjawab`,
  `Perlu bantuan?`,
  `Ada yang bisa aku lakukan untukmu?`,
  `Apa ada yang perlu aku kerjakan?`,
  `Apa yang bisa aku bantu hari ini?`,
  `Aku di sini untuk membantumu. Ada yang bisa aku lakukan?`
];

const help2 = [
  `Jika kamu butuh bantuan, jangan ragu untuk bertanya padaku!`,
  `Jangan sungkan untuk bertanya jika kamu membutuhkan bantuan dariku!`,
  `Apabila ada yang perlu dibantu, jangan ragu untuk bertanya!`,
  `Jika ada yang ingin ditanyakan, silakan sampaikan padaku!`,
  `Jangan ragu untuk meminta bantuan jika kamu membutuhkannya!`,
  `Aku siap membantu jika ada yang perlu ditanyakan!`,
  `Jika ada pertanyaan, aku siap untuk membantu!`,
  `Aku akan membantumu, Jangan sungkan untuk bertanya!`,
  `Jika ada yang perlu dibantu, beritahu aku! Aku siap membantu!`
];

const server = [
  `Anomaly Network`,
  `ini`
];

const desc = [
  `Aku di buat untuk membantu player di server {server}`,
  `Tujuanku adalah membantu player-player di server {server}`,
  `Aku diciptakan untuk memberikan bantuan kepada player-player di server {server}`,
  `Aku dibuat untuk membantumu {username}`,
  `Aku dibuat oleh ZYX dengan tujuan untuk memberikan bantuan kepada player-player di server {server}`,
  `Saya ada untuk membantu player-player yang ada di server {server}`,
  `Diciptakan untuk memberikan bantuan dan kemudahan kepada player-player di server {server}`,
  `Dibuat dengan tujuan untuk membantu player-player di server {server}`,
  `Tujuanku diciptakan adalah untuk membantu player di server {server} dengan segala keperluan mereka.`,
  `Aku diciptakan oleh ZYX untuk menolong dan mempermudah player-player di server {server}`
];

const welcum = [
  `Perkenalkan, namaku ${ai}`,
  `Aku adalah ${ai}`,
  `Namaku ${ai}`,
  `Namaku adalah ${ai}`,
  `Aku ${ai}`
];


// Responses
const rules = [
  {
    pattern: `sapa`,
    responses: [
      { id: 1, text: `{greets}! {help}` },
      { id: 2, text: `{greets}! {welcum}. {help}` },
      { id: 3, text: `{greets} {username}! {help}` },
      { id: 4, text: `{greets} {username}, {help2}` },
      { id: 5, text: `{greets} {username}! {help2}` },
      { id: 6, text: `{greets}! {help2}` },
      { id: 7, text: `{greets}! {welcum}. {help}` },
      { id: 9, text: `{greets}! {welcum}. {desc}. {help2}` },
      { id: 11, text: `{greets} {username}! {help}` },
      { id: 13, text: `{greets} {username}! {welcum}, {help2}` },
      { id: 13, text: `{greets} {username}! {welcum}, {desc}. {help}` },
    ],
  },
  {
    pattern: 'nama',
    responses: [
      { id: 51, text: `Anno-Ai!` },
      { id: 51, text: `{welcum}, {help}` },
      { id: 51, text: `{greets}! {welcum}.` },
      { id: 51, text: `{welcum}. {desc}. {help2}` },
      { id: 51, text: `{greets}! {welcum}, {help}` },      
      { id: 51, text: `{greets}! {welcum}, {help2}` },
      { id: 51, text: `{greets}, {welcum}. {desc}. {help}` },      
      { id: 51, text: `{welcum}, {desc}. {help}` },
      { id: 51, text: `{greets}! {welcum}. {desc}, {help2}` },      
      { id: 51, text: `{welcum}` },
      { id: 51, text: `{welcum}, {help2}` }    
    ],
  },
  {
    pattern: 'creator',
    responses: [
      { id: 81, text: `{greets} {username}! Aku dibuat oleh ZYX, owner dari server ini. {help}?` },
      { id: 82, text: `{greets} {username}! Aku diciptakan oleh ZYX, sang owner dari server ini. {help}` },
      { id: 83, text: `{greets} {username}! Aku dibuat oleh ZYX, owner dari server ini. Butuh bantuan apa?` },
      { id: 84, text: `{greets} {username}! Aku adalah hasil karya ZYX, owner dari server ini. Ada yang perlu dibantu?` },
      { id: 85, text: `{greets}! Aku dibuat oleh ZYX, sang owner dari server ini. {help} {username}?` },
      { id: 86, text: `{greets}! Aku diciptakan oleh ZYX, owner dari server ini. {help}, {username}?` },
      { id: 87, text: `{greets} {username}! Aku adalah hasil dari ZYX, owner dari server ini. Ada yang perlu dibantu?` },
      { id: 88, text: `{greets} {username}! Aku dibuat oleh ZYX, sang owner dari server ini. {help}` },
      { id: 89, text: `{greets}! Aku diciptakan oleh ZYX, owner dari server ini. Butuh bantuanku, {username}?` },
      { id: 90, text: `{greets}! Aku adalah karya ZYX, sang owner dari server ini. {help}` },
      { id: 91, text: `{greets} {username}! Aku dibuat oleh ZYX, owner dari server ini. {help}?` },
      { id: 92, text: `{greets} {username}! Aku adalah hasil dari ZYX, owner dari server ini. Ada yang perlu dibantu?` },
      { id: 93, text: `{greets} {username}! Aku dibuat oleh ZYX, owner dari server ini. {help}` },
      { id: 94, text: `{greets} {username}! Aku diciptakan oleh ZYX, sang owner dari server ini. {help}` },
      { id: 95, text: `{greets} {username}! Aku dibuat oleh ZYX, owner dari server ini. Butuh bantuan apa?` },
      { id: 96, text: `{greets} {username}! Aku adalah hasil karya ZYX, owner dari server ini. Ada yang perlu dibantu?` },
      { id: 97, text: `{greets}! Aku dibuat oleh ZYX, sang owner dari server ini. {help} {username}?` },
      { id: 98, text: `{greets}! Aku diciptakan oleh ZYX, owner dari server ini. {help}, {username}?` },
      { id: 99, text: `{greets} {username}! Aku adalah hasil dari ZYX, owner dari server ini. Ada yang perlu dibantu?` },
      { id: 100, text: `{greets} {username}! Aku dibuat oleh ZYX, sang owner dari server ini. {help}` }
    ],
  },
  {
    pattern: /apa kamu manusia/i,
    responses: [
      `Tidak, saya bukan manusia. Saya adalah Chatbot AI yang dibuat dengan Node.js.`,
    ],
  },
  {
    pattern: /keluar|bye|sampai jumpa/i,
    responses: [
      `Terima kasih sudah mengobrol dengan saya. Sampai jumpa!`,
      `Sampai jumpa lain waktu!`,
    ],
    exit: true,
  },
  {
    pattern: 'default',
    responses: [
      { id: 0, text: `Maaf, {username}, saya tidak mengerti. Bisa Anda ulangi?` },
      { id: -1, text: `Mohon maaf, {username}, tapi saya tidak dapat memahami maksud Anda. Bisakah Anda mengulanginya?` },
      { id: -2, text: `Maaf ya, {username}, tapi sepertinya saya kesulitan memahami apa yang Anda sampaikan. Bisa Anda menjelaskannya lagi?` },
      { id: -3, text: `Hm, {username}, maaf jika saya tidak mengerti. Bisakah Anda mengulangi dengan cara yang berbeda?` },
      { id: -4, text: `Maaf, {username}, sepertinya ada kesalahan dalam pemahaman saya. Bisa Anda mengungkapkannya dengan kata lain?` },
      { id: -5, text: `Mohon maaf, tapi saya tidak dapat memproses apa yang Anda katakan. Dapatkah Anda mengatakan dengan cara lain?` },
      { id: -6, text: `Maaf, {username}, sepertinya saya kebingungan dengan apa yang Anda sampaikan. Bisakah Anda mengulanginya dengan kata-kata lain?` },
      { id: -7, text: `Mohon maaf, {username}, saya tidak mengerti maksud Anda. Dapatkah Anda memberikan penjelasan lebih lanjut?` },
      { id: -8, text: `Maaf, {username}, sepertinya saya tidak bisa memahami apa yang Anda sampaikan. Bisakah Anda mengungkapkannya dengan cara yang berbeda?` },
      { id: -9, text: `Mohon maaf, {username}, saya tidak dapat memproses permintaan Anda. Bisakah Anda mengulanginya dengan cara yang lebih jelas?` },
      { id: -10, text: `Maaf ya, {username}, sepertinya saya tidak dapat mengerti apa yang sedang Anda katakan. Bisakah Anda menjelaskannya dengan cara yang berbeda?` },
      { id: -11, text: `Mohon maaf, {username}, tetapi saya tidak dapat memahami pesan Anda. Bisa Anda mengulangkannya dengan kata-kata yang berbeda?` },
      { id: -12, text: `Maaf, {username}, sepertinya saya kesulitan memahami apa yang ingin Anda sampaikan. Bisa Anda memberikan penjelasan lebih lanjut?` },
      { id: -13, text: `Mohon maaf, tapi sepertinya saya tidak bisa mengerti apa yang Anda katakan. Bisakah Anda mengungkapkannya dengan cara yang lebih sederhana?` },
      { id: -14, text: `Maaf ya, {username}, saya tidak mengerti apa yang Anda maksud. Bisa Anda menjelaskan dengan cara lain?` },
      { id: -15, text: `Mohon maaf, {username}, saya tidak dapat memahami pesan Anda. Bisakah Anda mengulanginya dengan kata-kata yang lebih jelas?` },
      { id: -16, text: `Maaf, {username}, sepertinya saya bingung dengan apa yang Anda katakan. Bisakah Anda mengungkapkannya dengan cara yang berbeda?` },
      { id: -17, text: `Mohon maaf, tapi saya tidak mengerti maksud Anda. Dapatkah Anda memberikan penjelasan yang lebih jelas?` },
      { id: -18, text: `Maaf, {username}, sepertinya saya tidak bisa memahami apa yang Anda sampaikan. Bisakah Anda menjelaskannya dengan kata-kata lain?` },
      { id: -19, text: `Mohon maaf, {username}, saya tidak dapat memproses permintaan Anda. Bisakah Anda mengulanginya dengan cara yang lebih sederhana?` },
      { id: -20, text: `Maaf ya, {username}, sepertinya saya tidak dapat mengerti apa yang sedang Anda katakan. Bisakah Anda menjelaskannya dengan cara yang berbeda?` },
      { id: -21, text: `Mohon maaf, tapi saya tidak dapat memahami pesan Anda. Bisa Anda mengulangkannya dengan kata-kata yang berbeda?` },
      { id: -22, text: `Maaf, {username}, sepertinya saya kesulitan memahami apa yang ingin Anda sampaikan. Bisa Anda memberikan penjelasan yang lebih jelas?` },
      { id: -23, text: `Mohon maaf, tapi sepertinya saya tidak bisa mengerti apa yang Anda katakan. Bisakah Anda mengungkapkannya dengan cara yang lebih sederhana?` },
      { id: -24, text: `Maaf ya, {username}, saya tidak mengerti apa yang Anda maksud. Bisa Anda menjelaskan dengan cara lain?` },
      { id: -25, text: `Mohon maaf, {username}, saya tidak dapat memahami pesan Anda. Bisakah Anda mengulanginya dengan kata-kata yang lebih jelas?` },
      { id: -26, text: `Maaf, {username}, sepertinya saya bingung dengan apa yang Anda katakan. Bisakah Anda mengungkapkannya dengan cara yang berbeda?` },
      { id: -27, text: `Mohon maaf, tapi saya tidak mengerti maksud Anda. Dapatkah Anda memberikan penjelasan yang lebih jelas?` },
      { id: -28, text: `Maaf, {username}, sepertinya saya tidak bisa memahami apa yang Anda sampaikan. Bisakah Anda menjelaskannya dengan kata-kata lain?` },
      { id: -29, text: `Mohon maaf, {username}, saya tidak dapat memproses permintaan Anda. Bisakah Anda mengulanginya dengan cara yang lebih sederhana?` },
      { id: -30, text: `Maaf ya, {username}, sepertinya saya tidak dapat mengerti apa yang sedang Anda katakan. Bisakah Anda menjelaskannya dengan cara yang berbeda?` },
      { id: -31, text: `Mohon maaf, tapi saya tidak dapat memahami pesan Anda. Bisa Anda mengulangkannya dengan kata-kata yang berbeda?` },
      { id: -32, text: `Maaf, {username}, sepertinya saya kesulitan memahami apa yang ingin Anda sampaikan. Bisa Anda memberikan penjelasan yang lebih jelas?` },
      { id: -33, text: `Mohon maaf, tapi sepertinya saya tidak bisa mengerti apa yang Anda katakan. Bisakah Anda mengungkapkannya dengan cara yang lebih sederhana?` },
      { id: -34, text: `Maaf ya, {username}, saya tidak mengerti apa yang Anda maksud. Bisa Anda menjelaskan dengan cara lain?` },
      { id: -35, text: `Mohon maaf, {username}, saya tidak dapat memahami pesan Anda. Bisakah Anda mengulanginya dengan kata-kata yang lebih jelas?` }
    ]
  },
];

// Export modules
module.exports = {
  responses: rules.responses,
  rules: rules,
  greets: greetings,
  yes: yes,
  no: no,
  help: help,
  help2: help2,
  welcum: welcum,
  desc: desc,
  server: server,
};
