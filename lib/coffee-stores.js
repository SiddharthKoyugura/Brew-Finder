import { createApi } from 'unsplash-js';

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
});

const getListOfCoffeeStorePhotos = async () => {
    const photos = await unsplash.search.getPhotos({
        query: 'coffee shop',
        page: 1,
        perPage: 30,
    });
    const unsplashResults = photos.response.results;
    return unsplashResults.map((result)=>result.urls['small']);
}


const getUrlForCoffeeStores = (latLong, query, limit) => {
    return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`
}

export const fetchCoffeeStores = async () => {
    const photos = await getListOfCoffeeStorePhotos();
    const options = {
    method: "GET",
    headers: {
        Accept: "application/json",
        Authorization: process.env.FOURSQUARE_API_KEY,
    },
  };

  const response = await fetch(getUrlForCoffeeStores('43.64990206482973%2C-79.38448035304708', "coffee", 6), options);
  const data = await response.json();
  return data.results.map((result, index)=>{
    return {
        id: result.fsq_id,
        name: result.name,
        address: result.location.address,
        neighborhood: result.location.cross_street,
        imgUrl: photos.length > 0? photos[index]:"https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
    }
  });
}