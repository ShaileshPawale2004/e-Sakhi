import React, { useEffect, useState } from 'react';
import { fetchPDFResources } from '../utils/fetchPDFs';
import "../styles/Dashboard.css";

const Resources = () => {
  const [query, setQuery] = useState('Rural Women Empowerment');
  const [pdfs, setPDFs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const results = await fetchPDFResources(query);
      setPDFs(results);
    } catch (err) {
      setError('Something went wrong while fetching PDFs.');
    }
    setLoading(false);
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard-content">
        <div className="resource-search" style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
          <h2 style={{ textAlign: 'center', color: 'white', fontSize: '2rem', marginBottom: '1.5rem' }}>
            🔍 Search Learning PDFs for Rural Girls
          </h2>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="E.g., financial literacy, self-help group, government scheme"
              style={{
                flexGrow: 1,
                padding: '0.75rem',
                fontSize: '1rem',
                borderRadius: '6px',
                background: 'rgba(255,255,255,0.1)',
                color: 'white',
                border: 'none',
                backdropFilter: 'blur(5px)'
              }}
            />
            <button
              onClick={handleSearch}
              style={{
                padding: '0.75rem 1.25rem',
                backgroundColor: '#38A169',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Search
            </button>
          </div>

          {loading && <p style={{ color: 'white' }}>Loading...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
            {pdfs.map((item, index) => (
              <div key={index} style={{
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '12px',
                padding: '1.25rem',
                backdropFilter: 'blur(8px)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.2)',
              }}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: '1.1rem', color: '#90cdf4', fontWeight: 'bold' }}
                >
                  {item.title}
                </a>
                <p style={{ marginTop: '0.5rem', fontSize: '0.95rem', color: 'rgba(255,255,255,0.9)' }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;