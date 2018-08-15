module.exports.getAll = (req, res) => {
  res.json({ test: 'category all' })
};

module.exports.getById = (req, res) => {
  res.json({ test: 'category id' });
};

module.exports.delete = (req, res) => {
  res.json({ test: 'category delete' });
};

module.exports.create = (req, res) => {
  res.json({ test: 'category create' });
};

module.exports.update = (req, res) => {
  res.json({ test: 'category update' });
};