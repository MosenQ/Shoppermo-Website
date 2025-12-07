import { 
  type User, 
  type InsertUser,
  type Waitlist,
  type InsertWaitlist,
  type MerchantApplication,
  type InsertMerchantApplication,
  type ContactSales,
  type InsertContactSales,
  type ContactInquiry,
  type InsertContactInquiry,
  users,
  waitlist,
  merchantApplications,
  contactSales,
  contactInquiries
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createWaitlist(data: InsertWaitlist): Promise<Waitlist>;
  createMerchantApplication(data: InsertMerchantApplication): Promise<MerchantApplication>;
  createContactSales(data: InsertContactSales): Promise<ContactSales>;
  createContactInquiry(data: InsertContactInquiry): Promise<ContactInquiry>;
  getAllWaitlist(): Promise<Waitlist[]>;
  getAllMerchantApplications(): Promise<MerchantApplication[]>;
  getAllUsers(): Promise<Pick<User, 'id' | 'username'>[]>;
}

export class DbStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async createWaitlist(data: InsertWaitlist): Promise<Waitlist> {
    const result = await db.insert(waitlist).values(data).returning();
    return result[0];
  }

  async createMerchantApplication(data: InsertMerchantApplication): Promise<MerchantApplication> {
    const result = await db.insert(merchantApplications).values(data).returning();
    return result[0];
  }

  async createContactSales(data: InsertContactSales): Promise<ContactSales> {
    const result = await db.insert(contactSales).values(data).returning();
    return result[0];
  }

  async createContactInquiry(data: InsertContactInquiry): Promise<ContactInquiry> {
    const result = await db.insert(contactInquiries).values(data).returning();
    return result[0];
  }

  async getAllWaitlist(): Promise<Waitlist[]> {
    return await db.select().from(waitlist).orderBy(waitlist.createdAt);
  }

  async getAllMerchantApplications(): Promise<MerchantApplication[]> {
    return await db.select().from(merchantApplications).orderBy(merchantApplications.createdAt);
  }

  async getAllUsers(): Promise<Pick<User, 'id' | 'username'>[]> {
    return await db.select({ id: users.id, username: users.username }).from(users);
  }
}

export const storage = new DbStorage();
