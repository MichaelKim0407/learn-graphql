const {ApolloServer} = require('apollo-server');
const fs = require('fs');
const path = require('path');

let lastId = 0;
let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL',
}];
const findLink = id => {
    const idx = links.findIndex(link => link.id === id);
    const link = idx === -1 ? null : links[idx];
    return [idx, link];
};

const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: () => links,
        link: (root, {id}) => findLink(id)[1],
    },
    Mutation: {
        post: (root, {url, description}) => {
            const link = {
                id: `link-${++lastId}`,
                description: description,
                url: url,
            };
            links.push(link);
            return link;
        },
        updateLink: (root, {id, url, description}) => {
            const link = findLink(id)[1];
            if (link == null)
                return null;
            if (url != null)
                link.url = url;
            if (description != null)
                link.description = description;
            return link;
        },
        deleteLink: (root, {id}) => {
            const [linkIdx, link] = findLink(id);
            if (linkIdx === -1)
                return null;
            links.splice(linkIdx, 1);
            return link;
        },
    },
};

const server = new ApolloServer({
    typeDefs: fs.readFileSync(
        path.join(__dirname, 'schema.graphql'),
        'utf8',
    ),
    resolvers,
});

server
    .listen()
    .then(({url}) =>
        console.log(`Server is running on ${url}`),
    );
