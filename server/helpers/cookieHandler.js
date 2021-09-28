const DAYS = 30;
const HOURS_IN_DAY = 24;
const MINUTES_IN_HOUR = 60;
const SECONDS_IN_MINUTE = 60;
const MILLISECONDS_IN_SECOND = 1000;

export function cookieHandler(res, userData) {
    res.cookie('refresh', userData.refreshToken, {
        maxAge: DAYS * HOURS_IN_DAY * MINUTES_IN_HOUR * SECONDS_IN_MINUTE * MILLISECONDS_IN_SECOND, httpOnly: true,
    })
}