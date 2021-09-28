import { hash } from 'bcrypt';
import { nanoid } from 'nanoid';
import { compare } from 'bcrypt';

import { UserModel } from '../models/user-model.js';
import { mailService } from './mail-service.js';
import { tokenSaver } from '../helpers/tokenSaver.js';
import { UserDto } from '../dto/user-dto.js';
import { ErrorApi } from '../exceptions/error-api.js';
import { TokenModel } from '../models/token-model.js';
import { tokenService } from './token-service.js';

class UserService {
    async registration(email, password) {
        const checkUserExist = await UserModel.findOne({ email });
        if (checkUserExist) {
            throw ErrorApi.badRequestHandler(`User with this ${email} already exists`)
        }
        const cryptPassword = await hash(password, 4);
        const activationLink = nanoid();

        const user = await UserModel.create({ email, password: cryptPassword, activationLink });

        await mailService.sendActivationMail(email, `${process.env.URL_API}/api/activate/${activationLink}`);

        const userDto = new UserDto(user);

        const tokens = await tokenSaver(userDto);
        return tokens;
    }

    async activate(activationLink) {
        const user = await UserModel.findOne({ activationLink });
        if (!user) {
            throw ErrorApi.badRequestHandler('Incorrect activation link');
        }
        user.isActivated = true;
        await user.save();
    }

    async login(email, password) {
        const user = await UserModel.findOne({ email });
        if (!user) {
            throw ErrorApi.badRequestHandler('User not found');
        }
        const isPasswordEqual = await compare(password, user.password);
        if (!isPasswordEqual) {
            throw ErrorApi.badRequestHandler('Incorrect password');
        }
        const userDto = new UserDto(user);

        const tokens = await tokenSaver(userDto);
        return tokens;
    }

    async logout(refreshToken) {
        const tokenData = await tokenService.removeToken(refreshToken);
        return tokenData;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ErrorApi.unauthorizedErrorHandler();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDB = tokenService.findToken(refreshToken);
        if (!userData && !tokenFromDB) {
            throw ErrorApi.unauthorizedErrorHandler();
        }
        const user = await UserModel.findById(userData.id);
        console.log('user ===========>: ', user);
        const userDto = new UserDto(user);
        const tokens = await tokenSaver(userDto);
        return tokens;
    }
}

export const userService = new UserService();