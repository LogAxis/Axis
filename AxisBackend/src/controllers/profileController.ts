import { Request, Response } from 'express';
import { updateUserProfile, User } from '../models/User';

export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = req.user as User;
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching profile', error });
  }
};

export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req.user as User).id as number;
    const profile = req.body;
    await updateUserProfile(userId, profile);
    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating profile', error });
  }
};
