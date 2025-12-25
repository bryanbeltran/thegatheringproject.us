import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      // Success
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (error) {
      setSubmitError(error.message || 'An error occurred. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Head>
        <title>Contact Us - The Gathering Project</title>
        <meta name="description" content="Get in touch with The Gathering Project" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://thegatheringproject.us/contact" />
        <meta property="og:title" content="Contact Us - The Gathering Project" />
        <meta property="og:description" content="Get in touch with The Gathering Project" />
        <meta property="og:image" content="https://thegatheringproject.us/gallery/image (3).png" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://thegatheringproject.us/contact" />
        <meta name="twitter:title" content="Contact Us - The Gathering Project" />
        <meta name="twitter:description" content="Get in touch with The Gathering Project" />
        <meta name="twitter:image" content="https://thegatheringproject.us/gallery/image (3).png" />
      </Head>
      <h1>Contact Us</h1>
      
      <section className="section card">
        <p>Have a question or want to get involved? Reach out to us using the form below, or email us directly at <a href="mailto:aziz.abdulrahmane@gmail.com">aziz.abdulrahmane@gmail.com</a>.</p>
      </section>

      <section className="section card">
        <h2>Send us a message</h2>
        {submitted ? (
          <div className="form-success" role="status" aria-live="polite" aria-atomic="true">
            <p>Thank you for your message! We'll get back to you soon.</p>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            {submitError && (
              <div className="form-error" role="alert" aria-live="assertive">
                <p>{submitError}</p>
              </div>
            )}
            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'error' : ''}
                aria-invalid={errors.name ? 'true' : 'false'}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && <span className="error-message" id="name-error" role="alert" aria-live="polite">{errors.name}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && <span className="error-message" id="email-error" role="alert" aria-live="polite">{errors.email}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="6"
                className={errors.message ? 'error' : ''}
                aria-invalid={errors.message ? 'true' : 'false'}
                aria-describedby={errors.message ? 'message-error' : undefined}
              ></textarea>
              {errors.message && <span className="error-message" id="message-error" role="alert" aria-live="polite">{errors.message}</span>}
            </div>
            <button 
              type="submit" 
              className="submit-button" 
              disabled={isSubmitting}
              aria-busy={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
            <p style={{ fontSize: '0.875rem', color: '#666', marginTop: '1rem' }}>
              By submitting this form, you agree to our <a href="/privacy">Privacy Policy</a>.
            </p>
          </form>
        )}
      </section>
    </div>
  );
}

