function info() {
    return `This is the API of a Hackernews Clone`;
}

function feed(root, {}, {prisma}) {
    return prisma.link.findMany();
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
