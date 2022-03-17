import {useEffect, useState} from 'react';
import Toolbar from "../components/toolbar/Toolbar";
import SinglePost from "../components/singlePost/SinglePost";
import Filter from "../components/filter/Filter";
import http from "../plugins/http";

const MainPage = () => {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        http.get("/getPosts").then(res => {
            if (res.success) {
                setPosts(res.posts)
            }
        })
    },[])

    return (
        <div className="bgColor">
            <Toolbar/>
            <Filter posts={posts} setPosts={setPosts} />
            {posts.map((x, i) => <SinglePost key={i} post={x}/>)}
        </div>
    );
};

export default MainPage;