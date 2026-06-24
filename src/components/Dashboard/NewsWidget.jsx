import { useEffect, useState, useCallback } from 'react';
import { fetchTopHeadlines } from '../../services/newsService';
import useInterval from '../../hooks/useInterval';
import Loader from '../common/Loader';
import ErrorMessage from '../common/ErrorMessage';
import { NEWS_ROTATE_INTERVAL_MS } from '../../utils/constants';

const NewsWidget = () => {
  const [articles, setArticles] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [paused, setPaused] = useState(false);

  const loadNews = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchTopHeadlines('general');
      setArticles(data);
      setActiveIndex(0);
    } catch (err) {
      setError(
        err?.response?.data?.message || err.message || 'Unable to fetch news'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNews();
  }, [loadNews]);

  useInterval(
    () => {
      if (articles.length > 0) {
        setActiveIndex((prev) => (prev + 1) % articles.length);
      }
    },
    !loading && !error && !paused && articles.length > 1 ? NEWS_ROTATE_INTERVAL_MS : null
  );

  const article = articles[activeIndex];

  return (
    <div
      className="rounded-xl border border-line bg-panel p-5 shadow-card"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold text-white">
          News
        </h3>
        {articles.length > 0 ? (
          <span className="text-xs text-muted">
            {activeIndex + 1}/{articles.length}
          </span>
        ) : null}
      </div>

      {loading && <Loader label="Fetching headlines..." />}
      {!loading && error && <ErrorMessage message={error} onRetry={loadNews} />}

      {!loading && !error && article && (
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          key={article.id}
          className="block animate-fadeIn"
        >
          <div className="mb-3 h-36 w-full overflow-hidden rounded-lg bg-panel2">
            {article.image ? (
              <img
                src={article.image}
                alt={article.title}
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xs text-muted">
                No image available
              </div>
            )}
          </div>
          <p className="line-clamp-2 text-sm font-semibold text-white">
            {article.title}
          </p>
          <p className="mt-1 line-clamp-2 text-xs text-muted">
            {article.description}
          </p>
          <p className="mt-2 text-[11px] font-medium text-accent">
            {article.source}
          </p>
        </a>
      )}

      {!loading && !error && articles.length === 0 && (
        <p className="text-sm text-muted">No headlines available right now.</p>
      )}

      {articles.length > 1 && (
        <div className="mt-3 flex justify-center gap-1.5">
          {articles.map((a, idx) => (
            <span
              key={a.id}
              className={`h-1.5 w-1.5 rounded-full transition-colors ${
                idx === activeIndex ? 'bg-accent' : 'bg-line'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsWidget;
