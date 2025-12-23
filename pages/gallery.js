import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    let isMounted = true;
    
    fetch('/gallery/images.json')
      .then(res => {
        if (!res.ok) {
          throw new Error(`Failed to load gallery: ${res.status} ${res.statusText}`);
        }
        return res.json();
      })
      .then(data => {
        if (isMounted) {
          if (data.images && Array.isArray(data.images)) {
            setImages(data.images);
            setError(null);
          } else {
            throw new Error('Invalid image data format');
          }
          setLoading(false);
        }
      })
      .catch(err => {
        console.error('Error loading images:', err);
        if (isMounted) {
          setError(err.message || 'Failed to load gallery images. Please try refreshing the page.');
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImage === null) return;
      
      if (e.key === 'Escape') {
        setSelectedImage(null);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const prevIndex = selectedIndex > 0 ? selectedIndex - 1 : images.length - 1;
        setSelectedIndex(prevIndex);
        setSelectedImage(images[prevIndex]);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        const nextIndex = selectedIndex < images.length - 1 ? selectedIndex + 1 : 0;
        setSelectedIndex(nextIndex);
        setSelectedImage(images[nextIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, selectedIndex, images]);

  const openLightbox = (imagePath, index) => {
    setSelectedImage(imagePath);
    setSelectedIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const goToPrevious = (e) => {
    e.stopPropagation();
    const prevIndex = selectedIndex > 0 ? selectedIndex - 1 : images.length - 1;
    setSelectedIndex(prevIndex);
    setSelectedImage(images[prevIndex]);
  };

  const goToNext = (e) => {
    e.stopPropagation();
    const nextIndex = selectedIndex < images.length - 1 ? selectedIndex + 1 : 0;
    setSelectedIndex(nextIndex);
    setSelectedImage(images[nextIndex]);
  };

  return (
    <div>
      <Head>
        <title>Gallery - The Gathering Project</title>
        <meta name="description" content="Photos from Friends of Friends gatherings and events" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://thegatheringproject.us/gallery" />
        <meta property="og:title" content="Gallery - The Gathering Project" />
        <meta property="og:description" content="Photos from Friends of Friends gatherings and events" />
        <meta property="og:image" content="https://thegatheringproject.us/gallery/FoF-01.jpg" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://thegatheringproject.us/gallery" />
        <meta name="twitter:title" content="Gallery - The Gathering Project" />
        <meta name="twitter:description" content="Photos from Friends of Friends gatherings and events" />
        <meta name="twitter:image" content="https://thegatheringproject.us/gallery/FoF-01.jpg" />
      </Head>
      <h1>Gallery</h1>
      <section className="section card">
        <h2>Friends of Friends (FoF)</h2>
        <p>Friends of Friends is our community that curates gatherings to cultivate authentic connection and belonging. We partner with local venues, brands, and mission-aligned organizations to design experiences that foster lasting relationships and amplify connections.</p>
      </section>

      <section className="section card">
        <h2>Host Partners</h2>
        <ul>
          <li>Bichota Coffee</li>
          <li>Amore Coffee</li>
          <li>BackStory Coffee</li>
        </ul>
      </section>

      <section className="section card">
        <h2>Gathering Highlights</h2>
        <ul>
          <li>Small, intentionally sized gatherings—introductions feel effortless. Show up as you are.</li>
          <li>Curated/shared experiences including a warm welcome, thoughtful prompts, or activities to spark real connections.</li>
          <li>Pop-up gatherings in local gems: cafes, bookstores, and cozy community spaces—spaces that make you want to stay a little longer.</li>
        </ul>
      </section>

      <section className="section">
        <h2>Event Photos</h2>
        {loading ? (
          <div className="gallery-loading" aria-live="polite" aria-busy="true">
            <p>Loading gallery...</p>
          </div>
        ) : error ? (
          <div className="gallery-error" role="alert">
            <p><strong>Unable to load gallery</strong></p>
            <p>{error}</p>
            <button 
              onClick={() => {
                setError(null);
                setLoading(true);
                window.location.reload();
              }}
              className="retry-button"
            >
              Try Again
            </button>
          </div>
        ) : images.length > 0 ? (
          <div className="gallery-grid" role="list">
            {images.map((imagePath, index) => {
              const filename = imagePath.split('/').pop().replace(/\.(jpg|jpeg|png)$/i, '');
              // Extract meaningful description from filename if possible
              let altText = `Photo from Friends of Friends gathering`;
              if (filename.includes('FoF')) {
                altText = `Friends of Friends gathering event photo`;
              } else if (filename.includes('IMG_') || filename.includes('DSC')) {
                altText = `Event photo from gathering`;
              }
              
              return (
                <div 
                  key={index} 
                  className="gallery-item" 
                  role="listitem"
                  tabIndex={0}
                  aria-label={`${altText} ${index + 1} of ${images.length}`}
                  onClick={() => openLightbox(imagePath, index)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openLightbox(imagePath, index);
                    }
                  }}
                >
                  <Image
                    src={imagePath}
                    alt={altText}
                    className="gallery-image"
                    width={400}
                    height={300}
                    loading="lazy"
                    quality={85}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <p>No images found.</p>
        )}
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="lightbox-overlay" 
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <button 
            className="lightbox-close"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            ×
          </button>
          <button 
            className="lightbox-nav lightbox-prev"
            onClick={goToPrevious}
            aria-label="Previous image"
          >
            ‹
          </button>
          <button 
            className="lightbox-nav lightbox-next"
            onClick={goToNext}
            aria-label="Next image"
          >
            ›
          </button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage}
              alt={`Gallery image ${selectedIndex + 1} of ${images.length}`}
              className="lightbox-image"
            />
            <div className="lightbox-counter">
              {selectedIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}