import React from 'react';
import axios from 'axios';
import Rbase from './rbase.jsx';
import Rating from './rating.jsx';
// import Popout from './popout.jsx';
// import Warning from './Warning/Warning';
import PopOut from './PopOut/PopOut';

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: '',
      reviewsList: [],
      productRating: '',
      add: false,
      newReview: {
        'Stars': 1,
        'recommend': true,
        'Size': 1,
        'Width': 1,
        'Comfort': 1,
        'Quality': 1,
        'Length': 1,
        'Fit': 1,
        'Title': '',
        'Description': '',
        'Photo': [],
        'Name': '',
        'Email': '',
        'date': '',
        'helpfulness': 0,
        'response': null,
      },
      rvGet: false,
      rtGet: false,
      moreBTNshowed: true,
      rtStarCk: false,
      tempList: [],
      warningItems: [],
    };
    this.reviewsGET = this.reviewsGET.bind(this);
    this.ratingGET = this.ratingGET.bind(this);
    this.sort = this.sort.bind(this);
    this.helpful = this.helpful.bind(this);
    this.notHelpful = this.notHelpful.bind(this);
    this.report = this.report.bind(this);
    this.add = this.add.bind(this);
    this.moreReview = this.moreReview.bind(this);
    this.getTarget = this.getTarget.bind(this);
    this.addReview = this.addReview.bind(this);
    this.loading = this.loading.bind(this);
    this.ratingstar = this.ratingstar.bind(this);
    this.msgClick = this.msgClick.bind(this);
    this.cancel = this.cancel.bind(this);
    this.starCK = this.starCK.bind(this);
    this.cancelWarning = this.cancelWarning.bind(this);
  };

  componentDidMount() {
    let targetId = this.props.id;
    this.setState({
      productId: targetId,
    });
    this.ratingGET( 'reviews/meta', targetId );
    this.reviewsGET( `reviews`, targetId, 2, 'relevant' );
  };

  componentDidUpdate(prevProps) {
    if ( prevProps.id !== this.props.id ) {
      let targetId = this.props.id;
      this.setState({
        productId : targetId,
        rvGet: false,
        rtGet: false,
      });
    this.ratingGET( 'reviews/meta', targetId );
    this.reviewsGET( 'reviews', targetId, 2, 'relevant' );
    };
  };

  getTarget(event) {
    let key = event.target.id;
    let value = event.target.value;
    let HTML = event.target.innerHTML;
    let obj = { ...this.state.newReview };
    if ( key === 'recommend' ) {
      if ( HTML === 'YES' ) {
        value = true;
      } else {
        value = false;
      };
    }

    if ( key === 'Photo' ) {
      if(value === undefined){
        value = ''
      }
      obj[key].push({ url: String(value) });
    } else {
       obj[key] = value;
    }
    this.setState({
      newReview: obj,
    });
  };

  reviewsGET(string, id, count, sort) {
    axios.get( '/get', {
      params: {
        endpoint: `${ string }/?product_id=${ id }&count=${ count }&sort=${ sort }`
      }})
      .then( res =>{
        let arr =  res.data.results;
        const { reviewsList } = this.state;
        let show;
        if ( JSON.stringify(arr) === JSON.stringify(reviewsList) ) {
          show = false;
        } else {
          show = true;
        }
        console.log(arr)
        this.setState({
          reviewsList: arr,
          rvGet: true,
          moreBTNshowed: show,
        });
      })
      .catch( err => console.log);
  };

  ratingGET(string, id) {
    axios.get( '/get', {
      params: {
        endpoint: `${ string }/?product_id=${ id }`
      }})
      .then( res =>{
        console.log(res.data,'s')
        this.setState({
          productRating: res.data,
          rtGet: true,
        });
      })
      .catch( err => console.log );
  };

  sort(target) {
    let id = this.state.productId;
    let num = this.state.reviewsList.length;
    this.reviewsGET( 'reviews', id, num, target )
  };

  helpful(target) {
    let arr = this.state.reviewsList.slice();
    if ( arr[ target ][ 'help' ] !== true ) {
      arr[ target ].helpfulness++;
      arr[ target ][ 'help' ] = true;
    };
    //shoudl limit report time with user system
    //should have a put req
    //but not databse to change.
    //use arr[target].proudce_id and PUT /reviews/:review_id/helpful
    this.setState({
      reviewsList: arr,
    });
  };

  notHelpful(target) {
    let arr = this.state.reviewsList.slice();
    if ( arr[ target ][ 'help' ] !== true ) {
      // need to find out which key for not helpful;
      //arr[target].helpfulness++;
      arr[ target ][ 'help' ] = true;
    };
    //shoudl limit report time with user system
    //should have a put req
    //but not databse to change.
    //use arr[target].proudce_id and PUT /reviews/:review_id/helpful
    this.setState({
      reviewsList: arr,
    });
  };

  report(target) {
    let arr = this.state.reviewsList.slice();
    arr.splice( target, 1 );
    this.setState({
      reviewsList: arr,
    });
    //should have a put req
    //but no databse to change.
    //use arr[target].proudce_id and PUT /reviews/:review_id/helpful
    //temple change to State take out first to test function working or not
  };

  add() {
    this.setState({
      add: true,
    });
  };

  moreReview() {
    let oldlen = this.state.reviewsList.length;
    let num = oldlen + 2;
    let targetId = this.state.productId;
    this.reviewsGET( 'reviews', targetId, num, 'relevant' );
  };



  starCK(event) {
    let obj = { ...this.state.newReview };
    let key = event.target.name;
    let value = event.target.id;
    obj[key] = Number(obj[key]) + Number(value);
    this.setState({
      newReview: obj,
    })
  }
  addReview(obj){
  //   if (array.length === 0) {
  //     let obj = { ...this.state.newReview };
      let a = new Date();
      let b = a.toISOString()
      obj.date = b;
  //     obj.body = obj.Description;
  //     obj.photos = obj.Photo;
  //     obj.rating = obj.Stars;
      obj.response = null;
      obj.reviewer_name = obj.name;
  //     obj.summary = obj.Title;
      let arr = [ ...this.state.reviewsList ];
      arr.unshift( obj );
      console.log(arr,)
      this.setState({
        reviewsList: arr,
  //       newReview: {
  //         'Stars': 1,
  //         'recommend': true,
  //         'Size': 1,
  //         'Width': 1,
  //         'Comfort': 1,
  //         'Quality': 1,
  //         'Length': 1,
  //         'Fit': 1,
  //         'Title': '',
  //         'Description': '',
  //         'Photo': [],
  //         'Name': '',
  //         'Email': '',
  //         'date': '',
  //         'helpfulness': 0,
  //         'response': null,
        // },
      //   add:false,
      });
  //   } else {
  //     this.setState({
  //       warningItems: array,
  //     })
  //   }
  };

  addReview(obj) {
    console.log(obj);
    console.log(this.state.reviewsList);
  }

  cancel() {
    this.setState({
      add: false,
    })
  };

  cancelWarning() {
    this.setState({
      warningItems: [],
    });
  }

  loading() {
    const { rvGet, rtGet } = this.state;
    if ( rvGet === true && rtGet === true ) {
      const { reviewsList, productRating, moreBTNshowed, newReview, add, warningItems } = this.state;
      return (
        <div
          style = { bas }>
          <div>RATINGS REVIEWS</div>
          <div
            style = { base }>
              {/* { warningItems.length !== 0?
                <Warning
                  warningItems = { warningItems }
                  show = { this.cancelWarning }
                />
              :
                null } */}

              { add === true?
              <PopOut
                  addReview = { this.addReview }
                  // review = { newReview }
                  // getTarget = { this.getTarget }
                  // starCK = { this.starCK }
                  cancel = {this.cancel}
                  data = {this.state.productRating}
                />
              :
                null }
            <Rating
              rating = { productRating }
              ratingstar = { this.ratingstar }/>
            <Rbase
              list = { reviewsList }
              sort = { this.sort }
              helpful ={ this.helpful }
              notHelpful ={ this.notHelpful }
              report ={ this.report }
              moreReview = { this.moreReview }
              addfunc = { this.add }
              msgClick = { this.msgClick }
              moreBTN = { moreBTNshowed }/>
          </div>
        </div>
      );
    } else {
      return <div>Loading...</div>
    };
  };

  ratingstar(num) {
    const { reviewsList, tempList, rtStarCk } = this.state;
    let arr;
    if ( rtStarCk === false ) {
      arr = [ ...reviewsList ];
    } else {
      arr = [ ... tempList ];
    }
    let arr1 = arr.filter( i => i.rating <= Number( num ));
    if ( JSON.stringify( arr1 ) === JSON.stringify( reviewsList )) {
      this.setState({
        reviewsList: arr,
        tempList:[],
        rtStarCk: false,
      })
    } else {
      this.setState({
        rtStarCk: true,
        reviewsList: arr1,
        tempList : arr,
      })
    }
  };

  msgClick(event) {
    let arr = [ ...this.state.reviewsList ];
    let index = event.target.id;
    if (arr[index]['click'] === undefined) {
      arr[index]['click'] = true;
    } else {
      arr[index]['click'] = undefined;
    }
    this.setState({
      reviewsList: arr,
    })
  }

  render() {
    return (
      <div>
        { this.loading() }
      </div>
    );
  };
};

export default Reviews;

const base = {
  display: 'flex',
  justifyContent:'center',
}

const bas= {
  justifyContent: 'center',
}