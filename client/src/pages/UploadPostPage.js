import React from 'react';
import Toolbar from "../components/toolbar/Toolbar";
import UploadPost from "../components/uploadPost/UploadPost";

const UploadPostPage = () => {
    return (
        <div className="bgColor">
            <Toolbar/>
            <UploadPost/>
        </div>
    );
};

export default UploadPostPage;