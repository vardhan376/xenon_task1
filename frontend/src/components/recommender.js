import React, { useState, useEffect } from 'react';
const API_URL = 'https://jsonplaceholder.typicode.com/photos'; 

const PropertyRecommendation = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setProperties(data.slice(0, 5));
      } catch (err) {
        setError('Failed to fetch properties');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Error handling
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Recommended Properties</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {properties.map((property) => (
          <div
            key={property.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              margin: '10px',
              width: '200px',
              padding: '10px',
              textAlign: 'center',
            }}
          >
            <img
              src={property.url}
              alt={property.title}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '8px',
                marginBottom: '10px',
              }}
            />
            <h3>{property.title}</h3>
            <p>{property.albumId}</p> {/* You can display other details here */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyRecommendation;
