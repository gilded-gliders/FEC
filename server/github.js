const axios = require('axios');
const TOKEN = require('./config');

const hrapi = (input, callback) => {
  console.log(`input testing ${input}`);
  const option = {
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/${input}`,
    headers: {
      'User-Agent': 'request',
      Authorization: `${TOKEN}`,
    },
  };

  // refactor this to return axios instead of using the callback
  return axios(option)
    .then((data) => {
      const datas = data.data;
      callback(null, datas);
    })
    .catch((err) => {
      console.log(err, 'err');
      callback(err);
    });
};

module.exports = {
  hrapi,
};

// module.exports.hrapi(console.log);
