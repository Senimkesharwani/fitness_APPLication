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
  const rapidApiKey = process.env.REACT_APP_RAPID_API_KEY || '0c2319cff5mshe297e8ebc1ca216p18464fjsn860f0ff8df34';

  try {
    // If it's a relative URL, prepend the backend base URL
    let fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;
    
    // 🏷️ Cache Versioning: Force refresh with definitive limit v1324_fixed
    if (url.includes('rapidapi.com')) {
        fullUrl += fullUrl.includes('?') ? '&v=1324_fixed' : '?v=1324_fixed';
    }
    
    // 🔍 Diagnostics
    if (url.includes('rapidapi.com')) {
        console.log(`[Diagnostic] API Call to: ${url}`);
        console.log(`[Diagnostic] API Key status: ${rapidApiKey ? 'Loaded' : 'MISSING'}`);
    }

    // 1. Check LocalStorage Cache for instant retrieval
    const cachedData = localStorage.getItem(fullUrl);
    if (cachedData) {
        const parsed = JSON.parse(cachedData);
        // Only return if it's actual data, not an empty array or error
        if (Array.isArray(parsed) && parsed.length > 0) {
            console.log('Serving from LocalStorage:', fullUrl);
            return parsed;
        }
    }

    // 2. Network Fetch with Key Reliability & Browser-level Caching
    const res = await fetch(fullUrl, {
      ...options,
      headers: {
        ...options.headers,
        'x-rapidapi-key': options.headers?.['x-rapidapi-key'] || rapidApiKey
      },
      cache: "force-cache"
    });

    const data = await res.json();

    // 3. Persist to LocalStorage only if data is valid
    if (data && !data.error && Array.isArray(data) && data.length > 0) {
        localStorage.setItem(fullUrl, JSON.stringify(data));
    }

    return data;
  } catch (error) {
    console.error("Fetch Error:", error);
  }
};