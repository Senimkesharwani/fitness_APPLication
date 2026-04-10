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
    let fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;
    
    // 🛡️ CORS Shield: Redirect RapidAPI calls through the backend proxy
    if (url.includes('exercisedb.p.rapidapi.com')) {
        const urlObj = new URL(url);
        const endpoint = urlObj.pathname;
        const limit = urlObj.searchParams.get('limit');
        
        // Rewrite to call our backend proxy
        fullUrl = `${BASE_URL}/exercises/rapidapi?url=${encodeURIComponent(endpoint)}${limit ? `&limit=${limit}` : ''}`;
        console.log(`[CORS Bypass] Routing through Proxy: ${fullUrl}`);
    }

    // 1. Check LocalStorage Cache with Size-Aware Validation
    const cachedData = localStorage.getItem(fullUrl);
    if (cachedData) {
        const parsed = JSON.parse(cachedData);
        
        // 🛡️ Integrity Check: If we requested a full library (limit=1324), ensure cache isn't just a partial scrap
        const isFullLibraryRequest = fullUrl.includes('limit=1324');
        const isCacheStatisticallyValid = !isFullLibraryRequest || (Array.isArray(parsed) && parsed.length > 1000);

        if (Array.isArray(parsed) && parsed.length > 0 && isCacheStatisticallyValid) {
            console.log(`Serving from LocalStorage: ${fullUrl.split('?')[0]} (${parsed.length} items)`);
            return parsed;
        } else if (isFullLibraryRequest && Array.isArray(parsed)) {
            console.warn(`[Diagnostic] Cache rejected for ${fullUrl}: only ${parsed.length} items found. Forcing fresh fetch.`);
        }
    }

    // 2. Network Fetch (Proxy-ready)
    const res = await fetch(fullUrl, {
      ...options,
      headers: {
        ...options.headers
      },
      cache: "default" // Let the proxy or browser handle caching as per standard
    });

    const data = await res.json();

    // 3. Persist to LocalStorage only if data is valid
    if (data && !data.error && Array.isArray(data) && data.length > 0) {
        localStorage.setItem(fullUrl, JSON.stringify(data));
    }

    return data;
  } catch (error) {
    console.error("Fetch Error:", error);
    return []; // Return safe empty array to prevent crashes
  }
};