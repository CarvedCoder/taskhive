// src/pages/AuthCallback.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/supabaseClient"; // adjust path

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        // 1) Try the SDK helper first (if available)
        if (typeof supabase?.auth?.getSessionFromUrl === "function") {
          const { data, error } = await supabase.auth.getSessionFromUrl({ storeSession: true });
          if (error) throw error;
          console.log("Session from SDK helper:", data?.session);
          // remove tokens from URL for security/cleanliness
          window.history.replaceState(null, "", "/");
          return navigate("/");
        }

        // 2) Fallback: parse tokens from hash or query string manually
        const raw = window.location.hash || window.location.search || "";
        const part = raw.startsWith("#") ? raw.slice(1) : (raw.startsWith("?") ? raw.slice(1) : "");
        const params = new URLSearchParams(part);

        const access_token = params.get("access_token");
        const refresh_token = params.get("refresh_token");
        const error = params.get("error") || params.get("error_description");

        if (error) {
          console.error("OAuth error in callback:", error);
          // show friendly message or redirect to /login
          return navigate("/login");
        }

        if (access_token && refresh_token) {
          // set session so Supabase stores it in localStorage, and future supabase.auth.getSession() works
          const { data, error: setError } = await supabase.auth.setSession({
            access_token,
            refresh_token,
          });

          if (setError) {
            console.error("setSession failed:", setError);
            return navigate("/login");
          }

          // success: clean the URL, redirect to home/dashboard
          window.history.replaceState(null, "", "/");
          return navigate("/");
        }

        // 3) Last resort: maybe session already exists (user already logged in)
        const { data: sData } = await supabase.auth.getSession();
        if (sData?.session) {
          return navigate("/");
        }

        // nothing to do — go back to login
        navigate("/login");
      } catch (err) {
        console.error("Auth callback error:", err);
        navigate("/login");
      }
    })();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      Signing you in…
    </div>
  );
}
