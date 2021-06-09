/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import React from 'react';
import Thumbnail from './Thumbnail.jsx';

class DefaultView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      thumbnail: false,
    }

    this.changeThumbNail = this.changeThumbNail.bind(this);
  }

  // componentDidMount() {
  //   this.setState({thumbnail: false});
  // }

  // componentWillUnmount() {
  //   this.setState({thumbnail: true});
  // }
  // componentDidUpdate(prevProps) {
  //   console.log('previous props: ', prevProps);
  //   console.log('current props: ', this.props);
  //   // if(this.props !== prevProps) {
  //   //   this.setState({thumbnail: false});
  //   // }
  // }

  changeThumbNail(index) {
    this.props.callback(index);
    this.setState({
      index: index,
      thumbnail: false
    });


  }

  render() {
    var currentPic = this.props.picture;
    return(
      <>
      <div className = 'thumbnails'>
        {this.props.thumbnailArray.map((item, index) => {
          return(
            <Thumbnail index = {index} thumbnail = {item.photos[0].thumbnail_url} callback = {this.changeThumbNail} key = {index} identifier = {this.state.index}/>
          );
        })}
      </div>
      <img className = 'bigPicture' src= {currentPic} alt="Picture of Clothing"></img>
      </>
    )

  }

}


export default DefaultView;