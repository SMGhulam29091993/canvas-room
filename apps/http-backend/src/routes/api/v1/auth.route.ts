import express from 'express';
import { zodValidator } from '@repo/zod-dto';
import { CreateUserDto, SignInDto } from '@repo/zod-dto';
import { signIn, signUp } from '../../../controller/auth.controller.js';
const route: express.Router = express.Router();

route.post('/signup', zodValidator(CreateUserDto), signUp);
route.post('/signin', zodValidator(SignInDto), signIn);

export default route;
