const {ApolloServer} = require('apollo-server');
const {PrismaClient, Prisma} = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const errorHandling = e => {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') { // not found
            return null;
        }
    }
    throw e;
};

const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: async (root, {}, context) => {
            return context.prisma.link.findMany();
        },
        link: (root, {id}, context) => {
            id = parseInt(id);
            return context.prisma.link.findUnique({
                where: {
                    id: id,
                },
            });
        },
    },
    Mutation: {
        post: (root, {url, description}, context) => {
            return context.prisma.link.create({
                data: {
                    url: url,
                    description: description,
                },
            });
        },
        updateLink: (root, {id, url, description}, context) => {
            id = parseInt(id);
            let data = {};
            if (url != null)
                data.url = url;
            if (description != null)
                data.description = description;
            return context.prisma.link.update({
                data: data,
                where: {
                    id: id,
                },
            }).catch(errorHandling);
        },
        deleteLink: (root, {id}, context) => {
            id = parseInt(id);
            return context.prisma.link.delete({
                where: {
                    id: id,
                },
            }).catch(errorHandling);
        },
    },
};

const prisma = new PrismaClient();

const server = new ApolloServer({
    typeDefs: fs.readFileSync(
        path.join(__dirname, 'schema.graphql'),
        'utf8',
    ),
    resolvers,
    context: {
        prisma,
    },
});

server
    .listen()
    .then(({url}) =>
        console.log(`Server is running on ${url}`),
    );
