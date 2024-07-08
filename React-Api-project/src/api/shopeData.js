import axios from 'axios';

export const getData = () => {
    const url = `${import.meta.env.VITE_SHOPE_BASE_URL}/products` 
    return (
        axios.get(url, { timeout: 10000 }).then(
            (res)=>{
                return res;
            },
            (error) => {
                console.log(error, "Error !!!");
              }
        )
    )
      }


      
