const path = require('path');
const fs = require('fs');

const config = {
  devServer: {
    host: 'localhost',
    port: 8080,
    https: {
      key: fs.readFileSync(path.join(__dirname, 'cert', 'localhost', 'server.key')),
      cert: fs.readFileSync(path.join(__dirname, 'cert', 'localhost', 'server.crt')),
    },
  },
};

module.exports = config;
