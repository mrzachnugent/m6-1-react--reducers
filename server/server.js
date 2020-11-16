const express = require('express');

const PORT = 5678;

var app = express();

app.use(express.json());

app.use(require('./routes'));

const server = app.listen(PORT, function() {
  console.info('🌍 Listening on port ' + server.address().port);
});
