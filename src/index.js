const express = require('express');
const talkerRead = require('./talkerRead');

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
  const talkers = await talkerRead.readTalkerFile();
  return res.status(200).json(talkers);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await talkerRead.getTalkerById(Number(id));
  if (talker) return res.status(200).json(talker);
  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

app.post('/login', (req, res) => {
  const requiredProperties = ['email', 'password'];
  if (requiredProperties.every((property) => property in req.body)) {
    const generateRandomToken = Math.random().toString(16).substr(2)
      + Math.random().toString(16).substr(2);
    const token = generateRandomToken
      .split('')
      .splice(1, 16)
      .join('');
    res.status(200).json({ token });
  } else {
    res.sendStatus(400);
  }
});
