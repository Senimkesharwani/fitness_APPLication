export const exerciseOptions = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY || '0c2319cff5mshe297e8ebc1ca216p18464fjsn860f0ff8df34',
    'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
  }
};

export const youtubeOptions = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY || '0c2319cff5mshe297e8ebc1ca216p18464fjsn860f0ff8df34', 
    'x-rapidapi-host': "youtube-search-and-download.p.rapidapi.com"
  }
};

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const fetchData = async (url, options) => {
  // If it's a relative URL, prepend the backend base URL
  const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;
  
  const res = await fetch(fullUrl, { ...options, cache: 'no-store' });
  const data = await res.json();

  return data;
};
  