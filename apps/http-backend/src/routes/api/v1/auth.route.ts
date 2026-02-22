import express from 'express';
import { zodValidator } from '@repo/zod-dto/dist/schema_validator/zod.validator.js';
import { CreateUserDto, SignInDto } from '@repo/zod-dto/dist/dtos/user.dto.js';
import { signIn, signUp } from 'src/controller/auth.controller.js';
const route: express.Router = express.Router();

route.post('/signup', zodValidator(CreateUserDto), signUp);
route.post('/signin', zodValidator(SignInDto), signIn);

export default route;
