import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

  constructor(props){
    super();
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    }
    document.title = `${props.category.charAt(0).toUpperCase() + props.category.slice(1)} - InfoDaily`;
  }
  static defaultProps = {
    country: "us",
    pageSize: 20,
    category: "general"
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  };

  async updateNews(){
    this.props.setProgress(10);
    this.setState(
      {
        loading: true
      }
      );
    let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`);
    this.props.setProgress(55);
    let parsedData = await data.json();
    this.props.setProgress(80);
    await this.setState({
      articles: parsedData.articles ,
      totalResults: parsedData.totalResults,
      loading: false
    });
    this.props.setProgress(100);
  }

  async componentDidMount(){
    this.updateNews();
  }
  fetchMoreData = async ()=>{
    let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page +1}&pageSize=${this.props.pageSize}`);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles) ,
      totalResults: parsedData.totalResults,
      page: this.state.page + 1
    });
  }
  
  
  render() {
    return (
      <>
        <h2 className='text-center my-4'>InfoDaily - Headlines</h2>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length<this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
          <div className="row my-3">
          {this.state.articles.map((element, index)=>{
          return <div className="col-md-3 my-2 center " key={index}>
            <NewsItem title={element.title ? element.title.slice(0,40) : element.title} description={element.description? element.description.slice(0,90): element.description} url={element.url} imageUrl={element.urlToImage} author={element.author} date={element.publishedAt} source={element.source.name}/>
          </div>
          })}
        </div>
        </div>

        </InfiniteScroll>
          
      </>
    )
  }
}

export default News
