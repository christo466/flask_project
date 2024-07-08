import axios from 'axios';
const url = import.meta.env.VITE_API_URL

const instance = axios.create({
    baseURL: url
  });

export const postData = () => {
    return instance.get('/users').then(
      (res) => {
       
        return res;
      },
      (error) => {
        console.log(error, "Error !!!");
      },
    );
  };



