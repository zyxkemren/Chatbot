const f = require('./function');

f.search('Apa Coba')
  .then((result) =>
    console.log(result)
  )
  .catch((err) =>
    console.log(err)
  )
