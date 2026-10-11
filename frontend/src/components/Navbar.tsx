import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Moon, Sun } from 'lucide-react';

interface NavbarProps {
  isDark: boolean;
  setIsDark: (value: boolean) => void;
  isAdminLoggedIn: boolean;
}

const Navbar = ({ isDark, setIsDark, isAdminLoggedIn }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '/', id: 'home' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Brands', href: '#brands', id: 'brands' },
    { label: 'AI/ML Lab', href: '#ailab', id: 'ailab' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-dark-950 border-b border-dark-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-accent-blue to-accent-cyan rounded-lg flex items-center justify-center font-bold text-dark-950">
              SB
            </div>
            <span className="font-semibold text-lg hidden sm:inline">Shiva Bharti</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-accent-blue hover:bg-dark-800 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-lg bg-dark-800 hover:bg-dark-700 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Admin Link */}
            {isAdminLoggedIn && (
              <Link to="/admin/dashboard" className="btn-secondary text-sm">
                Dashboard
              </Link>
            )}
            {!isAdminLoggedIn && (
              <Link to="/admin/login" className="btn-ghost text-sm">
                Admin
              </Link>
            )}

            {/* Contact Button */}
            <a href="#contact" className="btn-primary text-sm">
              Contact Me
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg bg-dark-800 hover:bg-dark-700"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className="block px-4 py-2 rounded-md text-sm text-gray-300 hover:text-accent-blue hover:bg-dark-800 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
