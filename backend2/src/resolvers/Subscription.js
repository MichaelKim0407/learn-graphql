const {newLinkSubscriptionChannel, newVoteSubscriptionChannel} = require('../utils/pubsub');

function getSubscribeFunction(channelName) {
    return (root, {}, {pubsub}) => pubsub.asyncIterator(channelName);
}

function getSubscription(channelName) {
    return {
        subscribe: getSubscribeFunction(channelName),
        resolve: payload => payload,
    };
}

module.exports = {
    newLink: getSubscription(newLinkSubscriptionChannel),
    newVote: getSubscription(newVoteSubscriptionChannel),
};
