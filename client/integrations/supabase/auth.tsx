import React, { useState, useEffect, createContext, useContext } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate, useLocation } from 'react-router-dom'; // useLocation eklendi

interface SessionContextType {
  session: Session | null;
  isLoading: boolean;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation(); // useLocation hook'u kullanıldı

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      setSession(currentSession);
      setIsLoading(false);

      if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
        // Kullanıcı giriş yaptığında veya profili güncellendiğinde, eğer giriş sayfasındaysa ana sayfaya yönlendir.
        if (currentSession && location.pathname === '/login') {
          navigate('/');
        }
      } else if (event === 'SIGNED_OUT') {
        // Kullanıcı çıkış yaptığında, eğer giriş sayfasında değilse giriş sayfasına yönlendir.
        if (location.pathname !== '/login') {
          navigate('/login');
        }
      }
    });

    // İlk oturum kontrolü:
    // Uygulama yüklendiğinde oturum yoksa, kullanıcıyı giriş sayfasına yönlendirme.
    // Bu, kullanıcıların giriş yapmadan diğer sayfalara erişmesini sağlar.
    supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
      setSession(initialSession);
      setIsLoading(false);
      // Genel yönlendirme kuralı kaldırıldı.
      // if (!initialSession && location.pathname !== '/login') { navigate('/login'); }
    });

    return () => subscription.unsubscribe();
  }, [navigate, location.pathname]); // location.pathname bağımlılık olarak eklendi

  return (
    <SessionContext.Provider value={{ session, isLoading }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionContextProvider');
  }
  return context;
};