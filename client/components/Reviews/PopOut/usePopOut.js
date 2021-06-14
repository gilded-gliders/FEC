import { useState, useEffect } from 'react';
import postReview from '../func/postReview/postReview';

const modle = {
  product_id: '',
  summary: '',
  name: '',
  email: '',
};

export default function usePopOut({
  key, obj, data, addUserReview, cancelAddReview,
}) {
  const [userReview, setUserReview] = useState(modle);
  const [recommend, setRecommend] = useState(true);
  const [photos, setPhotos] = useState([]);
  const [rating, setRating] = useState(0);
  const [body, setBody] = useState('');
  const [characteristics, setCharacteristics] = useState({});
  const [listWarning, setListWarning] = useState([]);

  useEffect(() => {
    setCharacteristics(obj);
    const modle1 = modle;
    modle1.product_id = data.product_id;
    setUserReview(modle1);
    setRecommend(true);
    setPhotos([]);
    setBody([]);
    setRating(0);
    setListWarning([]);
  }, [data]);

  useEffect(() => {
    setUserReview(userReview);
  }, [userReview]);

  const starClick = (event) => {
    const newObj = { ...characteristics };
    const arr = event.target.id.split(' ');
    const newKey = arr[0];
    const value = arr[1];
    if (newKey === 'Stars') {
      setRating(Number(value));
    } else {
      newObj[newKey].value = String(value);
      setCharacteristics(newObj);
    }
  };

  const isShowWarning = () => {
    setListWarning([]);
  };

  const handleClickCheckReview = () => {
    const {
      email,
      name,
      summary,
    } = userReview;
    const warning = [];
    if (body.length < 50) { warning.push('Description'); }
    if (!email.includes('@')) { warning.push('Email'); }
    if (name.length === 0) { warning.push('Name'); }
    if (summary.length === 0) { warning.push('Title'); }
    if (rating === 0) { warning.push('Stars'); }
    for (let i = 0; i < key.length; i += 1) {
      if (!characteristics[key[i]].value) {
        warning.push(key[i]);
      }
    }
    if (warning.length > 0) {
      setListWarning(warning);
    } else {
      const newObj = { ...userReview };
      newObj.body = body;
      newObj.rating = rating;
      newObj.photos = [...photos];
      newObj.recommend = recommend;
      newObj.characteristics = { ...characteristics };
      cancelAddReview();
      addUserReview(newObj);
      postReview(newObj);
    }
  };

  const handleChangeTarget = (event) => {
    const { id, value } = event.target;
    if (id === 'recommend') {
      if (value === 'false') {
        setRecommend(false);
      } else {
        setRecommend(true);
      }
    } else if (id === 'photos') {
      if (value !== undefined) {
        setPhotos([...photos, String(value)]);
      }
    } else if (id === 'body') {
      setBody(value);
    } else {
      userReview[id] = value;
    }
  };
  return {
    handleChangeTarget,
    handleClickCheckReview,
    isShowWarning,
    starClick,
    userReview,
    recommend,
    photos,
    rating,
    body,
    characteristics,
    listWarning,
  };
}
