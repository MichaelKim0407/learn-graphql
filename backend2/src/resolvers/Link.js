function postedBy(link, args, context) {
    return context.prisma.link.findUnique({where: {id: link.id}}).postedBy();
}

module.exports = {
    postedBy,
};
