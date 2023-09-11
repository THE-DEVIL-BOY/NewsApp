import React from "react";

const NewsItem = (props) => {
  let { title, description, imgUrl, newsUrl, date, source } = props;
  return (
    <div>
      <div className="card">
        <img
          src={imgUrl}
          style={{ height: "18rem" }}
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <span
            className="position-absolute top-0   badge rounded-pill bg-danger"
            style={{ right: "0" }}
          >
            {source}
            {/* <span class="visually-hidden">unread messages</span> */}
          </span>
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}...</p>
          <h6 className="card-text text-danger">
            Published At :: {new Date(date).toDateString()}
          </h6>
          <a href={newsUrl} className="btn btn-primary btn-sm">
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
