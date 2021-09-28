import { ErrorApi } from "../exceptions/error-api.js";
import { tokenService } from '../service/token-service.js';

export const authMiddleware = function (req, res, next) {
    try {
        const authorization = req.headers.authorization;
        if (!authorization) {
            return next(ErrorApi.unauthorizedErrorHandler());
        }
        const accessToken = authorization.split(' ')[1];
        if (!accessToken) {
            return next(ErrorApi.unauthorizedErrorHandler());
        }
        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData) {
            return next(ErrorApi.unauthorizedErrorHandler());
        }

        req.user = userData;
        next();
    } catch (e) {
        return next(ErrorApi.unauthorizedErrorHandler());
    }
}