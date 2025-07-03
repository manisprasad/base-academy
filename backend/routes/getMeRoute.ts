import express from 'express';
import { handleGetMe } from '../controller/getMe';
import verifyJWT from '../middleware/verifyJWT';


export const getMeRoute = express.Router();
getMeRoute.get('/', verifyJWT, handleGetMe);