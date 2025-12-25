import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Head>
        <title>The Gathering Project - Home</title>
        <meta name="description" content="The Gathering Project - Creating spaces where everyone belongs" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://thegatheringproject.us/" />
        <meta property="og:title" content="The Gathering Project - Creating spaces where everyone belongs" />
        <meta property="og:description" content="The Gathering Project - Creating spaces where everyone belongs" />
        <meta property="og:image" content="https://thegatheringproject.us/gallery/image (3).png" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://thegatheringproject.us/" />
        <meta name="twitter:title" content="The Gathering Project - Creating spaces where everyone belongs" />
        <meta name="twitter:description" content="The Gathering Project - Creating spaces where everyone belongs" />
        <meta name="twitter:image" content="https://thegatheringproject.us/gallery/image (3).png" />
      </Head>
      <div className="hero">
        <h1>Friends of Friends</h1>
        <p className="tagline">We are gathering community and inviting you to Belong!</p>
        <div className="hero-image-container">
          <Image 
            src="/gallery/image (3).png" 
            alt="Community members gathered together at a Friends of Friends event, representing connection and belonging" 
            className="hero-image"
            width={1800}
            height={1200}
            priority
            quality={90}
          />
        </div>
      </div>
      <main>
        <section className="section card">
          <h2>Our Why</h2>
          <p>In a world where people feel increasingly disconnected, we believe belonging shouldn't be rare or conditional. We connect our friends with your friends to spark real connection and deepen belonging in the places that shape our communities.</p>
        </section>
        <section className="section card">
          <h2>Our What</h2>
          <p>A gathering series centered on fostering belonging through shared experiences: We host gatherings that make it easy for people to meet and connect deeply. We partner with mission-aligned partners, venues, organizations, brands and communities to create spaces where connection thrive.</p>
        </section>
        <section className="section card">
          <h2>Our Approach</h2>
          <p>We bring people together through gatherings that spark genuine relationships and build community trust: Guided by our values of Community Play and Catalyzing Space, we host gatherings that turn friends into community and communities into resources.</p>
        </section>
        <section className="section">
          <div className="home-images-row">
            <Image src="/home-image-2.png" alt="People connecting at a Friends of Friends gathering" className="home-image" width={400} height={300} quality={85} />
            <Image src="/home-image-3.png" alt="Community members engaging in conversation at a gathering" className="home-image" width={400} height={300} quality={85} />
            <Image src="/home-image-4.png" alt="Group activity during a Friends of Friends event" className="home-image" width={400} height={300} quality={85} />
            <Image src="/home-image-5.png" alt="Community gathering fostering connection and belonging" className="home-image" width={400} height={300} quality={85} />
          </div>
        </section>
      </main>
    </>
  );
}

