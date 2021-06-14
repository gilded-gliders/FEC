import React from 'react';
import PropTypes from 'prop-types';

import FormStarCK from './FormStarCK/FormStarCK';
import { msg, textExample } from '../data';
import Warning from './Warning/Warning';
import usePopOut from './usePopOut';

// const modle = {
//   product_id: '',
//   summary: '',
//   name: '',
//   email: '',
// };

const PopOut = (props) => {
  const { addUserReview, data, cancelAddReview } = props;
  // const [userReview, setUserReview] = useState(modle);
  // const [recommend, setRecommend] = useState(true);
  // const [photos, setPhotos] = useState([]);
  // const [rating, setRating] = useState(0);
  // const [body, setBody] = useState('');
  // const [characteristics, setCharacteristics] = useState({});
  // const [listWarning, setListWarning] = useState([]);
  const key = Object.keys(data.characteristics);
  const obj = {};
  for (let i = 0; i < key.length; i += 1) {
    obj[key[i]] = {
      id: data.characteristics[key[i]].id,
      value: 0,
    };
  }
  const {
    handleChangeTarget,
    handleClickCheckReview,
    isShowWarning,
    starClick,
    userReview,
    recommend,
    rating,
    body,
    characteristics,
    listWarning,
  } = usePopOut({
    key, obj, data, addUserReview, cancelAddReview,
  });

  // useEffect(() => {
  //   setCharacteristics(obj);
  //   modle.product_id = data.product_id;
  //   setUserReview(modle);
  //   setRecommend(true);
  //   setPhotos([]);
  //   setBody([]);
  //   setRating(0);
  //   setListWarning([]);
  // }, [data]);

  // useEffect(() => {
  //   setUserReview(userReview);
  // }, [userReview]);

  // const starClick = (event) => {
  //   const newObj = { ...characteristics };
  //   const arr = event.target.id.split(' ');
  //   const newKey = arr[0];
  //   const value = arr[1];
  //   if (newKey === 'Stars') {
  //     setRating(Number(value));
  //   } else {
  //     newObj[newKey].value = String(value);
  //     setCharacteristics(newObj);
  //   }
  // };

  // const isShowWarning = () => {
  //   setListWarning([]);
  // };

  // const handleClickCheckReview = () => {
  //   const {
  //     email,
  //     name,
  //     summary,
  //   } = userReview;
  //   const warning = [];
  //   if (body.length < 50) { warning.push('Description'); }
  //   if (!email.includes('@')) { warning.push('Email'); }
  //   if (name.length === 0) { warning.push('Name'); }
  //   if (summary.length === 0) { warning.push('Title'); }
  //   if (rating === 0) { warning.push('Stars'); }
  //   for (let i = 0; i < key.length; i += 1) {
  //     if (!characteristics[key[i]].value) {
  //       warning.push(key[i]);
  //     }
  //   }
  //   if (warning.length > 0) {
  //     setListWarning(warning);
  //   } else {
  //     // POST
  //     const newObj = { ...userReview };
  //     newObj.body = body;
  //     newObj.rating = rating;
  //     newObj.photos = [...photos];
  //     newObj.recommend = recommend;
  //     newObj.characteristics = { ...characteristics };
  //     cancelAddReview();
  //     addUserReview(newObj);
  //   }
  // };

  // const handleChangeTarget = (event) => {
  //   const { id, value } = event.target;
  //   if (id === 'recommend') {
  //     if (value === 'false') {
  //       setRecommend(false);
  //     } else {
  //       setRecommend(true);
  //     }
  //   } else if (id === 'photos') {
  //     if (value !== undefined) {
  //       setPhotos([...photos, String(value)]);
  //     }
  //   } else if (id === 'body') {
  //     setBody(value);
  //   } else {
  //     userReview[id] = value;
  //   }
  // };

  return (
    <div
      className="popOut"
      data-testid="popout"
    >
      {listWarning.length !== 0
        ? (
          <Warning
            data-testid="warning"
            listWarning={listWarning}
            isShowWarning={isShowWarning}
          />
        ) : null}
      <div className="popOutContainer">
        <div className="topContainer">
          <div className="topSmallContainer">
            <div>Recommend</div>
            <div className="buttonBase">
              <button
                data-testid="recommendYes"
                type="button"
                onClick={handleChangeTarget}
                className={recommend
                  ? 'clickedButton'
                  : 'unclickedButton'}
                id="recommend"
                value="true"
              >
                YES
              </button>
              <button
                data-testid="recommendNo"
                type="button"
                onClick={handleChangeTarget}
                className={recommend
                  ? 'unclickedButton'
                  : 'clickedButton'}
                id="recommend"
                value={false}
              >
                No
              </button>
            </div>
          </div>
          <button
            className="formButton"
            type="button"
            onClick={cancelAddReview}
          >
            X
          </button>
        </div>
        <div className="firstContainer">
          <div className="firstTopContainer">
            <FormStarCK
              starClick={starClick}
              info={Number(rating)}
              name="Stars"
            />
            {Object.keys(characteristics).map((i) => (
              <FormStarCK
                starClick={starClick}
                key={i}
                info={Number(characteristics[i].value)}
                name={i}
              />
            ))}
          </div>
          <div className="midSmallContainer">
            <div className="tagContainer">
              <div className="tag">Name :</div>
              <div className="tag">Email :</div>
              <div className="tag">Title :</div>
              <div className="tag">Description :</div>
              <div className="tag">
                Count :
                {body.length}
              </div>
            </div>
            <div className="textcontainer">
              { ['name', 'email', 'summary'].map((i, index) => (
                <div key={i} className="formTextContainer">
                  <div>
                    <input
                      className="formText"
                      type="text"
                      maxLength="60"
                      onChange={handleChangeTarget}
                      placeholder={textExample[index]}
                      id={i}
                    />
                    {userReview[i].length === 0 || msg[index] === undefined
                      ? <div className="block" />
                      : <div className="formMSG">{msg[index]}</div>}
                  </div>
                </div>
              ))}
              <textarea
                id="body"
                className="textarea"
                rows="5"
                maxLength="1000"
                onChange={handleChangeTarget}
                placeholder={textExample[3]}
              />
            </div>
          </div>
        </div>
        <div className="btnContainer">
          <button
            type="button"
            className="clickedButton"
            onClick={handleClickCheckReview}
          >
            Submit
          </button>
          <input
            className="clickedButton"
            type="file"
            key="photo1"
            onChange={handleChangeTarget}
            id="photos"
          />
          <input
            className="clickedButton"
            type="file"
            key="photo2"
            onChange={handleChangeTarget}
            id="photos"
          />
        </div>
      </div>
    </div>
  );
};

PopOut.propTypes = {
  data: PropTypes.shape({
    characteristics: PropTypes.shape({}),
    product_id: PropTypes.string,
  }),
  addUserReview: PropTypes.func,
  cancelAddReview: PropTypes.func,
};
PopOut.defaultProps = {
  data: { characteristics: {}, product_id: '25711' },
  addUserReview: () => 1,
  cancelAddReview: () => 1,
};
export default PopOut;
