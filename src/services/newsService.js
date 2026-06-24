import axios from 'axios';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

export const fetchTopHeadlines = async () => {
  try {
    if (!API_KEY) {
      throw new Error('Missing VITE_NEWS_API_KEY in your .env file');
    }

    const response = await axios.get(
      'https://gnews.io/api/v4/top-headlines',
      {
        params: {
          category: 'general',
          lang: 'en',
          max: 10,
          apikey: API_KEY,
        },
      }
    );

    const articles = response.data.articles || [];

    return articles.map((article, index) => ({
      id: `${index}-${article.publishedAt}`,
      title: article.title,
      description: article.description || 'No description available.',
      image: article.image,
      url: article.url,
      source: article.source?.name || 'Unknown',
    }));
  } catch (error) {
    if (error.response?.status === 429) {
      throw new Error(
        'News service is temporarily busy. Please try again in a moment.'
      );
    }

    throw new Error('Unable to load news.');
  }
};