import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'Our Gatherings' },
  { href: '/contact', label: 'Contact Us' },
];

function Navbar() {
  const router = useRouter();
  return (
    <nav aria-label="Main navigation">
      <div className="navbar-inner">
        <Link href="/" className="nav-title" aria-label="The Gathering Project - Home">
          <Image 
            src="/logos/fof-logo.png" 
            alt="Friends of Friends logo" 
            width={32}
            height={32}
            className="nav-logo"
            priority
          />
          <span className="nav-title-text">The Gathering Project</span>
        </Link>
        <div className="nav-links">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={router.pathname === link.href ? 'active' : ''}
              aria-current={router.pathname === link.href ? 'page' : undefined}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer role="contentinfo">
      <div>© {new Date().getFullYear()} The Gathering Project. All rights reserved.</div>
      <div>
        Contact: <a href="mailto:aziz.abdulrahmane@gmail.com">aziz.abdulrahmane@gmail.com</a>
      </div>
      <div>
        <Link href="/privacy">Privacy Policy</Link>
      </div>
    </footer>
  );
}

export default function Layout({ children }) {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Navbar />
      <div className="site-container" id="main-content">
        {children}
      </div>
      <Footer />
    </>
  );
}
