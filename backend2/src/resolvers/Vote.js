function link(vote, {}, {prisma}) {
    return prisma.vote
        .findUnique({
            where: {
                id: vote.id,
            },
        })
        .link();
}

function user(vote, {}, {prisma}) {
    return prisma.vote
        .findUnique({
            where: {
                id: vote.id,
            },
        })
        .user();
}

module.exports = {
    link,
    user,
};
