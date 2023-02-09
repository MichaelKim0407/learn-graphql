const {handleError} = require('../utils/prisma');
const {getJwtToken} = require('../utils/auth');
const passwords = require('../utils/passwords');

async function post(root, {url, description}, context) {
    const {userId} = context;

    let data = {
        url,
        description,
    };
    if (userId) {
        data['postedBy'] = {connect: {id: userId}};
    }

    return context.prisma.link.create({
        data,
    });
}

function updateLink(root, {id, url, description}, context) {
    id = parseInt(id);
    let data = {};
    if (url != null)
        data.url = url;
    if (description != null)
        data.description = description;
    return context.prisma.link.update({
        data: data,
        where: {
            id: id,
        },
    }).catch(handleError);
}

function deleteLink(root, {id}, context) {
    id = parseInt(id);
    return context.prisma.link.delete({
        where: {
            id: id,
        },
    }).catch(handleError);
}

async function signup(root, args, context) {
    const password = await passwords.encrypt(args.password);
    const user = await context.prisma.user.create({data: {...args, password}});
    const token = getJwtToken(user.id);
    return {
        token,
        user,
    };
}

async function validateLogin(email, password, context) {
    const user = await context.prisma.user.findUnique({where: {email: email}});
    if (!user) {
        return null;
    }
    if (!await passwords.compare(password, user.password)) {
        return null;
    }
    return user;
}

async function login(root, {email, password}, context) {
    const user = await validateLogin(email, password, context);
    if (!user) {
        throw new Error('Wrong username or password');
    }

    const token = getJwtToken(user.id);
    return {
        token,
        user,
    };
}

module.exports = {
    post,
    updateLink,
    deleteLink,

    signup,
    login,
};
