const UserService = require('../Service/userService')
const { validationResult } = require('express-validator')
const AuthError = require('../exceptions/AuthError');
require('dotenv').config();

module.exports.registration = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return next(AuthError.BadRequest("Ошибка при валидации", errors.array()))
        }
        const { email, password, fullName } = req.body;
        const userData = await UserService.registration(email, password, fullName);
        res.cookie("refreshToken", userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        return res.json(userData)
    } catch (e) {
        next(e)
    }
}

module.exports.loginProfile = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const userData = await UserService.loginProfile(email, password)
        res.cookie("refreshToken", userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        return res.json(userData)
    } catch (e) {
        next(e)
    }
}

module.exports.logout = async (req, res, next) => {
    try {
        const {refreshToken} = req.cookies;
        const token = await UserService.logout(refreshToken);
        res.clearCookie('refreshToken');
        return res.json(token)
    } catch (e) {
        next(e)
    }
}

module.exports.activate = async (req, res, next) => {
    try {
        const activationLink = req.params.link;
        await UserService.activate(activationLink);
        return res.redirect(`https://timely-lamington-b8c71e.netlify.app/ChoiceAuth`)
    } catch (e) {
        next(e);
    }
}

module.exports.refresh = async (req, res, next) => {
    try {
        const {refreshToken} = req.cookies;
        const userData = await UserService.refresh(refreshToken)
        res.cookie("refreshToken", userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        return res.json(userData)
    } catch (e) {
        next(e)
    }
}

