const bcrypt = require('bcrypt');
const User = require('../../models/user.model');

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: 'User already exists' });
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  const newUser = new User({
    name,
    email,
    password: hashedPassword
  });
  await newUser.save();
  res.status(201).json({user_id: newUser._id, message: 'New User created' });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  req.session.user = user;
  res.status(200).json({ user_id: user._id, message: 'Logged in' });
};

exports.logout = async (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.redirect('/login');
  });
};
