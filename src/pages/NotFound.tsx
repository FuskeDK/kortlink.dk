import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const path = location.pathname.slice(1); // Remove leading /

    let shortCode = null;

    // Check if it's a direct short code
    if (/^[a-zA-Z0-9]{6}$/.test(path)) {
      shortCode = path;
    } else if (/^api\/([a-zA-Z0-9]{6})$/.test(path)) {
      // Handle /api/shortCode format
      shortCode = path.match(/^api\/([a-zA-Z0-9]{6})$/)[1];
    }

    if (shortCode) {
      // Try to fetch the link
      const fetchLink = async () => {
        const { data, error } = await supabase
          .from("links")
          .select("original_url, clicks")
          .eq("short_code", shortCode)
          .single();

        if (data && !error) {
          // Increment click count
          await supabase
            .from("links")
            .update({ clicks: data.clicks + 1 })
            .eq("short_code", shortCode);

          // Redirect to original URL
          window.location.href = data.original_url;
        } else {
          console.error("404 Error: Short code not found:", shortCode);
        }
      };

      fetchLink();
    } else {
      console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    }
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Denne side eksistere ikke</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Gå tilbage
        </a>
      </div>
    </div>
  );
};

export default NotFound;
