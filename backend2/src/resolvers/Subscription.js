const {newLinkSubscriptionChannel} = require('../utils/pubsub');

function newLinkSubscribe(root, {}, {pubsub}) {
    return pubsub.asyncIterator(newLinkSubscriptionChannel);
}

const newLink = {
    subscribe: newLinkSubscribe,
    resolve: payload => payload,
};

module.exports = {
    newLink,
};
