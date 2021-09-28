import { tokenService } from '../service/token-service.js';

export async function tokenSaver(userDto) {
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
}