function postedBy(link, {}, {prisma}) {
    return prisma.link
        .findUnique({
            where: {
                id: link.id,
            },
        })
        .postedBy();
}

module.exports = {
    postedBy,
};
