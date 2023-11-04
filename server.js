const path = require('path');
const gateway = require('express-gateway');

console.log(gateway().load(path.join(__dirname, 'config', 'gateway.config.yml')));

gateway()
  .load(path.join(__dirname, 'config'))
  .run();
