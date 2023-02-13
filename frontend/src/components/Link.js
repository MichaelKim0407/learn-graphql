import React from 'react';
import {getAuthToken} from "../utils/auth";
import {timeDifferenceForDate} from "../utils/time";
import {gql, useMutation} from "@apollo/client";

const VOTE_MUTATION = gql`
    mutation VoteMutation($linkId: ID!) {
        vote(linkId: $linkId) {
            id
            link {   # <--- important to have this section so that useMutation automagically updates the cache
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
        /* NOTE:
         * We don't need to update cache here
         * because useMutation already attempts to update the cache by looking at the id.
         * See comment in VOTE_MUTATION.
         */
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
