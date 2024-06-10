import axios from "axios";

 export const getCities = async (params) => {
    let { count, search , skip} = params
  try {
    const options = {
      method: 'GET',
      url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
      params: {countryIds: 'IN', namePrefix: 'del', limit: count, skip:skip},
      headers: {
        'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
        'x-rapidapi-key': '858a5e45bemshd717af94de69f1cp1978a1jsned22a96b493f' // get key from https://rapidapi.com/wirefreethought/api/geodb-cities/
      }
    };

    const response = await axios.request(options);
    // console.log(response,'............rew')
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch cities.");
  }
};

