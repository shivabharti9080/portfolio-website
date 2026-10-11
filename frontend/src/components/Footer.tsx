import { Github, Linkedin, Mail, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-900 border-t border-dark-800 mt-20">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-bold text-lg mb-2 gradient-text">Shiva Bharti</h3>
            <p className="text-gray-400 text-sm">Building meaningful digital products through software engineering, AI, and entrepreneurial thinking.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-100">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#home" className="text-gray-400 hover:text-accent-blue transition-colors">Home</a></li>
              <li><a href="#projects" className="text-gray-400 hover:text-accent-blue transition-colors">Projects</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-accent-blue transition-colors">Contact</a></li>
              <li><a href="/admin/login" className="text-gray-400 hover:text-accent-blue transition-colors">Admin</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-100">Contact</h4>
            <div className="space-y-2">
              <a href="mailto:shivabharti9080@gmail.com" className="flex items-center space-x-2 text-gray-400 hover:text-accent-blue transition-colors text-sm">
                <Mail size={16} /> <span>shivabharti9080@gmail.com</span>
              </a>
              <a href="tel:+916284172388" className="flex items-center space-x-2 text-gray-400 hover:text-accent-blue transition-colors text-sm">
                <Phone size={16} /> <span>+91 6284172388</span>
              </a>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-dark-800 pt-6 flex justify-between items-center">
          <p className="text-gray-500 text-sm">© {currentYear} Shiva Bharti. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="https://github.com/shivabharti9080" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent-blue transition-colors">
              <Github size={20} />
            </a>
            <a href="https://linkedin.com/in/shiva-bharti-11285537b/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent-blue transition-colors">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
