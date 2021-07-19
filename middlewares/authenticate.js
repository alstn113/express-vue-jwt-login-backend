const customSocialAuthenticate = (socialAuth) => {
  return (req, res, next) => {
    passport.authenticate(socialAuth, {
      state: JSON.stringify({ _socket: req.query.socketId }), //위조 방지 고유 토큰 세션으로 사용되는 듯. 콜백 url에 있음
    })(req, res, next);
  };
};

module.exports = {
  customSocialAuthenticate,
};
