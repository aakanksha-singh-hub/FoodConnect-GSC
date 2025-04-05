import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
  useRef,
} from "react";
import { auth, db } from "@/integrations/firebase/client";
import { User } from "@/types";
import { getUserProfile } from "@/services/firebase";

interface UserContextType {
  user: User | null;
  loading: boolean;
  userRole: string | null;
  logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
  userRole: null,
  logout: async () => {},
});

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  const authInitialized = useRef(false);

  const fetchUserData = useCallback(async (uid: string) => {
    try {
      const userData = await getUserProfile(uid);
      if (userData) {
        setUser(userData);
        setUserRole(userData.role);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    // Only set up the auth listener once
    if (!authInitialized.current) {
      authInitialized.current = true;

      const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
        if (isMounted) {
          setLoading(true);

          if (firebaseUser) {
            await fetchUserData(firebaseUser.uid);
          } else {
            setUser(null);
            setUserRole(null);
          }

          setLoading(false);
        }
      });

      return () => {
        isMounted = false;
        unsubscribe();
      };
    }
  }, [fetchUserData]);

  const logout = useCallback(async () => {
    try {
      await auth.signOut();
      setUser(null);
      setUserRole(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, userRole, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
