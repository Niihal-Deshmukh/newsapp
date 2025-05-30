import React from 'react'

const NewsItem =(props)=> {

    return (
      <div className='my-3'>
        <div className="card" style={{ width: '18rem' }}>
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{left:'90%'}}>
           {props.sourceName}
        </span>
         <img src={props.imageUrl} className="card-img-top" alt="..."/>
          <div className="card-body">
              <h5 className="card-title">{props.title}</h5>
            <p className="card-text">{props.description}</p>
           <p>
            By {!props.author ? "Unknown Author" : props.author} on {new Date(props.publishDate).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
              timeZone: 'GMT'
            })}
          </p>
           <a target="_blank" rel="noreferrer" href={props.newsUrl} className="btn btn-dark">Read more</a>
         </div>
         </div> 
    </div>
    )

}

export default NewsItem

