import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"; // Sheet bileşenlerini import et
import { Menu } from "lucide-react"; // Menu ikonunu import et

export default function Navbar() {
  return (
    <nav className="w-full sticky top-0 z-50 bg-[#000034] max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[188px] py-4 lg:py-6">
      <div className="flex items-center justify-between">
        <Link to="/" className="font-outfit text-xl font-bold uppercase text-white">
          KRYPTO
        </Link>
        
        {/* Masaüstü Navigasyonu */}
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

        {/* Mobil Hamburger Menü */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden text-white">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Menüyü Aç/Kapat</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[250px] sm:w-[300px] bg-brand-dark border-l border-brand-purple/50 p-6">
            <div className="flex flex-col gap-4 pt-8">
              <SheetClose asChild>
                <Link 
                  to="/about" 
                  className="block w-full text-left rounded-md px-3 py-2 bg-white/5 hover:bg-white/10 active:bg-white/15 hover:text-brand-cyan transition-all duration-200 text-lg"
                >
                  about
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link 
                  to="/pricing" 
                  className="block w-full text-left rounded-md px-3 py-2 bg-white/5 hover:bg-white/10 active:bg-white/15 hover:text-brand-cyan transition-all duration-200 text-lg"
                >
                  pricing
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link 
                  to="/contact" 
                  className="block w-full text-left rounded-md px-3 py-2 bg-white/5 hover:bg-white/10 active:bg-white/15 hover:text-brand-cyan transition-all duration-200 text-lg"
                >
                  contact
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link 
                  to="/buy-nfts" 
                  className="block w-full text-left rounded-md px-3 py-2 bg-white/5 hover:bg-white/10 active:bg-white/15 hover:text-brand-cyan transition-all duration-200 text-lg"
                >
                  buy nfts
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link 
                  to="/comments" 
                  className="block w-full text-left rounded-md px-3 py-2 bg-white/5 hover:bg-white/10 active:bg-white/15 hover:text-brand-cyan transition-all duration-200 text-lg"
                >
                  comments
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link to="/login" className="block w-full">
                  <Button variant="default" size="lg" className="w-full bg-brand-purple hover:bg-brand-purple/80 text-white">
                    Giriş Yap
                  </Button>
                </Link>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}