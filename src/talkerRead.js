const fs = require('fs').promises;
const { join } = require('path');

const readTalkerFile = async () => {
  const path = './talker.json';
  const contentFile = await fs.readFile(join(__dirname, path), 'utf-8');
  const talkers = JSON.parse(contentFile);
  return talkers;
};

const getTalkerById = async (id) => {
  const talkers = await readTalkerFile();
  const findTalker = talkers.find((talker) => talker.id === id);
  return findTalker;
};

module.exports = {
  readTalkerFile,
  getTalkerById,
};
