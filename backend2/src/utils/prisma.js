const {Prisma} = require("@prisma/client");

function handleError(e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') { // not found
            return null;
        }
    }
    throw e;
}

module.exports = {
    handleError,
};
