export const exerciseOptions = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
};

export const youtubeOptions = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': '235a11fae0msh5722feb5ddca71ep1313f4jsnd76c065ebc60', // Still needed for YouTube
    'x-rapidapi-host': "youtube-search-and-download.p.rapidapi.com"
  }
};

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const fetchData = async (url, options) => {
  // If it's a relative URL, prepend the backend base URL
  const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;
  
  const res = await fetch(fullUrl, options);
  const data = await res.json();

  return data;
};
  