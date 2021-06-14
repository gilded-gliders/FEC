import React from 'react';
import Form from './form.jsx';
import FormCK from './formClick.jsx';

const PopOut = (props) =>{
  const arr = [ 'recommend', 'Stars', 'Size', 'Width', 'Comfort', 'Quality',
    'Length', 'Fit', 'Name', 'Email', 'Title', 'Description', 'Photo' ];

  const textExample = [  'Example: jackson11!', 'jackson11@email.com',
    'Example: Best purchase ever!',
    'Why did you like the product or not? and need a counter min 50 max 1000' ]

  const msg = [ 'For privacy reasons, do not use your full name or email address',
    'For authentication reasons, you will not be emailed' ]

  const { cancel, review, getTarget, starCK, addReview } = props;
  const desCount = review.Description.length;

  const a = () =>{
    let waring = [];
    if ( desCount < 50 ) { waring.push('Description') };
    if ( !review.Email.includes('@') ) { waring.push('Email') };
    if ( review.Name.length === 0 ) { waring.push('Name') };
    if ( review.Title.length === 0) { waring.push('Title') };
    addReview(waring);
  }

    return (
      <div style = { pop }>
        <div style = { cancelBTN }>
          <button
            onClick = { cancel }>
            X
          </button>
        </div>
        <div style = { container }>
          <div style ={smallcontainer}>
            <Form
              style = { name }
              info = { review[arr[0]] }
              name = { arr[0] }
              getTarget = { getTarget }/>
            { arr.slice(1,8).map( i =>
              <FormCK
                starCK = { starCK }
                key = { i }
                style = { name }
                info = { review[i] }
                name = { i }/>
            )}
          </div>
          <div style = {smallcontainer}>
            <div style = { tagcontainer }>
              { arr.slice(8,12).map(( i, index ) =>
                <div
                  style = { tag }
                  key = { index }>
                    { i }:
                </div>
              )}
              <div style = { counter }> Count : { desCount }</div>
            </div>
            <div style = { textcontainer }>
              { arr.slice(8,11).map(( i, index ) =>
                <div
                  key = { index }>
                  <input
                    style = { text }
                    type = 'text'
                    maxLength = '60'
                    onChange = { getTarget }
                    placeholder = { textExample[index] }
                    id = { i }/>
                  { review[i].length === 0 || msg[index] === undefined?
                    <div style = { block }></div>
                  :
                    <div>{ msg[index] }</div>
                  }
                </div>
              )}
              <textarea
                id = { arr[11] }
                style = { textarea }
                rows = '10'
                maxLength = '1000'
                onChange = { getTarget }
                placeholder = { textExample[3]}
                ></textarea>
            </div>
          </div>
        </div>
        <div style ={ submitBtn }>
          <button
            style={sumb}
            onClick ={a}>
              Submit
          </button>
          <input type ='file' key = 'photo1' onChange = { getTarget } id = 'Photo' />
          <input type ='file' key = 'photo2' onChange = { getTarget } id = 'Photo' />
        </div>
      </div>
    )
}
export default PopOut;

const pop = {
  height:'80%',
  width: '80%',
  overflow: 'visible',
  border:'1px solid black',
  position: 'absolute',
  backgroundColor:'white',
  zIndex:'90',
  display: 'flex',
  flexDirection: 'column',
}

const cancelBTN = {
  display: 'flex',
  margin: '10px',
  overflow: 'auto',
  justifyContent: 'flex-end',
}

const container = {
  display:'flex',
  overflow: 'auto',
  flexDirection: 'column',
  marginLeft: '20px'
}
const smallcontainer = {
  display:'flex',
  overflow: 'auto',
  width:'95%',
  border: '1px solid black'
}

const name = {
  border: '1px solid black',
  margin: '5px',
  padding: '2px',
  width: '25%',
}

const tagcontainer = {
  overflow: 'auto',
  margin: '5px',
  width:'20%',
}

const tag = {
  display: 'flex',
  justifyContent: 'flex-end',
  flexDirection: 'column',
  marginBottom: '20px',
}

const textcontainer = {
  overflow: 'auto',
  margin: '3px',
  width:'80%',
}

const text = {
  width: '95%'
}

const textarea = {
  resize: 'none',
  overflow: 'auto',
  width: '95%',
}

const counter = {
  overflow: 'auto',
  display: 'flex',
  justifyContent: 'flex-end'
}

const block = {
  height:'20px',
  width:'100%',
}

const sumb = {
  width: '20%',
}

const submitBtn = {
  display:'flex',
  justifyContent: 'center',
  marginTop: '5px',
}