import axios from 'axios';

export const getShopeData = (data,succesCB,handleError) => {
    
    const url = `${import.meta.env.VITE_SHOPE_BASE_URL}/product` 
    return (
        axios.post(url,data).then(
            
            (res)=>{
                
                succesCB()
                return res.data;
            },
            (error)=>{
               
                handleError(error.response.data)
                
            }
        ))    
}





      

