import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
const News = (props) => {
  const [articles, setarticles] = useState([]);
  const [loading, setloading] = useState(false);
  const [totalResults, settotalResults] = useState(0);
  const [page, setpage] = useState(1);

  const updatepage = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=278151f743004c18a372ed0d5d21b9ff&page=${page}&pageSize=20`;
    setloading(true);
    console.log(url);
    let data = await fetch(url);
    props.setProgress(30);
    let pdata = await data.json();
    props.setProgress(70);
    console.log(props.category);
    setarticles(pdata.articles);
    settotalResults(pdata.totalResults);
    setloading(false);

    props.setProgress(100);
  };
  useEffect(() => {
    updatepage();
  },[]);

  const fetchMoreData = async () => {
    console.log("love");
    const url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}
    &apiKey=278151f743004c18a372ed0d5d21b9ff&page=${page + 1}&pageSize=20`;
    let data = await fetch(url);
    let pdata = await data.json();
    console.log(pdata);
    setarticles(articles.concat(pdata.articles));
    setpage(page + 1);
    settotalResults(pdata.totalResults);
    console.log(pdata.articles);
    console.log(totalResults)
  };

  return (
    <>
      <div className="container">
        <h2 style={{ margin: "35px 0px",marginTop:"90px" }}>
          DailyNews | Top{" "}
          {props.category.slice(0, 1).toUpperCase() + props.category.slice(1)}{" "}
          HeadLines
        </h2>
        {loading && <Spinner />}
      </div>
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        {console.log(articles.length !== totalResults)}
        {console.log(articles.length)}
        <div className="container my-3">
          <div className="row my-5">
            {!loading &&
              articles.map((ele) => {
                return (
                  <div className="col-12 col-md-4  my-2" key={ele.url}>
                    <NewsItem
                      title={ele.title ? ele.title.slice(0, 45) : ""}
                      description={
                        ele.description ? ele.description.slice(0, 88) : ""
                      }
                      imgUrl={ele.urlToImage}
                      newsUrl={ele.url}
                      date={ele.publishedAt.slice(0, 10)}
                      source={ele.source.name}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.defaultProps = {
  country: "in",
};
News.propTypes = {
  country: PropTypes.string,
};
export default News;
