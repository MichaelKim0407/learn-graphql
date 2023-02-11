import React from 'react';
import {timeDifferenceForDate} from "../utils/time";

const Link = (props) => {
    const {link} = props;

    return (
        <div className="flex mt2 items-start">
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
