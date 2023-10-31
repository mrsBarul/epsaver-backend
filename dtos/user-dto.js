module.exports = class UserDto {
    email;
    id;
    fullName;
    isActivated

    constructor(model) {
        this.email = model.email;
        this.id = model._id;
        this.fullName = model.fullName;
        this.isActivated = model.isActivated;
    }
}