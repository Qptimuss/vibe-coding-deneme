import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button"; // Button bileşenini import et

export default function Navbar() {
  return (
    <nav className="w-full sticky top-0 z-50 bg-[#000034] max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[188px] py-4 lg:py-6">
      <div className="flex items-center justify-between">
        <Link to="/" className="font-outfit text-xl font-bold uppercase text-white">
          KRYPTO
        </Link>
        
        <div className="hidden md:flex items-center gap-2 lg:gap-4 font-outfit text-lg lg:text-xl text-white">
          <Link 
            to="/about" 
            className="rounded-md px-3 py-2 bg-white/5 hover:bg-white/10 active:bg-white/15 hover:text-brand-cyan transition-all duration-200"
          >
            about
          </Link>
          <Link 
            to="/pricing" 
            className="rounded-md px-3 py-2 bg-white/5 hover:bg-white/10 active:bg-white/15 hover:text-brand-cyan transition-all duration-200"
          >
            pricing
          </Link>
          <Link 
            to="/contact" 
            className="rounded-md px-3 py-2 bg-white/5 hover:bg-white/10 active:bg-white/15 hover:text-brand-cyan transition-all duration-200"
          >
            contact
          </Link>
          <Link 
            to="/buy-nfts" 
            className="rounded-md px-3 py-2 bg-white/5 hover:bg-white/10 active:bg-white/15 hover:text-brand-cyan transition-all duration-200"
          >
            buy nfts
          </Link>
          <Link 
            to="/comments" 
            className="rounded-md px-3 py-2 bg-white/5 hover:bg-white/10 active:bg-white/15 hover:text-brand-cyan transition-all duration-200"
          >
            comments
          </Link>
          <Link to="/login">
            <Button variant="default" size="sm" className="bg-brand-purple hover:bg-brand-purple/80 text-white">
              Giriş Yap
            </Button>
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