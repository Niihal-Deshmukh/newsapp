import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';


export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [], // Must be an array
      loading: false,
      page:1
    };
  }

  handleNextClick = async ()=>{
    if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/(this.props.pageSize)))){
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=1f8b85b1b21447afa0dac62c06f6ae63&page=${this.state.page  + 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ page:this.state.page + 1, articles: parsedData.articles, loading:false });
    }
  }

  handlePrevClick = async ()=>{
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=1f8b85b1b21447afa0dac62c06f6ae63&page=${this.state.page  - 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ page:this.state.page - 1, articles: parsedData.articles, loading: false });
  }


  // it will always run after render function.
  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=1f8b85b1b21447afa0dac62c06f6ae63&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ articles: parsedData.articles , totalResults: parsedData.totalResults , loading:false});
  }

  render() {
    return (
      <>
      <div className="container">
        <h2 className='text-center my-3'>
            Today's World - {this.props.category ? this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1) : ''}
        </h2>     
        {(this.state.loading) && <Spinner/>}
        {!(this.state.loading) && <div className="row">
          {Array.isArray(this.state.articles) && this.state.articles.map((element) => (
            <div className="col-md-4" key={element.url}>
              <NewsItem
                title={element.title ? element.title.slice(0, 45) : ""}
                description={element.description ? element.description.slice(0, 88) : ""}
                imageUrl={!element.urlToImage?"/images/news.jpg":element.urlToImage}
                newsUrl={element.url}
                author={element.author}
                publishDate={element.publishedAt}
                sourceName={element.source.name}
              />
            </div>
          ))}
        </div>}
      </div>
      <div className='container d-flex justify-content-between mt-3'> 
          <button type="button" className="btn btn-dark" onClick={this.handlePrevClick} disabled={this.state.page<=1}>Previous</button>
          <button type="button" className="btn btn-dark" onClick={this.handleNextClick} disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/(this.props.pageSize))}>Next</button>
      </div>
      </>
    );
  }
}

export default News;