import Axios from 'axios'

const YOUR_APP_ID="2494a8b0";
const YOUR_APP_KEY="5267f58ed03a75a4cd6deb5292570d2d";


export const getRecipes = async (query) => {
    
    const url =`https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`;
    return await Axios.get(url);
};