import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon, Monitor, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Add a slight shadow/border when scrolled down
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Support', path: '/support' }
  ];

  return (
    <nav className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 w-[95%] md:w-[90%] max-w-6xl z-[100] transition-all duration-300">

      {/* Floating Pill Container with Glassmorphism */}
      <div className={`px-5 py-3 md:px-6 md:py-3.5 rounded-full flex justify-between items-center transition-all duration-300 ${scrolled
        ? 'bg-[var(--bg-main)]/60 backdrop-blur-2xl border border-[var(--border-primary)] shadow-[var(--shadow-premium)]'
        : 'bg-[var(--bg-card)]/40 backdrop-blur-xl border border-[var(--border-primary)] shadow-lg'
        }`}>

        {/* Logo (Left) */}
        <Link to="/" className="flex items-center flex-shrink-0">
          <img
            src="https://placehold.co/120x32/387ed1/ffffff?text=Logo"
            alt="Logo"
            className="h-8 md:h-9 w-auto rounded-md object-contain"
          />
        </Link>

        {/* Desktop Navigation Links (Center) */}
        <div className="hidden md:flex items-center justify-center flex-grow space-x-1 lg:space-x-8 px-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`px-3 py-1.5 rounded-full text-[15px] font-medium transition-colors duration-200 ${location.pathname === link.path
                ? 'text-[color:var(--accent-primary)] bg-[color:var(--accent-primary)]/10'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]'
                }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Actions: Theme Toggles & CTA Button */}
        <div className="flex items-center space-x-3 md:space-x-4 flex-shrink-0">

          {/* Theme Toggle Wrapper */}
          <div className="hidden sm:flex items-center bg-[var(--bg-secondary)]/50 rounded-full p-1 border border-[var(--border-primary)] backdrop-blur-sm">
            <button
              onClick={() => setTheme('light')}
              className={`p-1.5 rounded-full flex items-center justify-center transition-all ${theme === 'light'
                ? 'bg-[var(--bg-card)] text-[#387ed1] shadow-sm'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              title="Light Mode"
            >
              <Sun size={16} />
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`p-1.5 rounded-full flex items-center justify-center transition-all ${theme === 'dark'
                ? 'bg-[var(--bg-card)] text-[#387ed1] shadow-sm'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              title="Dark Mode"
            >
              <Moon size={16} />
            </button>
            <button
              onClick={() => setTheme('system')}
              className={`p-1.5 rounded-full flex items-center justify-center transition-all ${theme === 'system'
                ? 'bg-[var(--bg-card)] text-[#387ed1] shadow-sm'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              title="System Theme"
            >
              <Monitor size={16} />
            </button>
          </div>

          {/* Call to Action Button (Replacing the plain text Signup link to match the reference image) */}
          <Link
            to="/signup"
            className="hidden md:inline-flex items-center justify-center px-6 py-2 rounded-full text-[15px] font-medium text-[#ffffff] bg-[var(--accent-primary)] hover:opacity-90 shadow-[var(--shadow-accent)] border border-[#5c6bc0] transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Sign up
          </Link>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] bg-[var(--bg-secondary)]/50 p-2 rounded-full focus:outline-none transition-colors border border-[var(--border-primary)]"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-[110%] left-0 w-full mt-2 bg-[var(--bg-card)]/95 backdrop-blur-xl border border-[var(--border-primary)] rounded-3xl shadow-[var(--shadow-premium)] overflow-hidden transition-all origin-top animate-down">
          <div className="p-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={toggleMobileMenu}
                className={`block px-4 py-3 rounded-xl font-medium text-base transition-colors duration-200 ${location.pathname === link.path
                  ? 'text-[color:var(--accent-primary)] bg-[color:var(--accent-primary)]/10'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]'
                  }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-2 pb-1 px-4">
              <div className="h-px w-full bg-[var(--border-primary)] mb-3"></div>
            </div>

            <Link
              to="/signup"
              onClick={toggleMobileMenu}
              className="block w-full text-center px-4 py-3 rounded-xl font-medium text-base text-[#ffffff] bg-[var(--accent-primary)] hover:opacity-90 transition-opacity shadow-[var(--shadow-accent)] border border-[#5c6bc0]"
            >
              Sign up
            </Link>

            {/* Mobile Theme Toggles */}
            <div className="flex items-center justify-center gap-4 mt-4 py-2">
              <button onClick={() => { setTheme('light'); toggleMobileMenu() }} className={`p-2 rounded-full border border-[var(--border-primary)] ${theme === 'light' ? 'bg-[var(--bg-card)] text-[#387ed1]' : 'text-[var(--text-muted)]'}`}><Sun size={20} /></button>
              <button onClick={() => { setTheme('dark'); toggleMobileMenu() }} className={`p-2 rounded-full border border-[var(--border-primary)] ${theme === 'dark' ? 'bg-[var(--bg-card)] text-[#387ed1]' : 'text-[var(--text-muted)]'}`}><Moon size={20} /></button>
              <button onClick={() => { setTheme('system'); toggleMobileMenu() }} className={`p-2 rounded-full border border-[var(--border-primary)] ${theme === 'system' ? 'bg-[var(--bg-card)] text-[#387ed1]' : 'text-[var(--text-muted)]'}`}><Monitor size={20} /></button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;