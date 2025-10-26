import axios from "axios";

// saved and update user in db
export const savedUserInDb =async (user)=>{
    const {data} =await axios.post(`${import.meta.env.VITE_API_URL}/users`,user);
    console.log('user data',data);
    
}
