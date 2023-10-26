import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postNewTweet } from './store/tweet';

function CreateTweet() {
    const dispatch = useDispatch();
    const [tweetContent, setTweetContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!tweetContent.length) {
            return alert('Cannot post blank tweet!!');
        };
        const tweet = { message: tweetContent };
        dispatch(postNewTweet(tweet));
        setTweetContent('');
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                 type='text'
                 onChange={ e => setTweetContent(e.target.value)}
                 placeholder="What is happening?!"
                 value={tweetContent}
                >
                </input>
                <button>Post Tweet</button>
            </form>
        </div>
    )
};

export default CreateTweet;
