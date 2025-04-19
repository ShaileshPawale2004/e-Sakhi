// src/pages/ResourceSearch.jsx
import React, { useEffect, useState } from 'react';
import { fetchPDFResources } from '../utils/fetchPDFs';

const ResourceSearch = () => {
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

  // 🔁 Auto-trigger search on initial render
  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div className="resource-search" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h2>🔍 Search Learning PDFs for Rural Girls</h2>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="E.g., financial literacy, self-help group, government scheme"
          style={{ flexGrow: 1, padding: '0.5rem', fontSize: '1rem' }}
        />
        <button onClick={handleSearch} style={{ padding: '0.5rem 1rem' }}>Search</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
        {pdfs.map((item, index) => (
          <div key={index} style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px' }}>
            <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '1.1rem', color: '#0073e6', fontWeight: 'bold' }}>{item.title}</a>
            <p style={{ marginTop: '0.5rem', fontSize: '0.95rem' }}>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourceSearch;
