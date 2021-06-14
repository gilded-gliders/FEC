import axios from 'axios';

export default function reviewsGET(string, id, count, sort, setState, checkLoading) {
  axios.get('/get', {
    params: {
      endpoint: `${string}/?product_id=${id}&count=${count}&sort=${sort}`,
    },
  })
    .then((res) => {
      const arr = res.data.results;
      setState(arr);
      checkLoading(true);
      console.log(arr);
    })
    .catch((err) => console.log);
};