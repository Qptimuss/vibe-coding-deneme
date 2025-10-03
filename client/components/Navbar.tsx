import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full sticky top-0 z-50 bg-[#000034] max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[188px] py-8 lg:py-[69px]">
      <div className="flex items-center justify-between">
        <Link to="/" className="font-outfit text-xl font-bold uppercase text-white">
          KRYPTO
        </Link>
        
        <div className="hidden md:flex items-center gap-8 lg:gap-[50px] font-outfit text-lg lg:text-xl text-white">
          <Link to="/about" className="hover:text-brand-cyan transition-colors">
            about
          </Link>
          <Link to="/pricing" className="hover:text-brand-cyan transition-colors">
            pricing
          </Link>
          <Link to="/contact" className="hover:text-brand-cyan transition-colors">
            contact
          </Link>
          <Link to="/buy-nfts" className="hover:text-brand-cyan transition-colors">
            buy nfts
          </Link>
        </div>

        <button className="md:hidden text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
}