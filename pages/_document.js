import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <Html lang="en">
      <Head>
        <meta name="theme-color" content="#0a0a0a" />
        <link rel="icon" href="/logos/fof-logo.png" type="image/png" />
        {gaId && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

