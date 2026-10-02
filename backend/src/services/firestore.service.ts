import { getFirestoreDb } from "../config/firebase.js";
import { ContributionDocument, ContributionInput } from "../types/contribution.types.js";
import { ProjectDetail } from "../types/project.types.js";

const CONTRIBUTIONS_COLLECTION = "contributions";
const PROJECTS_COLLECTION = "projects";

// In-memory fallback if Firestore is not initialized/configured yet
const inMemoryContributions: ContributionDocument[] = [];

export class FirestoreService {
  /**
   * Save a new contribution/inquiry to Firestore
   */
  static async saveContribution(data: ContributionInput): Promise<ContributionDocument> {
    const db = getFirestoreDb();
    const formattedAmount = data.amount ? `₹ ${data.amount.toString().replace(/[^0-9,]/g, "")}` : "Not Specified";
    const submittedAtIST = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    const docData: ContributionDocument = {
      ...data,
      formattedAmount,
      submittedAtIST,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    if (db) {
      try {
        const docRef = await db.collection(CONTRIBUTIONS_COLLECTION).add({
          ...docData,
          createdAt: new Date(),
        });
        return {
          id: docRef.id,
          ...docData,
        };
      } catch (error) {
        console.error("[Firestore] Error writing contribution document:", error);
      }
    }

    // Fallback in-memory storage for development without Firestore setup
    const fallbackId = `mem_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const savedDoc = { id: fallbackId, ...docData };
    inMemoryContributions.unshift(savedDoc);
    console.log(`[Storage] Saved contribution (in-memory fallback, id: ${fallbackId})`);
    return savedDoc;
  }

  /**
   * Get all contributions (for admin dashboard / reporting)
   */
  static async getContributions(limitCount = 50): Promise<ContributionDocument[]> {
    const db = getFirestoreDb();

    if (db) {
      try {
        const snapshot = await db
          .collection(CONTRIBUTIONS_COLLECTION)
          .orderBy("createdAt", "desc")
          .limit(limitCount)
          .get();

        return snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : data.createdAt,
          } as ContributionDocument;
        });
      } catch (error) {
        console.error("[Firestore] Error fetching contributions:", error);
      }
    }

    return inMemoryContributions.slice(0, limitCount);
  }

  /**
   * Get single contribution by ID
   */
  static async getContributionById(id: string): Promise<ContributionDocument | null> {
    const db = getFirestoreDb();

    if (db) {
      try {
        const doc = await db.collection(CONTRIBUTIONS_COLLECTION).doc(id).get();
        if (doc.exists) {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            createdAt: data?.createdAt?.toDate ? data.createdAt.toDate().toISOString() : data?.createdAt,
          } as ContributionDocument;
        }
      } catch (error) {
        console.error(`[Firestore] Error fetching contribution ${id}:`, error);
      }
    }

    return inMemoryContributions.find((c) => c.id === id) || null;
  }

  /**
   * Update contribution status
   */
  static async updateContributionStatus(
    id: string,
    status: ContributionDocument["status"]
  ): Promise<boolean> {
    const db = getFirestoreDb();

    if (db) {
      try {
        await db.collection(CONTRIBUTIONS_COLLECTION).doc(id).update({
          status,
          updatedAt: new Date(),
        });
        return true;
      } catch (error) {
        console.error(`[Firestore] Error updating contribution ${id}:`, error);
      }
    }

    const item = inMemoryContributions.find((c) => c.id === id);
    if (item) {
      item.status = status;
      return true;
    }

    return false;
  }
}
