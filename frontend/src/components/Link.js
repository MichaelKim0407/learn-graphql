import React from 'react';
import {getAuthToken} from "../utils/auth";
import {timeDifferenceForDate} from "../utils/time";
import {gql, useMutation} from "@apollo/client";
import {FEED_QUERY} from "./LinkList";

const VOTE_MUTATION = gql`
    mutation VoteMutation($linkId: ID!) {
        vote(linkId: $linkId) {
            id
            link {
                id
                votes {
                    id
                    user {
                        id
                    }
                }
            }
            user {
                id
            }
        }
    }
`;

const Link = (props) => {
    const {link} = props;

    const authToken = getAuthToken();

    const [vote] = useMutation(VOTE_MUTATION, {
        variables: {
            linkId: link.id,
        },
        update: (cache, {data: {vote}}) => {
            /* TODO bug with search
             * 1. It does not work if FEED_QUERY has not been executed yet
             * 2. 2 votes are added (visually) when vote is clicked
             */
            const {feed} = cache.readQuery({
                query: FEED_QUERY,
            });

            const updatedLinks = feed.links.map((feedLink) => {
                if (feedLink.id === link.id) {
                    return {
                        ...feedLink,
                        votes: [...feedLink.votes, vote],
                    };
                }
                return feedLink;
            });

            cache.writeQuery({
                query: FEED_QUERY,
                data: {
                    feed: {
                        links: updatedLinks,
                    },
                },
            });
        },
    });

    return (
        <div className="flex mt2 items-start">
            <div className="flex items-center">
                <span className="gray">{props.index + 1}.</span>
                {authToken && (
                    <div
                        className="ml1 gray f11"
                        style={{cursor: 'pointer'}}
                        onClick={vote}
                    >
                        ▲
                    </div>
                )}
            </div>
            <div className="ml1">
                <div>
                    {link.description} ({link.url})
                </div>
                {(
                    <div className="f6 lh-copy gray">
                        {link.votes.length} votes | by{' '}
                        {link.postedBy ? link.postedBy.name : 'Unknown'}{' '}
                        {timeDifferenceForDate(link.createdAt)}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Link;
