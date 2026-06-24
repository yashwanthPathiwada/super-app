import axios from 'axios';

const BASE_URL = 'https://newsapi.org/v2/top-headlines';
const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

export const fetchTopHeadlines = async (category = 'general') => {
  if (!API_KEY) {
    throw new Error('Missing VITE_NEWS_API_KEY in your .env file');
  }

  const response = await axios.get(BASE_URL, {
    params: {
      category,
      language: 'en',
      country: 'us',
      pageSize: 10,
      apiKey: API_KEY,
    },
  });

  const articles = response.data.articles || [];

  return articles
    .filter((article) => article.title && article.title !== '[Removed]')
    .map((article, index) => ({
      id: `${index}-${article.publishedAt}`,
      title: article.title,
      description: article.description || 'No description available.',
      image: article.urlToImage,
      url: article.url,
      source: article.source?.name || 'Unknown',
    }));
};
