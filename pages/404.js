import Head from 'next/head';
import Link from 'next/link';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 - Page Not Found | The Gathering Project</title>
        <meta name="description" content="The page you're looking for doesn't exist." />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div style={{ textAlign: 'center', padding: '4rem 0' }}>
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you're looking for doesn't exist.</p>
        <p>
          <Link href="/">
            <a>Return to Home</a>
          </Link>
        </p>
      </div>
    </>
  );
}

