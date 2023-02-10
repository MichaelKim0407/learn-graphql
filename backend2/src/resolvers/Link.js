function postedBy(link, {}, {prisma}) {
    return prisma.link
        .findUnique({
            where: {
                id: link.id,
            },
        })
        .postedBy();
}

function votes(link, {}, {prisma}) {
    return prisma.link
        .findUnique({
            where: {
                id: link.id,
            },
        })
        .votes();
}

module.exports = {
    postedBy,
    votes,
};
