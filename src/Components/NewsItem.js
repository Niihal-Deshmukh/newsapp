import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title, description, imageUrl,newsUrl,author,publishDate,sourceName} = this.props
    return (
      <div className='my-3'>
        <div className="card" style={{ width: '18rem' }}>
          <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{left:'90%'}}>
           {sourceName}
        </span>
         <img src={imageUrl} className="card-img-top" alt="..."/>
          <div className="card-body">
              <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
           <p>
            By {!author ? "Unknown Author" : author} on {new Date(publishDate).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
              timeZone: 'GMT'
            })}
          </p>
           <a target="_blank" rel="noreferrer" href={newsUrl} className="btn btn-dark">Read more</a>
         </div>
         </div> 
    </div>
    )
  }
}

export default NewsItem

