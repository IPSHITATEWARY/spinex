import { useState } from "react";
import { Link } from "wouter";
import { Menu, X, Home, Compass, User, Plus } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Button } from "@/components/ui/button";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed bottom-4 right-4 z-50 w-12 h-12 rounded-full glass-button-primary glow-cyan flex items-center justify-center"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm">
          <div className="fixed bottom-0 left-0 right-0 glass-card-lg rounded-t-3xl border-t border-white/20 p-6 space-y-4">
            {isAuthenticated ? (
              <>
                <Link href="/">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-full flex items-center gap-3 px-4 py-3 glass-button rounded-lg text-left"
                  >
                    <Home className="w-5 h-5" />
                    <span>Home</span>
                  </button>
                </Link>

                <Link href="/discover">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-full flex items-center gap-3 px-4 py-3 glass-button rounded-lg text-left"
                  >
                    <Compass className="w-5 h-5" />
                    <span>Discover</span>
                  </button>
                </Link>

                <Link href="/create">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-full flex items-center gap-3 px-4 py-3 glass-button-primary rounded-lg text-left"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Create</span>
                  </button>
                </Link>

                <Link href="/profile">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-full flex items-center gap-3 px-4 py-3 glass-button rounded-lg text-left"
                  >
                    <User className="w-5 h-5" />
                    <span>Profile</span>
                  </button>
                </Link>

                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-3 glass-button rounded-lg text-left text-red-400 hover:text-red-300"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-full flex items-center gap-3 px-4 py-3 glass-button rounded-lg text-left"
                  >
                    <Home className="w-5 h-5" />
                    <span>Home</span>
                  </button>
                </Link>

                <a href={getLoginUrl()}>
                  <Button className="w-full glass-button-primary">
                    Sign In
                  </Button>
                </a>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
