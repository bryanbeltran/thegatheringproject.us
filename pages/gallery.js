import { useState, useEffect } from 'react';

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/gallery/images.json')
      .then(res => res.json())
      .then(data => {
        setImages(data.images);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading images:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>Gallery</h1>
      <div className="section card">
        <h2>Friends of Friends (FoF)</h2>
        <p>Friends of Friends is our community that curates gatherings to cultivate authentic connection and belonging. We partner with local venues, brands, and mission-aligned organizations to design experiences that foster lasting relationships and amplify connections.</p>
      </div>

      <div className="section card">
        <h2>Host Partners</h2>
        <ul>
          <li>Bichota Coffee</li>
          <li>Amore Coffee</li>
          <li>BackStory Coffee</li>
        </ul>
      </div>

      <div className="section card">
        <h2>Gathering Highlights</h2>
        <ul>
          <li>Small, intentionally sized gatherings—introductions feel effortless. Show up as you are.</li>
          <li>Curated/shared experiences including a warm welcome, thoughtful prompts, or activities to spark real connections.</li>
          <li>Pop-up gatherings in local gems: cafes, bookstores, and cozy community spaces—spaces that make you want to stay a little longer.</li>
        </ul>
      </div>

      <div className="section">
        <h2>Event Photos</h2>
        {loading ? (
          <p>Loading gallery...</p>
        ) : images.length > 0 ? (
          <div className="gallery-grid">
            {images.map((imagePath, index) => {
              return (
                <div key={index} className="gallery-item">
                  <img
                    src={imagePath}
                    alt={`Friends of Friends gathering ${index + 1}`}
                    className="gallery-image"
                    loading="lazy"
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <p>No images found.</p>
        )}
      </div>
    </div>
  );
}