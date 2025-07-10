import "./LiveFeed.css";

function LiveFeed() {
  return (
    <div className="LiveFeed">
      <iframe
        className="embed-responsive-item"
        src="http://10.0.0.133:5000/video_feed"
        id="feed"
        width="640"
        height="440"
      ></iframe>
    </div>
  );
}

export default LiveFeed;
