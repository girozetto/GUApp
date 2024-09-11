

const validateProperties = (user, isLogin = true) => {
    if(!user.email) return 'Email is required';
    if(!user.password) return 'Password is required';
    else if(user.password === user.confirmPassword) return 'Password is not equal to your confirm password';
    if(!isLogin && !user.name) return 'Name is required';
    return null;
};

module.exports = {
    validateProperties
};