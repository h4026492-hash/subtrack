import { useEffect, useState } from "react";
import { getToken } from "./token";

export function useAuth() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const check = async () => {
      try {
        const token = await getToken();
        setAuthenticated(!!token);
      } finally {
        setLoading(false);
      }
    };
    check();
  }, []);

  return { loading, authenticated };
}
