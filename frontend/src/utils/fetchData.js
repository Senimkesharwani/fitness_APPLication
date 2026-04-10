export const exerciseOptions = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
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
  try {
    // If it's a relative URL, prepend the backend base URL
    const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;
    
    // 1. Check LocalStorage Cache for instant retrieval
    const cachedData = localStorage.getItem(fullUrl);
    if (cachedData) {
        console.log('Serving from LocalStorage:', fullUrl);
        return JSON.parse(cachedData);
    }

    // 2. Network Fetch with Browser-level Caching
    const res = await fetch(fullUrl, {
      ...options,
      cache: "force-cache"
    });

    const data = await res.json();

    // 3. Persist to LocalStorage for future instant loads
    if (data && !data.error) {
        localStorage.setItem(fullUrl, JSON.stringify(data));
    }

    return data;
  } catch (error) {
    console.error("Fetch Error:", error);
  }
};