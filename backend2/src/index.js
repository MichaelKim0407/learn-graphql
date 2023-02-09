const {ApolloServer} = require('apollo-server');
const {PrismaClient} = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const {getUserId} = require('./utils/auth');

const resolvers = require('./resolvers');

const prisma = new PrismaClient();

const context = ({req}) => {
    return {
        ...req,
        prisma,
        userId:
            req && req.headers.authorization
                ? getUserId(req)
                : null,
    };
};

const server = new ApolloServer({
    typeDefs: fs.readFileSync(
        path.join(__dirname, 'schema.graphql'),
        'utf8',
    ),
    resolvers,
    context,
});

server
    .listen()
    .then(({url}) =>
        console.log(`Server is running on ${url}`),
    );
