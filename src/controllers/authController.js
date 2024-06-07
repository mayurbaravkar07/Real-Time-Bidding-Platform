const authService = require('../services/authService');

exports.register = async (req, res) => {
  const { username, password, email,role } = req.body;

  try {
    await authService.register(username, password, email,role);
    res.status(201).json({ message: 'User registered successfully' });
    
  } catch (error) {
    
    res.status(400).json({ error: 'User registration failed' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { token, user } = await authService.login(email, password);
    res.json({ token, user });
    next()
  } catch (error) {
    
    res.status(400).json({ error: 'Invalid credentials' });
  }
};
