import React from "react";
const Video = ({videoSrcURL, videoTitle}) => (
    <div className="video">
        <iframe
            src={videoSrcURL}
            title={videoTitle}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            webkitallowfullscreen="true"
            mozallowfullscreen="true"
            allowFullScreen
            width="100%"
            height="500rem"
        />
    </div>
)

export default Video