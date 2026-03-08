import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <Package className="h-8 w-8 text-primary" />
              <span className="font-bold text-2xl tracking-tight">Speedat</span>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted partner for international courier and cargo services. Fast, reliable, and secure worldwide delivery from Lahore.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="text-gray-300 hover:text-primary transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors"><Instagram className="h-5 w-5" /></a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-300 hover:text-primary transition-colors text-sm">Home</Link></li>
              <li><Link to="/smart-rate-calculator" className="text-gray-300 hover:text-primary transition-colors text-sm">Rate Calculator</Link></li>
              <li><Link to="/track-shipment" className="text-gray-300 hover:text-primary transition-colors text-sm">Track Shipment</Link></li>
              <li><Link to="/book-pickup" className="text-gray-300 hover:text-primary transition-colors text-sm">Book Pickup</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-gray-300">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <div className="flex flex-col gap-1">
                  <span>+92 325 5943950 (WhatsApp)</span>
                  <span>+92 321 4174421</span>
                  <span>+92 333 7667076</span>
                </div>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-300">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <a href="mailto:hellospeedat@gmail.com" className="hover:text-primary transition-colors">hellospeedat@gmail.com</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Office Location</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-gray-300">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <span>Al-Sheikh Plaza, Model Town<br />Lahore, Pakistan</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Speedat International Courier & Cargo. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-gray-400">
            <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;