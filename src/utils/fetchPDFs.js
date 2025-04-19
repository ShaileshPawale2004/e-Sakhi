// src/utils/fetchPDFs.js
import axios from 'axios';

export const fetchPDFResources = async (searchTerm) => {
  const options = {
    method: 'GET',
    url: 'https://duckduckgo-search-engine-results-api.p.rapidapi.com/',
    params: { q: `${searchTerm} pdf` },
    headers: {
      'x-rapidapi-key': 'c7b286dce7mshde3a3d7c58f8770p1f2209jsnb434cdf19c25', // Replace with your RapidAPI key
      'x-rapidapi-host': 'duckduckgo-search-engine-results-api.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    const results = response.data.results || [];

    return results.map((item) => ({
      title: item.title?.replace(/<[^>]+>/g, ''), // clean any HTML tags
      url: item.url,
      description: item.description || '',
    }));
  } catch (err) {
    console.error('❌ Error fetching PDFs from DuckDuckGo:', err);
    return [];
  }
};
