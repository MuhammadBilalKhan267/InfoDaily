import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

function News(props) {

  const [articles, setarticles] = useState([]);
  const [loading, setloading] = useState(true);
  const [page, setpage] = useState(1);
  const [totalResults, settotalResults] = useState(0);

  document.title = `${props.category.charAt(0).toUpperCase() + props.category.slice(1)} - InfoDaily`;


  const updateNews = async () => {
    props.setProgress(10);
    setloading(true);
    let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`);
    props.setProgress(55);
    let parsedData = await data.json();
    props.setProgress(80);
    setarticles(parsedData.articles);
    settotalResults(parsedData.totalResults);
    setloading(false);
    props.setProgress(100);
  }

  useEffect(() => {
    updateNews();
  }, []);

  const fetchMoreData = async () => {
    let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`);
    let parsedData = await data.json();

    setarticles(articles.concat(parsedData.articles));
    settotalResults(parsedData.totalResults);
    setpage(page+1);
  }

  return (
    <>
      <h2 className='text-center' style={{marginTop:'90px'}}>InfoDaily - Headlines</h2>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row my-3">
            {articles.map((element, index) => {
              return <div className="col-md-3 my-2 center " key={index}>
                <NewsItem title={element.title ? element.title.slice(0, 40) : element.title} description={element.description ? element.description.slice(0, 90) : element.description} url={element.url} imageUrl={element.urlToImage} author={element.author} date={element.publishedAt} source={element.source.name} />
              </div>
            })}
          </div>
        </div>

      </InfiniteScroll>

    </>
  );
}

News.defaultProps = {
  country: "us",
  pageSize: 20,
  category: "general"
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
};

export default News
