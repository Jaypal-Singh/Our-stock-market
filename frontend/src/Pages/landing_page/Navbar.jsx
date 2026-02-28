import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon, Monitor, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="border-b border-[var(--border-primary)] py-4 bg-[var(--bg-card)] transition-colors duration-300 relative z-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="https://placehold.co/150x40/387ed1/ffffff?text=Dummy+Logo"
              alt="Dummy Logo"
              className="h-10 w-auto rounded"
            />
          </Link>

          {/* Desktop Navigation Links*/}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/signup" className="text-[var(--text-secondary)] hover:text-[#387ed1] font-medium text-base transition-colors duration-200">
              Signup
            </Link>
            <Link to="/about" className="text-[var(--text-secondary)] hover:text-[#387ed1] font-medium text-base transition-colors duration-200">
              About
            </Link>
            <Link to="/products" className="text-[var(--text-secondary)] hover:text-[#387ed1] font-medium text-base transition-colors duration-200">
              Products
            </Link>
            <Link to="/pricing" className="text-[var(--text-secondary)] hover:text-[#387ed1] font-medium text-base transition-colors duration-200">
              Pricing
            </Link>
            <Link to="/support" className="text-[var(--text-secondary)] hover:text-[#387ed1] font-medium text-base transition-colors duration-200">
              Support
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {/* Theme Toggle - Visible on both desktop & mobile */}
            <div className="flex items-center bg-[var(--bg-secondary)] rounded-lg p-1 border border-[var(--border-primary)]">
              <button
                onClick={() => setTheme('light')}
                className={`p-1.5 rounded-md flex items-center justify-center transition-all ${theme === 'light'
                  ? 'bg-[var(--bg-card)] text-[#387ed1] shadow-sm'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }`}
                title="Light Mode"
              >
                <Sun size={18} />
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`p-1.5 rounded-md flex items-center justify-center transition-all ${theme === 'dark'
                  ? 'bg-[var(--bg-card)] text-[#387ed1] shadow-sm'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }`}
                title="Dark Mode"
              >
                <Moon size={18} />
              </button>
              <button
                onClick={() => setTheme('system')}
                className={`p-1.5 rounded-md flex items-center justify-center transition-all ${theme === 'system'
                  ? 'bg-[var(--bg-card)] text-[#387ed1] shadow-sm'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }`}
                title="System Theme"
              >
                <Monitor size={18} />
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMobileMenu}
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] focus:outline-none p-1"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-[var(--border-primary)] pt-4 space-y-4">
            <Link
              to="/signup"
              onClick={toggleMobileMenu}
              className="block text-[var(--text-secondary)] hover:text-[#387ed1] hover:bg-[var(--bg-secondary)] px-3 py-2 rounded-md font-medium text-base transition-colors duration-200"
            >
              Signup
            </Link>
            <Link
              to="/about"
              onClick={toggleMobileMenu}
              className="block text-[var(--text-secondary)] hover:text-[#387ed1] hover:bg-[var(--bg-secondary)] px-3 py-2 rounded-md font-medium text-base transition-colors duration-200"
            >
              About
            </Link>
            <Link
              to="/products"
              onClick={toggleMobileMenu}
              className="block text-[var(--text-secondary)] hover:text-[#387ed1] hover:bg-[var(--bg-secondary)] px-3 py-2 rounded-md font-medium text-base transition-colors duration-200"
            >
              Products
            </Link>
            <Link
              to="/pricing"
              onClick={toggleMobileMenu}
              className="block text-[var(--text-secondary)] hover:text-[#387ed1] hover:bg-[var(--bg-secondary)] px-3 py-2 rounded-md font-medium text-base transition-colors duration-200"
            >
              Pricing
            </Link>
            <Link
              to="/support"
              onClick={toggleMobileMenu}
              className="block text-[var(--text-secondary)] hover:text-[#387ed1] hover:bg-[var(--bg-secondary)] px-3 py-2 rounded-md font-medium text-base transition-colors duration-200"
            >
              Support
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;