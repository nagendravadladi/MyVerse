// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  users = /* @__PURE__ */ new Map();
  studyResources = /* @__PURE__ */ new Map();
  gameScores = /* @__PURE__ */ new Map();
  musicPlaylists = /* @__PURE__ */ new Map();
  gymExercises = /* @__PURE__ */ new Map();
  healthData = /* @__PURE__ */ new Map();
  entertainmentItems = /* @__PURE__ */ new Map();
  wishlistItems = /* @__PURE__ */ new Map();
  financeData = /* @__PURE__ */ new Map();
  documents = /* @__PURE__ */ new Map();
  aiTools = /* @__PURE__ */ new Map();
  shortcuts = /* @__PURE__ */ new Map();
  performanceData = /* @__PURE__ */ new Map();
  currentId = 1;
  // User methods
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByEmail(email) {
    return Array.from(this.users.values()).find((user) => user.email === email);
  }
  async createUser(insertUser) {
    const id = this.currentId++;
    const user = {
      ...insertUser,
      id,
      createdAt: /* @__PURE__ */ new Date(),
      theme: insertUser.theme || "light",
      focusModeEnabled: insertUser.focusModeEnabled || false
    };
    this.users.set(id, user);
    return user;
  }
  async updateUser(id, updates) {
    const user = this.users.get(id);
    if (!user) throw new Error("User not found");
    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }
  // Study resources
  async getStudyResources(userId) {
    return Array.from(this.studyResources.values()).filter((r) => r.userId === userId);
  }
  async createStudyResource(resource) {
    const id = this.currentId++;
    const newResource = {
      ...resource,
      id,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.studyResources.set(id, newResource);
    return newResource;
  }
  async deleteStudyResource(id) {
    this.studyResources.delete(id);
  }
  // Game scores
  async getGameScores(userId) {
    return Array.from(this.gameScores.values()).filter((s) => s.userId === userId);
  }
  async createGameScore(score) {
    const id = this.currentId++;
    const newScore = {
      ...score,
      id,
      completedAt: /* @__PURE__ */ new Date()
    };
    this.gameScores.set(id, newScore);
    return newScore;
  }
  // Music playlists
  async getMusicPlaylists(userId) {
    return Array.from(this.musicPlaylists.values()).filter((p) => p.userId === userId);
  }
  async createMusicPlaylist(playlist) {
    const id = this.currentId++;
    const newPlaylist = {
      ...playlist,
      id,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.musicPlaylists.set(id, newPlaylist);
    return newPlaylist;
  }
  async deleteMusicPlaylist(id) {
    this.musicPlaylists.delete(id);
  }
  // Gym exercises
  async getGymExercises(userId) {
    return Array.from(this.gymExercises.values()).filter((e) => e.userId === userId);
  }
  async createGymExercise(exercise) {
    const id = this.currentId++;
    const newExercise = {
      ...exercise,
      id,
      date: /* @__PURE__ */ new Date()
    };
    this.gymExercises.set(id, newExercise);
    return newExercise;
  }
  async updateGymExercise(id, updates) {
    const exercise = this.gymExercises.get(id);
    if (!exercise) throw new Error("Exercise not found");
    const updatedExercise = { ...exercise, ...updates };
    this.gymExercises.set(id, updatedExercise);
    return updatedExercise;
  }
  // Health data
  async getHealthData(userId) {
    return Array.from(this.healthData.values()).filter((h) => h.userId === userId);
  }
  async createHealthData(data) {
    const id = this.currentId++;
    const newData = {
      ...data,
      id,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.healthData.set(id, newData);
    return newData;
  }
  // Entertainment items
  async getEntertainmentItems(userId) {
    return Array.from(this.entertainmentItems.values()).filter((e) => e.userId === userId);
  }
  async createEntertainmentItem(item) {
    const id = this.currentId++;
    const newItem = {
      ...item,
      id,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.entertainmentItems.set(id, newItem);
    return newItem;
  }
  async updateEntertainmentItem(id, updates) {
    const item = this.entertainmentItems.get(id);
    if (!item) throw new Error("Entertainment item not found");
    const updatedItem = { ...item, ...updates };
    this.entertainmentItems.set(id, updatedItem);
    return updatedItem;
  }
  async deleteEntertainmentItem(id) {
    this.entertainmentItems.delete(id);
  }
  // Wishlist items
  async getWishlistItems(userId) {
    return Array.from(this.wishlistItems.values()).filter((w) => w.userId === userId);
  }
  async createWishlistItem(item) {
    const id = this.currentId++;
    const newItem = {
      ...item,
      id,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.wishlistItems.set(id, newItem);
    return newItem;
  }
  async deleteWishlistItem(id) {
    this.wishlistItems.delete(id);
  }
  // Finance data
  async getFinanceData(userId) {
    return Array.from(this.financeData.values()).filter((f) => f.userId === userId);
  }
  async createFinanceData(data) {
    const id = this.currentId++;
    const newData = {
      ...data,
      id,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.financeData.set(id, newData);
    return newData;
  }
  // Documents
  async getDocuments(userId) {
    return Array.from(this.documents.values()).filter((d) => d.userId === userId);
  }
  async createDocument(doc) {
    const id = this.currentId++;
    const newDoc = {
      ...doc,
      id,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.documents.set(id, newDoc);
    return newDoc;
  }
  async deleteDocument(id) {
    this.documents.delete(id);
  }
  // AI tools
  async getAITools(userId) {
    return Array.from(this.aiTools.values()).filter((a) => a.userId === userId);
  }
  async createAITool(tool) {
    const id = this.currentId++;
    const newTool = {
      ...tool,
      id,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.aiTools.set(id, newTool);
    return newTool;
  }
  async deleteAITool(id) {
    this.aiTools.delete(id);
  }
  // Shortcuts
  async getShortcuts(userId) {
    return Array.from(this.shortcuts.values()).filter((s) => s.userId === userId);
  }
  async createShortcut(shortcut) {
    const id = this.currentId++;
    const newShortcut = {
      ...shortcut,
      id,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.shortcuts.set(id, newShortcut);
    return newShortcut;
  }
  async updateShortcut(id, updates) {
    const shortcut = this.shortcuts.get(id);
    if (!shortcut) throw new Error("Shortcut not found");
    const updatedShortcut = { ...shortcut, ...updates };
    this.shortcuts.set(id, updatedShortcut);
    return updatedShortcut;
  }
  async deleteShortcut(id) {
    this.shortcuts.delete(id);
  }
  // Performance data
  async getPerformanceData(userId) {
    return Array.from(this.performanceData.values()).filter((p) => p.userId === userId);
  }
  async createPerformanceData(data) {
    const id = this.currentId++;
    const newData = {
      ...data,
      id,
      date: /* @__PURE__ */ new Date()
    };
    this.performanceData.set(id, newData);
    return newData;
  }
};
var storage = new MemStorage();

// server/routes.ts
import { z } from "zod";

// shared/schema.ts
import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  profilePicture: text("profile_picture"),
  dailyQuote: text("daily_quote"),
  portfolioLink: text("portfolio_link"),
  theme: text("theme").default("light"),
  focusModeEnabled: boolean("focus_mode_enabled").default(false),
  createdAt: timestamp("created_at").defaultNow()
});
var studyResources = pgTable("study_resources", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  type: text("type").notNull(),
  // 'youtube', 'note', 'resource'
  title: text("title").notNull(),
  content: text("content"),
  // URL for youtube/resource, rich text for notes
  thumbnail: text("thumbnail"),
  folder: text("folder"),
  createdAt: timestamp("created_at").defaultNow()
});
var gameScores = pgTable("game_scores", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  gameName: text("game_name").notNull(),
  score: integer("score").notNull(),
  stars: integer("stars").default(0),
  completedAt: timestamp("completed_at").defaultNow()
});
var musicPlaylists = pgTable("music_playlists", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  name: text("name").notNull(),
  url: text("url").notNull(),
  platform: text("platform").notNull(),
  // 'spotify', 'youtube', 'local'
  thumbnail: text("thumbnail"),
  createdAt: timestamp("created_at").defaultNow()
});
var gymExercises = pgTable("gym_exercises", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  muscleGroup: text("muscle_group").notNull(),
  exerciseName: text("exercise_name").notNull(),
  status: text("status").notNull(),
  // 'completed', 'skipped', 'pending'
  date: timestamp("date").defaultNow()
});
var healthData = pgTable("health_data", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  type: text("type").notNull(),
  // 'food_scan', 'tip'
  content: text("content").notNull(),
  rating: text("rating"),
  // 'healthy', 'not_recommended'
  createdAt: timestamp("created_at").defaultNow()
});
var entertainmentItems = pgTable("entertainment_items", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  title: text("title").notNull(),
  platform: text("platform").notNull(),
  url: text("url"),
  thumbnail: text("thumbnail"),
  status: text("status").default("watch_later"),
  // 'watch_later', 'watched'
  createdAt: timestamp("created_at").defaultNow()
});
var wishlistItems = pgTable("wishlist_items", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  title: text("title").notNull(),
  price: text("price"),
  platform: text("platform").notNull(),
  url: text("url").notNull(),
  thumbnail: text("thumbnail"),
  priority: text("priority").default("medium"),
  // 'high', 'medium', 'low'
  createdAt: timestamp("created_at").defaultNow()
});
var financeData = pgTable("finance_data", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  type: text("type").notNull(),
  // 'income', 'expense', 'bill'
  amount: integer("amount").notNull(),
  description: text("description").notNull(),
  category: text("category"),
  dueDate: timestamp("due_date"),
  createdAt: timestamp("created_at").defaultNow()
});
var documents = pgTable("documents", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  title: text("title").notNull(),
  fileName: text("file_name").notNull(),
  fileType: text("file_type").notNull(),
  fileSize: integer("file_size"),
  filePath: text("file_path").notNull(),
  tags: text("tags").array(),
  createdAt: timestamp("created_at").defaultNow()
});
var aiTools = pgTable("ai_tools", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  name: text("name").notNull(),
  url: text("url").notNull(),
  icon: text("icon"),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow()
});
var shortcuts = pgTable("shortcuts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  name: text("name").notNull(),
  url: text("url").notNull(),
  icon: text("icon"),
  isPinned: boolean("is_pinned").default(false),
  order: integer("order").default(0),
  createdAt: timestamp("created_at").defaultNow()
});
var performanceData = pgTable("performance_data", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  section: text("section").notNull(),
  // 'study', 'gym', 'focus', etc.
  metric: text("metric").notNull(),
  value: integer("value").notNull(),
  date: timestamp("date").defaultNow()
});
var insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
var insertStudyResourceSchema = createInsertSchema(studyResources).omit({ id: true, createdAt: true });
var insertGameScoreSchema = createInsertSchema(gameScores).omit({ id: true, completedAt: true });
var insertMusicPlaylistSchema = createInsertSchema(musicPlaylists).omit({ id: true, createdAt: true });
var insertGymExerciseSchema = createInsertSchema(gymExercises).omit({ id: true, createdAt: true });
var insertHealthDataSchema = createInsertSchema(healthData).omit({ id: true, createdAt: true });
var insertEntertainmentItemSchema = createInsertSchema(entertainmentItems).omit({ id: true, createdAt: true });
var insertWishlistItemSchema = createInsertSchema(wishlistItems).omit({ id: true, createdAt: true });
var insertFinanceDataSchema = createInsertSchema(financeData).omit({ id: true, createdAt: true });
var insertDocumentSchema = createInsertSchema(documents).omit({ id: true, createdAt: true });
var insertAIToolSchema = createInsertSchema(aiTools).omit({ id: true, createdAt: true });
var insertShortcutSchema = createInsertSchema(shortcuts).omit({ id: true, createdAt: true });
var insertPerformanceDataSchema = createInsertSchema(performanceData).omit({ id: true, createdAt: true });

// server/routes.ts
async function registerRoutes(app2) {
  app2.post("/api/auth/login", async (req, res) => {
    try {
      const { email } = z.object({ email: z.string().email() }).parse(req.body);
      let user = await storage.getUserByEmail(email);
      if (!user) {
        user = await storage.createUser({
          email,
          name: "",
          profilePicture: null,
          dailyQuote: null,
          portfolioLink: null
        });
      }
      res.json({ user });
    } catch (error) {
      res.status(400).json({ error: "Invalid request" });
    }
  });
  app2.get("/api/user/:id", async (req, res) => {
    const user = await storage.getUser(parseInt(req.params.id));
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  });
  app2.patch("/api/user/:id", async (req, res) => {
    try {
      const updates = insertUserSchema.partial().parse(req.body);
      const user = await storage.updateUser(parseInt(req.params.id), updates);
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: "Invalid request" });
    }
  });
  app2.get("/api/study-resources/:userId", async (req, res) => {
    const resources = await storage.getStudyResources(parseInt(req.params.userId));
    res.json(resources);
  });
  app2.post("/api/study-resources", async (req, res) => {
    try {
      const resource = insertStudyResourceSchema.parse(req.body);
      const newResource = await storage.createStudyResource(resource);
      res.json(newResource);
    } catch (error) {
      res.status(400).json({ error: "Invalid request" });
    }
  });
  app2.delete("/api/study-resources/:id", async (req, res) => {
    await storage.deleteStudyResource(parseInt(req.params.id));
    res.json({ success: true });
  });
  app2.get("/api/game-scores/:userId", async (req, res) => {
    const scores = await storage.getGameScores(parseInt(req.params.userId));
    res.json(scores);
  });
  app2.post("/api/game-scores", async (req, res) => {
    try {
      const score = insertGameScoreSchema.parse(req.body);
      const newScore = await storage.createGameScore(score);
      res.json(newScore);
    } catch (error) {
      res.status(400).json({ error: "Invalid request" });
    }
  });
  app2.get("/api/playlists/:userId", async (req, res) => {
    const playlists = await storage.getMusicPlaylists(parseInt(req.params.userId));
    res.json(playlists);
  });
  app2.post("/api/playlists", async (req, res) => {
    try {
      const playlist = insertMusicPlaylistSchema.parse(req.body);
      const newPlaylist = await storage.createMusicPlaylist(playlist);
      res.json(newPlaylist);
    } catch (error) {
      res.status(400).json({ error: "Invalid request" });
    }
  });
  app2.delete("/api/playlists/:id", async (req, res) => {
    await storage.deleteMusicPlaylist(parseInt(req.params.id));
    res.json({ success: true });
  });
  app2.get("/api/gym-exercises/:userId", async (req, res) => {
    const exercises = await storage.getGymExercises(parseInt(req.params.userId));
    res.json(exercises);
  });
  app2.post("/api/gym-exercises", async (req, res) => {
    try {
      const exercise = insertGymExerciseSchema.parse(req.body);
      const newExercise = await storage.createGymExercise(exercise);
      res.json(newExercise);
    } catch (error) {
      res.status(400).json({ error: "Invalid request" });
    }
  });
  app2.patch("/api/gym-exercises/:id", async (req, res) => {
    try {
      const updates = insertGymExerciseSchema.partial().parse(req.body);
      const exercise = await storage.updateGymExercise(parseInt(req.params.id), updates);
      res.json(exercise);
    } catch (error) {
      res.status(400).json({ error: "Invalid request" });
    }
  });
  app2.get("/api/health-data/:userId", async (req, res) => {
    const data = await storage.getHealthData(parseInt(req.params.userId));
    res.json(data);
  });
  app2.post("/api/health-data", async (req, res) => {
    try {
      const data = insertHealthDataSchema.parse(req.body);
      const newData = await storage.createHealthData(data);
      res.json(newData);
    } catch (error) {
      res.status(400).json({ error: "Invalid request" });
    }
  });
  app2.get("/api/entertainment/:userId", async (req, res) => {
    const items = await storage.getEntertainmentItems(parseInt(req.params.userId));
    res.json(items);
  });
  app2.post("/api/entertainment", async (req, res) => {
    try {
      const item = insertEntertainmentItemSchema.parse(req.body);
      const newItem = await storage.createEntertainmentItem(item);
      res.json(newItem);
    } catch (error) {
      res.status(400).json({ error: "Invalid request" });
    }
  });
  app2.patch("/api/entertainment/:id", async (req, res) => {
    try {
      const updates = insertEntertainmentItemSchema.partial().parse(req.body);
      const item = await storage.updateEntertainmentItem(parseInt(req.params.id), updates);
      res.json(item);
    } catch (error) {
      res.status(400).json({ error: "Invalid request" });
    }
  });
  app2.delete("/api/entertainment/:id", async (req, res) => {
    await storage.deleteEntertainmentItem(parseInt(req.params.id));
    res.json({ success: true });
  });
  app2.get("/api/wishlist/:userId", async (req, res) => {
    const items = await storage.getWishlistItems(parseInt(req.params.userId));
    res.json(items);
  });
  app2.post("/api/wishlist", async (req, res) => {
    try {
      const item = insertWishlistItemSchema.parse(req.body);
      const newItem = await storage.createWishlistItem(item);
      res.json(newItem);
    } catch (error) {
      res.status(400).json({ error: "Invalid request" });
    }
  });
  app2.delete("/api/wishlist/:id", async (req, res) => {
    await storage.deleteWishlistItem(parseInt(req.params.id));
    res.json({ success: true });
  });
  app2.get("/api/finance/:userId", async (req, res) => {
    const data = await storage.getFinanceData(parseInt(req.params.userId));
    res.json(data);
  });
  app2.post("/api/finance", async (req, res) => {
    try {
      const data = insertFinanceDataSchema.parse(req.body);
      const newData = await storage.createFinanceData(data);
      res.json(newData);
    } catch (error) {
      res.status(400).json({ error: "Invalid request" });
    }
  });
  app2.get("/api/documents/:userId", async (req, res) => {
    const docs = await storage.getDocuments(parseInt(req.params.userId));
    res.json(docs);
  });
  app2.post("/api/documents", async (req, res) => {
    try {
      const doc = insertDocumentSchema.parse(req.body);
      const newDoc = await storage.createDocument(doc);
      res.json(newDoc);
    } catch (error) {
      res.status(400).json({ error: "Invalid request" });
    }
  });
  app2.delete("/api/documents/:id", async (req, res) => {
    await storage.deleteDocument(parseInt(req.params.id));
    res.json({ success: true });
  });
  app2.get("/api/ai-tools/:userId", async (req, res) => {
    const tools = await storage.getAITools(parseInt(req.params.userId));
    res.json(tools);
  });
  app2.post("/api/ai-tools", async (req, res) => {
    try {
      const tool = insertAIToolSchema.parse(req.body);
      const newTool = await storage.createAITool(tool);
      res.json(newTool);
    } catch (error) {
      res.status(400).json({ error: "Invalid request" });
    }
  });
  app2.delete("/api/ai-tools/:id", async (req, res) => {
    await storage.deleteAITool(parseInt(req.params.id));
    res.json({ success: true });
  });
  app2.get("/api/shortcuts/:userId", async (req, res) => {
    const shortcuts2 = await storage.getShortcuts(parseInt(req.params.userId));
    res.json(shortcuts2);
  });
  app2.post("/api/shortcuts", async (req, res) => {
    try {
      const shortcut = insertShortcutSchema.parse(req.body);
      const newShortcut = await storage.createShortcut(shortcut);
      res.json(newShortcut);
    } catch (error) {
      res.status(400).json({ error: "Invalid request" });
    }
  });
  app2.patch("/api/shortcuts/:id", async (req, res) => {
    try {
      const updates = insertShortcutSchema.partial().parse(req.body);
      const shortcut = await storage.updateShortcut(parseInt(req.params.id), updates);
      res.json(shortcut);
    } catch (error) {
      res.status(400).json({ error: "Invalid request" });
    }
  });
  app2.delete("/api/shortcuts/:id", async (req, res) => {
    await storage.deleteShortcut(parseInt(req.params.id));
    res.json({ success: true });
  });
  app2.get("/api/performance/:userId", async (req, res) => {
    const data = await storage.getPerformanceData(parseInt(req.params.userId));
    res.json(data);
  });
  app2.post("/api/performance", async (req, res) => {
    try {
      const data = insertPerformanceDataSchema.parse(req.body);
      const newData = await storage.createPerformanceData(data);
      res.json(newData);
    } catch (error) {
      res.status(400).json({ error: "Invalid request" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
