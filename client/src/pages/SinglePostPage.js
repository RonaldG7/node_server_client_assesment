import React from 'react';
import Toolbar from "../components/toolbar/Toolbar";
import PostCard from "../components/postCard/PostCard";

const SinglePostPage = () => {
    return (
        <div className="bgColor">
            <Toolbar/>
            <PostCard/>
        </div>
    );
};

export default SinglePostPage;