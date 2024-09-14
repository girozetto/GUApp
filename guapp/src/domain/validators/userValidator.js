const UserService = require("../services/userService");

const service = new UserService();
const validateProperties = async (user, isLogin = true) => {
    if(!user.email) return 'Email is required';
    else if(!isLogin && !user.id && (await service.query().where({ email: user.email}).firstOrDefault())) return 'There is already a user with that email';

    if(!user.password) return 'Password is required';
    else if(!isLogin && user.password !== user.confirmPassword) return 'Password is not equal to your confirm password';
    if(!isLogin && !user.name) return 'Name is required';
    return null;
};

module.exports = {
    validateProperties
};