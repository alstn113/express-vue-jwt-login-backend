const User = require("../../models/user");
const authenticateUtils = require("../../utils/authenticate");

exports.register = async (req, res, next) => {
  const { email, password, nick } = req.body;
  const exUser = await User.findOne({ where: { email: email } });
  if (exUser) {
    return res.json({ error: "이미 존재하는 이메일입니다" });
  } else {
    const hash = await authenticateUtils.encryptPassword(password);
    await User.create({
      email,
      nick,
      password: hash,
    }).then(() => res.json({ success: true }));
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email: email } });
  if (user) {
    const result = await authenticateUtils.certifyPassword(password, user.password);
    if (result) {
      const accessToken = await authenticateUtils.generateAccessToken({ id: user.id, email: user.email, nick: user.nick });
      return res.json({ accessToken, user: { id: user.id, email: user.email, nick: user.nick } });
    } else {
      return res.json({ error: "비밀번호가 틀렸습니다" });
    }
  } else {
    return res.json({ error: "존재하지 않는 이메일입니다" });
  }
};
