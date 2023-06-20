const fs = require('fs').promises;
const { join } = require('path');

const path = './talker.json';

const readTalkerFile = async () => {
  const contentFile = await fs.readFile(join(__dirname, path), 'utf-8');
  const talkers = JSON.parse(contentFile);
  return talkers;
};

const getTalkerById = async (id) => {
  const talkers = await readTalkerFile();
  const findTalker = talkers.find((talker) => talker.id === id);
  return findTalker;
};

const writeTalkerFile = (talkers) => {
  fs.writeFile(join(__dirname, path), JSON.stringify(talkers));
};

module.exports = {
  readTalkerFile,
  getTalkerById,
  writeTalkerFile,
};
