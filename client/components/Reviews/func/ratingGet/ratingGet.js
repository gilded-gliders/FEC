import axios from 'axios';

export default function ratingGET(string, id, setState, checkLoading) {
  axios.get('/get', {
    params: {
      endpoint: `${string}/?product_id=${id}`,
    },
  })
    .then((res) => {
      setState(res.data);
      checkLoading(true);
      console.log(res.data, 's');
    })
    .catch((err) => console.log);
}
