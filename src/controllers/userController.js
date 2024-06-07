const userService = require('../services/userService');

exports.getProfile = async (req, res) => {
  try {
    const user = await userService.getUserProfile(req.user.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch profile' });
  }
};


exports.resetPasswordRequest = async (req, res) => {
    try {
        const { email } = req.body;
        const host = req.headers.host;
        const message = await userService.sendPasswordResetEmail(email, host);
        res.status(200).json({ message });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;
        const message = await userService.resetPassword(token, password);
        res.status(200).json({ message });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
