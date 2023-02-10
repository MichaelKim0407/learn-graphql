function info() {
    return `This is the API of a Hackernews Clone`;
}

function feed(root, args, {prisma}) {
    const {filter, skip, take, orderBy} = args;
    const where = filter
        ? {
            OR: [
                {description: {contains: filter}},
                {url: {contains: filter}},
            ],
        }
        : {};
    const links = prisma.link
        .findMany({
            where,
            skip,
            take,
            orderBy,
        });
    const count = prisma.link
        .count({
            where,
        });
    return {
        id: `main-feed:${JSON.stringify(args)}`,
        links,
        count,
    };
}

function link(root, {id}, {prisma}) {
    id = parseInt(id);
    return prisma.link.findUnique({
        where: {
            id,
        },
    });
}

module.exports = {
    info,
    feed,
    link,
};
