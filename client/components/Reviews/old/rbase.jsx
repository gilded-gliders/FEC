import React from 'react';
import Rbheader from './rbheader.jsx';
import MessageList from './rbmessage.jsx';
import Form from './form.jsx';
import Button from './Button/Button';
import PopOut from './popout.jsx';

const Rbase = (props) =>{
  const { list, sort, helpful, notHelpful, report, moreReview,
    addfunc, moreBTN, msgClick } = props;
  return (
    <div
      style = { style }>
      <Rbheader
        length = { list.length }
        sort = { sort }/>
      <MessageList
        msgClick = { msgClick }
        list = { list }
        helpful = { helpful }
        report = { report }
        notHelpful = { notHelpful }/>
      <br></br>
      <Button
        moreBTNshow = { moreBTN }
        moreReview = { moreReview }
        addReview ={ addfunc } />
    </div>
  )
}

export default Rbase;

const style = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
}