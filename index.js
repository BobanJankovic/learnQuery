const path = require('path');
const express = require('express');

const app = express();
const port = 3000;

app.use('/', express.static(path.join(__dirname, 'learnQuery')));
app.use('/lib', express.static(path.join(__dirname, 'lib')));

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening at http://localhost:${port}`);
});
