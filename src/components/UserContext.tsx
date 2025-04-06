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
  isProfileComplete: boolean;
  logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
  userRole: null,
  isProfileComplete: false,
  logout: async () => {},
});

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const authInitialized = useRef(false);

  const fetchUserData = useCallback(async (uid: string) => {
    try {
      const userData = await getUserProfile(uid);
      if (userData) {
        setUser(userData);
        setUserRole(userData.role);

        // Check if profile is complete (has required fields)
        const profileComplete = !!(
          userData.profileComplete ||
          (userData.phone && userData.address)
        );
        setIsProfileComplete(profileComplete);
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
      setIsProfileComplete(false);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{ user, loading, userRole, isProfileComplete, logout }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
