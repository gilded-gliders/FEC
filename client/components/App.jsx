import React from 'react';
import axios from 'axios';
import Header from './Header.jsx';
import Overview from './Overview/Overview.jsx';
import RelatedItems from './RelatedItems/RelatedItems.jsx';
import Reviews from './Reviews/Reviews1.jsx';
import QA from './Reviews/QA/Qa.jsx';
import Search from './Search/Search';
import MonkeyQA from './Reviews/QA/MonkeyQA';
import { searchData } from './dataList.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      targetId: 25167,
      currentItem: {},
      loaded: false,
      list:[],
      search: '',
      isSearch: false,
      listSearch:[],
      listCurrentItem:[],
      queryURL:'',
    };
    this.renderPage = this.renderPage.bind(this);
    this.changeProductId = this.changeProductId.bind(this);
    this.search = this.search.bind(this);
    this.submit = this.submit.bind(this);
    this.idGet = this.idGet.bind(this);
  }

  componentDidMount(){
    var query = window.location.search
    var queryId = query.slice(query.length - 5);
    var queryNum = query.lastIndexOf(':');
    var queryURL = query.slice(0,queryNum);

    var productId = !queryId ? 25167: Number(queryId);
    let data = sessionStorage.getItem('list');
    let data1 = [];
    let bool = sessionStorage.getItem('isSearch');
    bool = JSON.parse(bool);
    if(bool !== null){
      if(bool.isSearch === false) {
        bool = false
      } else {
        bool = true
      }
    }else {
      bool = '0'
    }
    if (data !== null) {
      data1 = data1.concat(JSON.parse(data))
    } else {
      data1 = data1.concat(searchData)
    }
    let listSearch = sessionStorage.getItem('listSearch');
    if(listSearch !== null){
      listSearch = JSON.parse(listSearch);
    } else {
      listSearch = [];
    }
    axios.get(`/getAll/${productId}`)
      .then((response) => {
        this.setState({
          list:[...data1],
          targetId: !queryId ? 25167: Number(queryId),
          currentItem: response.data,
          loaded: true,
          isSearch: bool,
          listSearch:listSearch,
          queryURL:queryURL,
        },()=>{
          if(data1.length <= 2000) {
            axios.get(`/getAllItems/`)
              .then(res => {
                let data2 = data1.concat(res.data)
                sessionStorage.setItem('list',JSON.stringify(data2))
              })
              .catch(console.log)
          }
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }

  changeProductId(id) {
    window.location.assign(`${this.state.queryURL}/?product_id=${id}`)
  }

  search(event){
    let text = event.target.value
    if(text.length >= 3) {
      this.setState({
        search: text,
      })
    }
  }

  submit() {
    const txt =this.state.search
    if (txt.length >= 3) {
      const arr = [...this.state.list];
      const arr1 = arr.filter((i)=>{
        const myName = i.name.toLowerCase();
        return myName.includes(txt.toLowerCase())
      })
      sessionStorage.setItem('listSearch',JSON.stringify(arr1));
      sessionStorage.setItem('isSearch',JSON.stringify({isSearch:true}));
    }
  }

  idGet(event){
    const id = event.target.id;
    sessionStorage.setItem('isSearch',JSON.stringify({isSearch:false}));
    window.location.assign(`${this.state.queryURL}/?product_id=${id}`)
  }

  renderPage() {
      if (this.state.loaded) {
        if (this.state.isSearch === true) {
          return (
            <div>
              <Header search={this.search} submit={this.submit}/>
              <Search listSearch={this.state.listSearch} idGet={this.idGet} txt={this.state.search}/>
            </div>
          )
        } else{
          return (
          <div>
            <Header search={this.search} submit={this.submit}/>
            <Overview id = {this.state.targetId} item = {this.state.currentItem} rating = {this.state.currentItem.rating}/>
            <RelatedItems id={this.state.targetId} changeProductId={this.changeProductId} currentItem={this.state.currentItem}/>
            <QA id ={this.state.targetId}/>
            <Reviews id={this.state.targetId} productRating={this.state.currentItem} />
          </div>
        )}
      } else {
        return (
          <div>
            Page Loading ...
          </div>
        );
      }
    }


  render() {
    return (
      <div>
        {this.renderPage()}
      </div>
    );
  }
}

export default App;
