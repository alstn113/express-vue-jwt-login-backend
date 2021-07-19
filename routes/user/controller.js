exports.current = (req, res, next) => {
  res.json(req.user);
};
