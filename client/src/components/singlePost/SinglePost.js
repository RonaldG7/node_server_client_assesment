import React from 'react';
import "./singlePost.css"
import {useNavigate} from "react-router-dom";

const SinglePost = ({post}) => {

    const nav = useNavigate()

    return (
        <div onClick={() => nav(`/${post._id}`)} className="singlePost d-flex">
            <img src={post.images[0]} alt=""/>
            <div>
                <h3>{post.name}</h3>
                <h4>{post.city}</h4>
                <h4>${post.price}</h4>
            </div>
            <div>
                <p>Description: {post.description}</p>
            </div>
        </div>
    );
};

export default SinglePost;