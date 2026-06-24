import { Link } from "react-router-dom";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t-4 border-brand-accent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Brand Details */}
        <div className="space-y-4">
          <h3 className="text-2xl font-black tracking-wider text-white">
            SFPPL <span className="text-brand-accent text-sm font-semibold">FOODS</span>
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            SADAF FOOD PROCESSORS PRIVATE LIMITED (SFPPL) has been a trusted symbol of hygiene, safety, and nutritional excellence in grain and spice processing since 2012.
          </p>
          <div className="flex space-x-3 pt-2">
            <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-brand-primary hover:text-white transition-colors">
              <FaFacebookF size={14} />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-brand-primary hover:text-white transition-colors">
              <FaLinkedinIn size={14} />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-brand-primary hover:text-white transition-colors">
              <FaTwitter size={14} />
            </a>
            <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-brand-primary hover:text-white transition-colors">
              <FaWhatsapp size={14} />
            </a>
          </div>
        </div>

        {/* Corporate Navigation Linkages */}
        <div>
          <h4 className="text-white font-bold text-base mb-4 tracking-wider uppercase border-b border-slate-800 pb-2">
            Quick Links
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link to="/about" className="hover:text-brand-accent transition-colors">About SFPPL</Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-brand-accent transition-colors">Product Catalog</Link>
            </li>
            <li>
              <Link to="/careers" className="hover:text-brand-accent transition-colors">Join Our Team</Link>
            </li>
            <li>
              <Link to="/distributors" className="hover:text-brand-accent transition-colors">Become a Distributor</Link>
            </li>
            <li>
              <Link to="/investors" className="hover:text-brand-accent transition-colors">Investor Relations</Link>
            </li>
          </ul>
        </div>

        {/* Categories Linkages */}
        <div>
          <h4 className="text-white font-bold text-base mb-4 tracking-wider uppercase border-b border-slate-800 pb-2">
            Product Categories
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link to="/products?category=Grains" className="hover:text-brand-accent transition-colors">Premium Grains</Link>
            </li>
            <li>
              <Link to="/products?category=Spices" className="hover:text-brand-accent transition-colors">Pure Spices</Link>
            </li>
            <li>
              <Link to="/products?category=Pulses" className="hover:text-brand-accent transition-colors">Healthy Pulses</Link>
            </li>
            <li>
              <Link to="/products?category=Food Products" className="hover:text-brand-accent transition-colors">Processed Foods</Link>
            </li>
            <li>
              <Link to="/csr" className="hover:text-brand-accent transition-colors">CSR & Sustainability</Link>
            </li>
          </ul>
        </div>

        {/* Registered Office Info */}
        <div className="space-y-3">
          <h4 className="text-white font-bold text-base mb-4 tracking-wider uppercase border-b border-slate-800 pb-2">
            Registered Office
          </h4>
          <p className="text-sm text-slate-400 flex items-start space-x-2">
            <FaMapMarkerAlt className="text-brand-accent shrink-0 mt-1" />
            <span>
              Berai Tola, Vill — Berai Khanapur, Anchal — Katara, Muzaffarpur, Bihar — 843129, India
            </span>
          </p>
          <p className="text-sm text-slate-400 flex items-center space-x-2">
            <FaEnvelope className="text-brand-accent" />
            <a href="mailto:cksitr2028@gmail.com" className="hover:text-brand-accent">cksitr2028@gmail.com</a>
          </p>
          <p className="text-sm text-slate-400 flex items-center space-x-2">
            <FaPhoneAlt className="text-brand-accent" />
            <span>+91 62028 XXXX</span>
          </p>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} SADAF FOOD PROCESSORS PRIVATE LIMITED. All rights reserved.</p>
        <p className="mt-2 sm:mt-0">CIN: U15400BR2012PTC019623 | Approved by FSSAI Patna</p>
      </div>
    </footer>
  );
}
