function links(user, {}, {prisma}) {
    return prisma.user
        .findUnique({
            where: {
                id: user.id,
            },
        })
        .links();
}

function votes(user, {}, {prisma}) {
    return prisma.user
        .findUnique({
            where: {
                id: user.id,
            },
        })
        .votes();
}

module.exports = {
    links,
    votes,
};
