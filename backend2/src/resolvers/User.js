function links(user, {}, {prisma}) {
    return prisma.user
        .findUnique({
            where: {
                id: user.id,
            },
        })
        .links();
}

module.exports = {
    links,
};
