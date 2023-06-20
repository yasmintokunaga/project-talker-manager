const validateToken = (req, res, next) => {
  const token = req.header('authorization');
  if (!token) {
    return res.status(401).json({
      message: 'Token não encontrado',
    });
  }
  if (token.length !== 16) {
    return res.status(401).json({
      message: 'Token inválido' });
  }
  next();
};

const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name || name === null || name === '') {
    return res.status(400).json({
      message: 'O campo "name" é obrigatório',
    });
  }
  if (name.length < 3) {
    return res.status(400).json({
      message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  }
  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    return res.status(400).json({
      message: 'O campo "age" é obrigatório',
    });
  }
  if (Number(age) < 18 || !Number(age) || Number(age) - Math.round(Number(age)) !== 0) {
    return res.status(400).json({
      message: 'O campo "age" deve ser um número inteiro igual ou maior que 18',
    });
  }
  next();
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório',
    });
  }
  next();
};

const validateWatchedAt = (req, res, next) => {
  const { talk } = req.body;
  const { watchedAt } = talk;
  if (!watchedAt) {
    return res.status(400).json({
      message: 'O campo "watchedAt" é obrigatório',
    });
  }
  const arrWatchedAt = watchedAt.split('/');
  if (
    arrWatchedAt.length !== 3
    || watchedAt.length !== 10
  ) {
    return res.status(400).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  next();
};

const validateRate = (req, res, next) => {
  const { talk } = req.body;
  const { rate } = talk;
  if (rate <= 0) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
    });
  }
  if (!rate) {
    return res.status(400).json({
      message: 'O campo "rate" é obrigatório',
    });
  }
  if (Number(rate) > 5 || Number(rate) - Math.round(Number(rate)) !== 0) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
    });
  }
  next();
};

module.exports = {
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
};
