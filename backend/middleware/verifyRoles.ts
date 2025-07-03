import { Request, Response, NextFunction } from 'express';
import { Roles } from '../config/roleList';

// Middleware to verify if the user has at least one of the allowed roles
const verifyRole = (allowedRoles: number) => {
  return (req: Request, res: Response, next: NextFunction) => {

    if (!req.roles) {
       res.status(401).json({ message: 'Unauthorized: No user role found' });
       return;
    }

    if (allowedRoles !== req.roles) {
       res.status(403).json({ message: 'Forbidden: You do not have access' });
       return;
    }

    console.log('User role verified:', req.roles , "You can delete");

    // okay, now You can go
    next();
  };
};

export default verifyRole;
