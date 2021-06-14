class PopOut extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product_id: '',
      characteristics: '',
      rating: 1,
      summary: '',
      body: '',
      recommend: true,
      name: '',
      email: '',
      photos: [],
      warning: [],
    };
    this.upDate = this.upDate.bind(this);
    this.targetChange = this.targetChange.bind(this);
    this.checkReview = this.checkReview.bind(this);
    this.loaded = this.loaded.bind(this);
    this.starCK = this.starCK.bind(this);
    this.showWarning = this.showWarning.bind(this);
  }

  componentDidMount() {
    const { data } = this.props;
    this.upDate(data);
  }

  componentDidUpdate(prevProps) {
    // {} should never === {};
    const { data } = this.props;
    if (prevProps !== this.props) {
      this.upDate(data);
    }
  }

  upDate(data) {
    this.setState({
      characteristics: data.characteristics,
      product_id: data.product_id,
    });
  }

  targetChange(event) {
    const { id, value } = event.target;
    const { photos } = this.state;
    const arr = [...photos];
    if (id === 'recommend') {
      if (value === 'false') {
        this.setState({
          recommend: false,
        });
      } else {
        this.setState({
          recommend: true,
        });
      }
    } else if (id === 'photos') {
      if (value !== undefined) {
        arr.push(String(value));
        this.setState({
          [id]: arr,
        });
      }
    } else {
      this.setState({
        [id]: value,
      });
    }
  }

  checkReview() {
    const { addReview } = this.props;
    const {
      body,
      email,
      name,
      summary,
    } = this.state;
    const waring = [];
    if (body.length < 50) { waring.push('Description'); }
    if (!email.includes('@')) { waring.push('Email'); }
    if (name.length === 0) { waring.push('Name'); }
    if (summary.length === 0) { waring.push('Title'); }
    if (waring.length > 0) {
      this.setState({
        warning: waring,
      });
    } else {
      // POST
      console.log();
      this.props.cancel();
      addReview(this.state);
    }
  }

  starCK(event) {
    const { characteristics, rating } = this.state;
    const obj = { ...characteristics };
    const key = event.target.name;
    const value = event.target.id;
    if (event.target.name === 'Stars') {
      this.setState({
        rating: Number(rating) + Number(value),
      });
    } else {
      obj[key].value = Number(obj[key].value) + Number(value);
      this.setState({
        characteristics: obj,
      });
    }
  }

  showWarning() {
    this.setState({
      warning: [],
    });
  }

  loaded() {
    const { cancel } = this.props;
    const {
      recommend,
      characteristics,
      body,
      rating,
      warning,
    } = this.state;
    return (
      <div>
        {warning.length !== 0
          ? (
            <Warning
              data-testid="warning"
              warningItems={warning}
              show={this.showWarning}
            />
          ) : null}
        <div className="popOutContainer">
          <div className="topContainer">
            <button
              className="formButton"
              type="button"
              onClick={cancel}
            >
              X
            </button>
          </div>
          <div className="firstContainer">
            <div className="firstTopContainer">
              <div className="topSmallContainer">
                <div>Recommend</div>
                <div className="buttonBase">
                  <button
                    type="button"
                    onClick={this.targetChange}
                    className={recommend
                      ? 'clickedButton'
                      : 'unclickedButton'}
                    id="recommend"
                    value="true"
                  >
                    YES
                  </button>
                  <button
                    type="button"
                    onClick={this.targetChange}
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
              <FormStarCK
                starCK={this.starCK}
                info={rating}
                name="Stars"
              />
              {Object.keys(characteristics).map((i) => (
                <FormStarCK
                  starCK={this.starCK}
                  key={i}
                  info={characteristics[i].value}
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
                        onChange={this.targetChange}
                        placeholder={textExample[index]}
                        id={i}
                      />
                      {this.state[i].length === 0 || msg[index] === undefined
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
                  onChange={this.targetChange}
                  placeholder={textExample[3]}
                />
              </div>
            </div>
          </div>
          <div className="btnContainer">
            <button
              type="button"
              className="clickedButton"
              onClick={this.checkReview}
            >
              Submit
            </button>
            <input
              className="clickedButton"
              type="file"
              key="photo1"
              onChange={this.targetChange}
              id="photos"
            />
            <input
              className="clickedButton"
              type="file"
              key="photo2"
              onChange={this.targetChange}
              id="photos"
            />
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div
        className="popOut"
        data-testid="popout"
      >
        {this.loaded()}
      </div>
    );
  }
}

PopOut.propTypes = {
  data: PropTypes.shape({ proudce_id: PropTypes.number }),
  cancel: PropTypes.func,
  addReview: PropTypes.func,
};

PopOut.defaultProps = {
  addReview: () => (1),
  data: {},
  cancel: () => (1),
};