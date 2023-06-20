const express = require('express');
const talkerRead = require('./talkerRead');
const { validateEmail, validatePassword } = require('./validation/validateLogin');
const {
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
} = require('./validation/validateTalker');

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

app.post('/login', validateEmail, validatePassword, (req, res) => {
  const generateRandomToken = Math.random().toString(16).substr(2)
    + Math.random().toString(16).substr(2);
  const token = generateRandomToken
    .split('')
    .splice(1, 16)
    .join('');
  res.status(200).json({ token });
});

app.post(
  '/talker',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  async (req, res) => {
    const talkers = await talkerRead.readTalkerFile();
    const newTalker = { ...req.body, id: talkers.length + 1 };
    talkers.push(newTalker);
    talkerRead.writeTalkerFile(talkers);
    res.status(201).json(newTalker);
  },
);

app.put(
  '/talker/:id',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  async (req, res) => {
    const { id } = req.params;
    const talkers = await talkerRead.readTalkerFile();
    if (talkers.some((talker) => talker.id === Number(id))) {
      const updateListTalker = talkers.filter((talker) => talker.id !== id);
      updateListTalker.push({ ...req.body, id: Number(id) });
      talkerRead.writeTalkerFile(updateListTalker);
      return res.status(200).json({ ...req.body, id: Number(id) });
    }
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  },
);
