function info() {
    return `This is the API of a Hackernews Clone`;
}

function feed(root, {}, context) {
    return context.prisma.link.findMany();
}

function link(root, {id}, context) {
    id = parseInt(id);
    return context.prisma.link.findUnique({
        where: {
            id: id,
        },
    });
}

module.exports = {
    info,
    feed,
    link,
};
