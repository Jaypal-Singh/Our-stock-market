import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-16">
      <div className="container mx-auto px-4 max-w-6xl text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} Money Dock. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;