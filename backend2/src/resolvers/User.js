function links(user, args, context) {
    return context.prisma.user.findUnique({where: {id: user.id}}).links();
}

module.exports = {
    links,
};
