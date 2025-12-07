import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { storage } from "./storage";
import {
  insertWaitlistSchema,
  insertMerchantApplicationSchema,
  insertContactSalesSchema,
  insertContactInquirySchema,
} from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import {
  sendNotificationEmail,
  formatWaitlistEmail,
  formatMerchantApplicationEmail,
  formatContactSalesEmail,
  formatContactInquiryEmail,
} from "./email";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
if (!ADMIN_PASSWORD) {
  console.warn("WARNING: ADMIN_PASSWORD environment variable is not set. Admin panel will be inaccessible.");
}

const adminSessions = new Map<string, { createdAt: number }>();
const merchantSessions = new Map<string, { createdAt: number; userId: string; username: string }>();
const SESSION_EXPIRY_MS = 24 * 60 * 60 * 1000;
const BCRYPT_SALT_ROUNDS = 10;

function generateSessionToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

function cleanExpiredSessions() {
  const now = Date.now();
  const tokensToDelete: string[] = [];
  adminSessions.forEach((session, token) => {
    if (now - session.createdAt > SESSION_EXPIRY_MS) {
      tokensToDelete.push(token);
    }
  });
  tokensToDelete.forEach(token => adminSessions.delete(token));
}

function adminAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];
  const session = adminSessions.get(token);
  if (!session) {
    return res.status(401).json({ error: "Invalid or expired session" });
  }
  if (Date.now() - session.createdAt > SESSION_EXPIRY_MS) {
    adminSessions.delete(token);
    return res.status(401).json({ error: "Session expired" });
  }
  next();
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/waitlist", async (req, res) => {
    try {
      const validatedData = insertWaitlistSchema.parse(req.body);
      const result = await storage.createWaitlist(validatedData);
      
      try {
        const emailContent = formatWaitlistEmail(validatedData);
        await sendNotificationEmail(emailContent.subject, emailContent.body);
      } catch (emailError) {
        console.error("Email notification failed (waitlist):", emailError);
      }
      
      res.status(201).json(result);
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromZodError(error);
        return res.status(400).json({ error: validationError.message });
      }
      console.error("Error creating waitlist entry:", error);
      res.status(500).json({ error: "Failed to create waitlist entry" });
    }
  });

  app.post("/api/merchant-applications", async (req, res) => {
    try {
      const validatedData = insertMerchantApplicationSchema.parse(req.body);
      const result = await storage.createMerchantApplication(validatedData);
      
      try {
        const emailContent = formatMerchantApplicationEmail(validatedData);
        await sendNotificationEmail(emailContent.subject, emailContent.body);
      } catch (emailError) {
        console.error("Email notification failed (merchant application):", emailError);
      }
      
      res.status(201).json(result);
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromZodError(error);
        return res.status(400).json({ error: validationError.message });
      }
      console.error("Error creating merchant application:", error);
      res.status(500).json({ error: "Failed to create merchant application" });
    }
  });

  app.post("/api/contact-sales", async (req, res) => {
    try {
      const validatedData = insertContactSalesSchema.parse(req.body);
      const result = await storage.createContactSales(validatedData);
      
      try {
        const emailContent = formatContactSalesEmail(validatedData);
        await sendNotificationEmail(emailContent.subject, emailContent.body);
      } catch (emailError) {
        console.error("Email notification failed (contact sales):", emailError);
      }
      
      res.status(201).json(result);
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromZodError(error);
        return res.status(400).json({ error: validationError.message });
      }
      console.error("Error creating contact sales entry:", error);
      res.status(500).json({ error: "Failed to create contact sales entry" });
    }
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactInquirySchema.parse(req.body);
      const result = await storage.createContactInquiry(validatedData);
      
      try {
        const emailContent = formatContactInquiryEmail(validatedData);
        await sendNotificationEmail(emailContent.subject, emailContent.body);
      } catch (emailError) {
        console.error("Email notification failed (contact inquiry):", emailError);
      }
      
      res.status(201).json(result);
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromZodError(error);
        return res.status(400).json({ error: validationError.message });
      }
      console.error("Error creating contact inquiry:", error);
      res.status(500).json({ error: "Failed to create contact inquiry" });
    }
  });

  app.post("/api/admin/login", (req, res) => {
    const { password } = req.body;
    if (!ADMIN_PASSWORD) {
      return res.status(503).json({ error: "Admin panel is not configured" });
    }
    if (password === ADMIN_PASSWORD) {
      cleanExpiredSessions();
      const token = generateSessionToken();
      adminSessions.set(token, { createdAt: Date.now() });
      res.json({ success: true, token });
    } else {
      res.status(401).json({ error: "Invalid password" });
    }
  });

  app.post("/api/admin/logout", adminAuth, (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      adminSessions.delete(token);
    }
    res.json({ success: true });
  });

  app.get("/api/admin/waitlist", adminAuth, async (_req, res) => {
    try {
      const data = await storage.getAllWaitlist();
      res.json(data);
    } catch (error) {
      console.error("Error fetching waitlist:", error);
      res.status(500).json({ error: "Failed to fetch waitlist" });
    }
  });

  app.get("/api/admin/applications", adminAuth, async (_req, res) => {
    try {
      const data = await storage.getAllMerchantApplications();
      res.json(data);
    } catch (error) {
      console.error("Error fetching applications:", error);
      res.status(500).json({ error: "Failed to fetch applications" });
    }
  });

  app.get("/api/admin/users", adminAuth, async (_req, res) => {
    try {
      const data = await storage.getAllUsers();
      res.json(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Failed to fetch users" });
    }
  });

  app.post("/api/admin/users", adminAuth, async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
      }
      
      if (username.length < 3) {
        return res.status(400).json({ error: "Username must be at least 3 characters" });
      }
      
      if (password.length < 6) {
        return res.status(400).json({ error: "Password must be at least 6 characters" });
      }

      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(409).json({ error: "Username already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
      const user = await storage.createUser({ username, password: hashedPassword });
      
      res.status(201).json({ id: user.id, username: user.username });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Failed to create user" });
    }
  });

  app.post("/api/merchant/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
      }

      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ error: "Invalid username or password" });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ error: "Invalid username or password" });
      }

      const token = generateSessionToken();
      merchantSessions.set(token, { 
        createdAt: Date.now(), 
        userId: user.id, 
        username: user.username 
      });

      res.json({ success: true, token, username: user.username });
    } catch (error) {
      console.error("Error during merchant login:", error);
      res.status(500).json({ error: "Login failed" });
    }
  });

  app.post("/api/merchant/logout", (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      merchantSessions.delete(token);
    }
    res.json({ success: true });
  });

  app.get("/api/merchant/session", (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const token = authHeader.split(" ")[1];
    const session = merchantSessions.get(token);
    if (!session) {
      return res.status(401).json({ error: "Invalid or expired session" });
    }
    if (Date.now() - session.createdAt > SESSION_EXPIRY_MS) {
      merchantSessions.delete(token);
      return res.status(401).json({ error: "Session expired" });
    }
    res.json({ username: session.username, userId: session.userId });
  });

  return httpServer;
}
