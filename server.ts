import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Support JSON request processing
  app.use(express.json());

  // API Route: Secure admin login
  app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: "Email and password are required credentials." 
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (normalizedEmail === "akinwunmigbenga97@gmail.com") {
      // Keep password checking 100% server-side, safe from static analysis in browser
      const secureAdminPass = process.env.ADMIN_PASSWORD || "Oojastore@admin";
      
      if (password === secureAdminPass) {
        return res.json({
          success: true,
          user: {
            email: "akinwunmigbenga97@gmail.com",
            name: "ADML. GBENGA",
            phone: "+234 810 000 0000",
            shippingAddress: "Main Headquarters, Lagos",
            city: "Lagos",
            zipCode: "100001",
            createdAt: new Date().toISOString().split('T')[0],
            preferredRoute: "NG_TO_NG"
          }
        });
      } else {
        return res.status(401).json({ 
          success: false, 
          message: "Failure: Invalid administrator credentials or signature verification." 
        });
      }
    }

    // For other shoppers, return generic confirmation so client can proceed with local generation
    return res.json({ 
      success: true, 
      isGuest: true 
    });
  });

  // Health probe route
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", mode: process.env.NODE_ENV || "development" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server boots in secure mode on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Critical: Failed to boot secure full-stack logistics server:", err);
});
