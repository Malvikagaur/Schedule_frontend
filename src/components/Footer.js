import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-8 text-center">
      © {new Date().getFullYear()} Scheduling App. All rights reserved.
    </footer>
  );
};

export default Footer;
