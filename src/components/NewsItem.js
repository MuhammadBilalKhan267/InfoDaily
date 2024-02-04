import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {
    let {title, description, url, imageUrl, author, date, source} = this.props;
    let d = new Date(date);
    return (
      <div>
        <div className="card">
        <img src={!imageUrl ? "not-found.jpg" : imageUrl} className="card-img-top" alt="..."/>
        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}...</p>
          <span className="badge text-bg-success">{source}</span>
          <p className="card-text"><small className="text-muted">By {author?author:"Unknown"} on {d.toGMTString()}</small></p>
          <a href={url} rel="noreferrer" className="btn btn-sm btn-primary"target='_blank'>Read More</a>
        </div>
      </div>
      </div>
    )
  }
}

export default NewsItem
