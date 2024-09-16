import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { AuthRequest } from '../middleware/authMiddleware';

export const register = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || password.length < 6) {
    return res.status(400).json({ message: 'Invalid data' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ firstName, lastName, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY! || 'default_secret_key', { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true }).status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error registering user' });
  }
};

export const getUser = async (req: AuthRequest, res: Response) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ firstName: user.firstName, lastName: user.lastName });
  } catch {
    res.status(500).json({ message: 'Error fetching user' });
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie('token').json({ message: 'Logged out' });
};
