import Link from 'next/link';
import { useRouter } from 'next/router';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact Us' },
];

function Navbar() {
  const router = useRouter();
  return (
    <nav>
      <div className="navbar-inner">
        <span className="nav-title">The Gathering Project</span>
        <div className="nav-links">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={router.pathname === link.href ? 'active' : ''}
              aria-current={router.pathname === link.href ? 'page' : undefined}
              legacyBehavior
            >
              <a>{link.label}</a>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer>
      <div>© {new Date().getFullYear()} The Gathering Project. All rights reserved.</div>
      <div>Contact: <a href="mailto:aziz.abdulrahmane@gmail.com">aziz.abdulrahmane@gmail.com</a></div>
    </footer>
  );
}

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div className="site-container">
        {children}
      </div>
      <Footer />
    </>
  );
}
