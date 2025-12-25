import Head from 'next/head';

export default function Privacy() {
  return (
    <div>
      <Head>
        <title>Privacy Policy - The Gathering Project</title>
        <meta name="description" content="Privacy Policy for The Gathering Project" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://thegatheringproject.us/privacy" />
        <meta property="og:title" content="Privacy Policy - The Gathering Project" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://thegatheringproject.us/privacy" />
        <meta name="twitter:title" content="Privacy Policy - The Gathering Project" />
      </Head>
      
      <h1>Privacy Policy</h1>
      
      <section className="section card">
        <p><strong>Last updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        
        <h2>Information We Collect</h2>
        <p>This website collects limited personal information through its contact form, including:</p>
        <ul>
          <li>Name</li>
          <li>Email address</li>
          <li>Message content</li>
        </ul>
        
        <h2>How We Use Your Information</h2>
        <p>This information is used solely to respond to inquiries about Friends of Friends (FoF) gatherings and The Gathering Project. We do not sell, share, or use your information for any other purpose.</p>
        
        <h2>Data Retention</h2>
        <p>Messages are retained only as long as necessary to respond to your inquiry and handle follow-up communications.</p>
        
        <h2>Contact Us</h2>
        <p>For questions about this privacy policy or to request deletion of your information, please contact us at <a href="mailto:aziz.abdulrahmane@gmail.com">aziz.abdulrahmane@gmail.com</a>.</p>
      </section>
    </div>
  );
}

