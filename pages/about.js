import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';

export default function About() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const lastFocusedElementRef = useRef(null);
  const lightboxCloseRef = useRef(null);
  const lightboxPrevRef = useRef(null);
  const lightboxNextRef = useRef(null);

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
        e.preventDefault();
        closeLightbox();
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
      } else if (e.key === 'Tab') {
        // Focus trap: keep focus within lightbox
        const focusableElements = [
          lightboxCloseRef.current,
          lightboxPrevRef.current,
          lightboxNextRef.current
        ].filter(el => el !== null);
        
        if (focusableElements.length === 0) return;
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, selectedIndex, images]);

  // Focus management when lightbox opens
  useEffect(() => {
    if (selectedImage && lightboxCloseRef.current) {
      // Focus the close button when lightbox opens
      setTimeout(() => {
        lightboxCloseRef.current?.focus();
      }, 100);
    }
  }, [selectedImage]);

  const openLightbox = (imagePath, index, event) => {
    // Store the element that triggered the lightbox
    if (event && event.currentTarget) {
      lastFocusedElementRef.current = event.currentTarget;
    } else {
      lastFocusedElementRef.current = document.activeElement;
    }
    setSelectedImage(imagePath);
    setSelectedIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
    // Restore focus to the element that opened the lightbox
    setTimeout(() => {
      if (lastFocusedElementRef.current && typeof lastFocusedElementRef.current.focus === 'function') {
        lastFocusedElementRef.current.focus();
        lastFocusedElementRef.current = null;
      }
    }, 100);
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
        <title>Our Gatherings - The Gathering Project</title>
        <meta name="description" content="Learn about Friends of Friends (FoF) gatherings and our host partners" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://thegatheringproject.us/about" />
        <meta property="og:title" content="Our Gatherings - The Gathering Project" />
        <meta property="og:description" content="Learn about Friends of Friends (FoF) gatherings and our host partners" />
        <meta property="og:image" content="https://thegatheringproject.us/gallery/image (3).png" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://thegatheringproject.us/about" />
        <meta name="twitter:title" content="Our Gatherings - The Gathering Project" />
        <meta name="twitter:description" content="Learn about Friends of Friends (FoF) gatherings and our host partners" />
        <meta name="twitter:image" content="https://thegatheringproject.us/gallery/image (3).png" />
      </Head>
      <h1>Our Gatherings</h1>

      <section className="section card">
        <p>Friends of Friends (FoF) is our curated monthly gatherings intentionally designed to cultivate authentic connection and belonging. We invite friends and friends-of-friends to gather, play, and deepen trust in our community. Our Host-Partners are local venues, brands, and mission-aligned organizations that co-design our gathering experiences to amplify and foster lasting relationships.</p>
      </section>

      <section className="section card">
        <h2>Host-Partners</h2>
        <div className="host-partners">
          <div className="host-partner">
            <div className="host-partner-logo">
              <Image 
                src="/logos/bichota-logo.png" 
                alt="Bichota Coffee logo" 
                width={120}
                height={120}
                className="host-partner-logo-image"
              />
            </div>
            <div className="host-partner-name">Bichota Coffee</div>
          </div>
          <div className="host-partner">
            <div className="host-partner-logo">
              <Image 
                src="/logos/amore-logo.jpg" 
                alt="Amore Coffee logo" 
                width={120}
                height={120}
                className="host-partner-logo-image"
              />
            </div>
            <div className="host-partner-name">Amore Coffee</div>
          </div>
          <div className="host-partner">
            <div className="host-partner-logo">
              <Image 
                src="/logos/backstory-logo.png" 
                alt="BackStory Coffee logo" 
                width={120}
                height={120}
                className="host-partner-logo-image"
              />
            </div>
            <div className="host-partner-name">BackStory Coffee</div>
          </div>
        </div>
      </section>

      <section className="section card">
        <h2>What to Expect / How FoF Works</h2>
        <div className="expect-sections">
          <div className="expect-item">
            <h3>Gathering-Focused</h3>
            <p>We have Small, intentionally sized gatherings, where introductions feel effortless — show up as you are.</p>
          </div>
          <div className="expect-item">
            <h3>Curated/Shared Experiences</h3>
            <p>A warm welcome, a few thoughtful prompts, and/or an activity to spark real connections.</p>
          </div>
          <div className="expect-item">
            <h3>Community Spaces</h3>
            <p>We pop up in local gems, cafes, bookstores, and cozy community spaces; expect space that makes you want to stay a little longer.</p>
          </div>
        </div>
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
                  onClick={(e) => openLightbox(imagePath, index, e)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openLightbox(imagePath, index, e);
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
          aria-label={`Image lightbox: Viewing image ${selectedIndex + 1} of ${images.length}`}
        >
          <button 
            ref={lightboxCloseRef}
            className="lightbox-close"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            ×
          </button>
          <button 
            ref={lightboxPrevRef}
            className="lightbox-nav lightbox-prev"
            onClick={goToPrevious}
            aria-label="Previous image"
          >
            ‹
          </button>
          <button 
            ref={lightboxNextRef}
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
            <div className="lightbox-counter" aria-hidden="true">
              {selectedIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}