import { userService } from "../service/user-service.js";
import { validationResult } from 'express-validator';
import { ErrorApi } from "../exceptions/error-api.js";
import { cookieHandler } from "../helpers/cookieHandler.js";

class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ErrorApi.badRequestHandler('Validation error', errors.array()))
            }
            const { email, password } = req.body;
            const userData = await userService.registration(email, password);
            cookieHandler(res, userData);
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const userData = await userService.login(email, password);
            cookieHandler(res, userData);
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }
    async logout(req, res, next) {
        try {
            const { refresh } = req.cookies;
            const token = await userService.logout(refresh);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (e) {
            next(e);
        }
    }
    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            await userService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL);
        } catch (e) {
            next(e);
        }
    }
    async refresh(req, res, next) {
        try {
            const { refresh } = req.cookies;
            const userData = await userService.refresh(refresh);
            cookieHandler(res, userData);
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }
}

export const userController = new UserController();