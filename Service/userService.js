const UserModel = require('../Models/UserModel')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const MailService = require('./MailService')
const TokenService = require('./TokenService')
const UserDto = require('../dtos/user-dto')
require('dotenv').config();
const AuthError = require('../exceptions/AuthError')

class UserService {
    async registration(email, password, fullName) {
        const candidate = await UserModel.findOne({ email })
        if(candidate) {
            throw AuthError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`)
        }
        const hashPassword = await bcrypt.hash(password, 3)
        const activationLink = uuid.v4();
        const user = await UserModel.create({ email, password: hashPassword, fullName, activationLink })
        await MailService.sendActivationMail( email, `https://epsaver-p913.onrender.com/activate/${activationLink}`);
        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens({...userDto});
        await TokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens,user: userDto }
    }

    async activate(activationLink) {
        const user = await UserModel.findOne({activationLink})
        if(!user) {
            throw AuthError.BadRequest("Некорректная ссылка активации")
        }
        user.isActivated = true;
        await user.save();
    }

    async loginProfile(email, password) {
        const user = await UserModel.findOne({email}) 
            if (!user) {
                throw AuthError.BadRequest("Пользователь с таким email не найден")
            }
            const isPassEquels = await bcrypt.compare(password, user.password) 
            if (!isPassEquels) {
                throw AuthError.BadRequest("Неверный пароль")
            }

            const userDto = new UserDto(user);
            const tokens = TokenService.generateTokens({...userDto})
            await TokenService.saveToken(userDto.id, tokens.refreshToken);

            return { ...tokens,user: userDto }
    }

    async logout(refreshToken) {
        const token = await TokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if(!refreshToken) {
            throw AuthError.UnauthorizedError();
        }
        const userData = TokenService.validateRefreshToken(refreshToken);
        const tokenFromDB = TokenService.findToken(refreshToken);
        if(!userData || !tokenFromDB) {
            throw AuthError.UnauthorizedError()
        }
        const user = await UserModel.findById(userData.id);
        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens({...userDto})
        await TokenService.saveToken(userDto.id, tokens.refreshToken);
        return { ...tokens,user: userDto }
    }
}

module.exports = new UserService();