import Head from 'next/head';

export default function About() {
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
            <div className="host-partner-logo">Bichota Coffee</div>
            <div className="host-partner-name">Bichota Coffee</div>
          </div>
          <div className="host-partner">
            <div className="host-partner-logo">Amore Coffee</div>
            <div className="host-partner-name">Amore Coffee</div>
          </div>
          <div className="host-partner">
            <div className="host-partner-logo">BackStory Coffee</div>
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
    </div>
  );
}