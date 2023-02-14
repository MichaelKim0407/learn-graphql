import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {getAuthToken, removeAuthToken} from '../utils/auth';

const Header = () => {
    const navigate = useNavigate();

    const authToken = getAuthToken();

    return (
        <div className="flex pa1 justify-between nowrap orange">
            <div className="flex flex-fixed black">
                <Link to="/" className="no-underline black">
                    <div className="fw7 mr1">Hacker News</div>
                </Link>
                <Link to="/" className="ml1 no-underline black">
                    new
                </Link>
                <div className="ml1">|</div>
                <Link to="/top" className="ml1 no-underline black">
                    top
                </Link>
                <div className="ml1">|</div>
                <Link
                    to="/search"
                    className="ml1 no-underline black"
                >
                    search
                </Link>
                {authToken && (
                    <div className="flex">
                        <div className="ml1">|</div>
                        <Link
                            to="/create"
                            className="ml1 no-underline black"
                        >
                            submit
                        </Link>
                    </div>
                )}
            </div>
            <div className="flex flex-fixed">
                {authToken ? (
                    <div
                        className="ml1 pointer black"
                        onClick={() => {
                            removeAuthToken();
                            navigate(`/`);
                        }}
                    >
                        logout
                    </div>
                ) : (
                    <Link
                        to="/login"
                        className="ml1 no-underline black"
                    >
                        login
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Header;
