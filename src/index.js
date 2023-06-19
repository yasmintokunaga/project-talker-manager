const express = require('express');
const fs = require('fs').promises;
const { join } = require('path');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', async (req, res) => {
  const path = './talker.json';
  const contentFile = await fs.readFile(join(__dirname, path), 'utf-8');
  const talkers = JSON.parse(contentFile);
  return res.status(200).json(talkers); 
});
