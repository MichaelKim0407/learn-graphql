const {handleError} = require('../utils/prisma');
const {getJwtToken} = require('../utils/auth');
const passwords = require('../utils/passwords');
const {newLinkSubscriptionChannel, newVoteSubscriptionChannel} = require('../utils/pubsub');

async function post(root, {url, description}, {prisma, pubsub, userId}) {
    let data = {
        url,
        description,
    };
    if (userId) {
        data['postedBy'] = {connect: {id: userId}};
    }

    const link = await prisma.link.create({
        data,
    });
    pubsub.publish(newLinkSubscriptionChannel, link);
    return link;
}

function updateLink(root, {id, url, description}, {prisma}) {
    let data = {};
    if (url != null)
        data.url = url;
    if (description != null)
        data.description = description;

    id = parseInt(id);
    return prisma.link
        .update({
            data,
            where: {
                id,
            },
        })
        .catch(handleError);
}

function deleteLink(root, {id}, {prisma}) {
    id = parseInt(id);
    return prisma.link
        .delete({
            where: {
                id,
            },
        })
        .catch(handleError);
}

async function signup(root, {password, ...args}, {prisma}) {
    const encrypted = await passwords.encrypt(password);
    const user = await prisma.user.create({
        data: {
            password: encrypted,
            ...args,
        },
    });
    const token = getJwtToken(user.id);
    return {
        token,
        user,
    };
}

async function validateLogin(email, password, prisma) {
    const user = await prisma.user.findUnique({where: {email: email}});
    if (!user) {
        return null;
    }
    if (!await passwords.compare(password, user.password)) {
        return null;
    }
    return user;
}

async function login(root, {email, password}, {prisma}) {
    const user = await validateLogin(email, password, prisma);
    if (!user) {
        throw new Error('Wrong username or password');
    }

    const token = getJwtToken(user.id);
    return {
        token,
        user,
    };
}

async function vote(root, {linkId}, {prisma, pubsub, userId}) {
    linkId = parseInt(linkId);

    const vote = await prisma.vote.findUnique({
        where: {
            linkId_userId: {
                linkId: linkId,
                userId: userId,
            },
        },
    });

    if (vote) {
        throw new Error(`Already voted for link: ${linkId}`);
    }

    const newVote = await prisma.vote.create({
        data: {
            user: {connect: {id: userId}},
            link: {connect: {id: linkId}},
        },
    });
    pubsub.publish(newVoteSubscriptionChannel, newVote);
    return newVote;
}

module.exports = {
    post,
    updateLink,
    deleteLink,

    signup,
    login,

    vote,
};
