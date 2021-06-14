/* eslint-disable react/prop-types */
import React from 'react';
import ProductImage from './ProductImage.jsx';
import axios from 'axios';
import Description from './Description.jsx';
import DefaultView from './DefaultView.jsx';
import Stars from '../Reviews/star.jsx';
import Rating from '../RelatedItems/Rating.jsx';
//stateful component
//what do i need from the API? product name, product style, review
class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: [],
      stylesList: [],
      mounted: false,
      index: 0,
      urlName: 'url',
      clicked: false,
      thumbIndex: 0
    }

    this.changePic = this.changePic.bind(this);
    this.changeThumbnail = this.changeThumbnail.bind(this);
    this.renderItems = this.renderItems.bind(this);
  }

  componentDidMount() {
    console.log('this is props id', this.props.id);
    this.fetchGET('products', this.props.id, 'description');
  }



  componentDidUpdate() {
    var id = this.props.id;
    if(this.state.stylesList.length === 0) {
      this.getStyles(id)
      .then((response) => {
        this.setState({stylesList: response.data});
      })
      .catch((error) => {
        console.log(error);
      })
      }
  }

  fetchGET(string, id, name){
    axios.get('/get', {params: {endpoint: `${string}/${id}`}})
      .then((response) =>{
        console.log('successful get request', response.data);
        this.setState({
          [name]: response.data,
          mounted: true
          //has to set state for data.[whatever key we need from data]
        })
      })
      .catch(err=>{
        console.log(err)
      });
  }


  getStyles(id) {
    return axios('/get', {params: {endpoint: `products/${id}/styles`}});
  }


  changePic(number) {
    this.setState({
      index: number,
      thumbIndex: 0,
      //before this state was changing between my url and my thumbnail url
      urlName: 'url'
    })
  }

  changeThumbnail(number) {

    this.setState({
      thumbIndex: number,
      urlName: 'thumbnail_url'
    })
  }

  scrollTo() {
    console.log('clicked');
    window.scrollTo(0, 1000);
  }

  renderItems() {
      //const { category, name, id, slogan, description, features } = this.state.description;
      const currentItem = this.state.stylesList.results;
      //console.log(this.state.stylesList);
      var price;
      var salePrice;
      var styleItem = currentItem[this.state.index].name;

      if(currentItem[this.state.index].sale_price !== null) {
        salePrice = <div>{currentItem[this.state.index].sale_price}</div>;
        price = <div style = {crossed}>{currentItem[this.state.index].original_price}</div>
      } else {
        salePrice = <div></div>
        price = <div>{currentItem[this.state.index].original_price}</div>
      }

      return(
        <div className = 'wrapper'>
          <div className = 'rating'>
            <Rating rating = {this.props.rating.ratings}/>
            <a href = '#' className = 'readallreviews' onClick = {this.scrollTo()}>Read All Reviews</a>
          </div>
         <DefaultView picture = {currentItem[this.state.index].photos[this.state.thumbIndex][this.state.urlName]} styleObj = {currentItem[this.state.index]} callback = {this.changeThumbnail} index = {this.state.thumbIndex}/>
         <Description descriptions = {this.state.description} style = {currentItem[this.state.index]} skus = {currentItem[this.state.index].skus} price = {price} salePrice = {salePrice} styleItem = {styleItem}/>
         <div data-testid = 'stylesBox' className = 'stylesBox'>
         {currentItem.map((item, index) => {
           return <ProductImage image = {item.photos[0]} order = {index} price = {item} callback = {this.changePic} key = {item.style_id}/>
         })}
         </div>
        </div>
       );
  }


  render() {
    //have to to map through the styles array we get back
    //console.log('this is STATE', this.state.stylesList);
    if(this.state.stylesList.length === 0) {
      console.log(this.state.description);
      return (
       <div>LOADING</div>
      );
    } else {
      return (
        this.renderItems()
      );
     }
  }
}



export default Overview;

const crossed = {
  textDecoration: 'line-through',
  color: 'red'
}

const highlighted = {
  borderWidth: '2px',
  borderStyle: 'solid',
  borderColor: 'grey'
}