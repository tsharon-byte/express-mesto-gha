const authTemp = (req, res, next) => {
  req.user = {
    _id: '63462e50311689c8240da3c9',
  };
  next();
};
module.exports = authTemp;
