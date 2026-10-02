import { Request, Response, NextFunction } from "express";
import { getFirestoreDb } from "../config/firebase.js";

// Standard projects catalog
const PROJECTS_DATA = [
  {
    slug: "meals-to-smile",
    title: "Meals to Smile",
    category: "Hunger Relief & Nutrition",
    tagline: "Nourishing underprivileged rural communities with dignity, warmth, and hope.",
    description:
      'A compassionate project dedicated to providing nourishment to the underprivileged and impoverished communities in the rural regions of North India. With a heartfelt mission to alleviate hunger and foster hope, this initiative mobilizes volunteers to distribute wholesome meals directly to those in need.',
    image: "/meal to smile/1.jpg",
    stats: [
      { label: "Villages Reached", value: "125+" },
      { label: "Wholesome Meals Distributed", value: "12,550+" },
      { label: "Volunteers Mobilized", value: "85+" },
      { label: "Community Kitchens", value: "Active" },
    ],
  },
  {
    slug: "residential-academy",
    title: "Sacred Residential Academy",
    category: "Holistic Education & Care",
    tagline: "Empowering brilliant underprivileged minds through residential education and character building.",
    description:
      "A flagship transformative initiative providing high-standard schooling, residential amenities, nutrition, mentorship, and life skill coaching completely free for deserving students from remote villages.",
    image: "/residential.jpeg",
    stats: [
      { label: "Students Enrolled", value: "320+" },
      { label: "Full Scholarships", value: "100%" },
      { label: "Modern Smart Classrooms", value: "12" },
      { label: "Success Rate", value: "98%" },
    ],
  },
  {
    slug: "doctor-at-door",
    title: "Doctor at Door",
    category: "Primary Healthcare & Diagnostics",
    tagline: "Bridging the healthcare gap in remote areas with mobile medical teams and free medicines.",
    description:
      "Mobile healthcare units equipped with experienced doctors, diagnostic devices, and free essential medicines directly visiting remote rural pockets and doorstep clinics for underprivileged families.",
    image: "/doctor.jpeg",
    stats: [
      { label: "Patients Treated", value: "24,000+" },
      { label: "Medical Camps", value: "180+" },
      { label: "Free Prescriptions", value: "45,000+" },
      { label: "Specialist Doctors", value: "35+" },
    ],
  },
  {
    slug: "learning-centre",
    title: "Community Learning Centres",
    category: "Grassroots Literacy & Tuition",
    tagline: "Illuminating rural hamlets with after-school tuition, digital literacy, and moral education.",
    description:
      "Decentralized learning centers across North Indian villages delivering foundational tutoring, spoken English, digital training, and joyful learning for first-generation school goers.",
    image: "/academy.jpeg",
    stats: [
      { label: "Active Centers", value: "42+" },
      { label: "Children Enrolled", value: "3,800+" },
      { label: "Community Tutors", value: "65+" },
      { label: "Pass Rate Boost", value: "+45%" },
    ],
  },
  {
    slug: "ration-kit",
    title: "Family Ration Kits Distribution",
    category: "Food Security & Emergency Relief",
    tagline: "Monthly staple food kits sustaining vulnerable families, widows, and elders in crisis.",
    description:
      "Comprehensive monthly ration kits containing rice, flour, pulses, cooking oil, spices, and hygiene essentials distributed to vulnerable households facing severe economic hardship.",
    image: "/ration.jpeg",
    stats: [
      { label: "Families Supported", value: "6,200+" },
      { label: "Metric Tons of Grain", value: "140+" },
      { label: "Widow Support Focus", value: "60%" },
      { label: "Districts Covered", value: "18" },
    ],
  },
  {
    slug: "shining-street",
    title: "Shining Street",
    category: "Street Children Rehabilitation",
    tagline: "Rescuing vulnerable street children from labor and guiding them toward schooling and dignity.",
    description:
      "A high-impact outreach initiative that connects with street-connected and child-labor children to provide counseling, nutrition, hygiene, rehabilitation, and bridge-school admission.",
    image: "/street.jpeg",
    stats: [
      { label: "Children Rehabilitated", value: "480+" },
      { label: "Enrolled in Schools", value: "310+" },
      { label: "Night Shelter Support", value: "Active" },
      { label: "Vocational Mentorships", value: "95+" },
    ],
  },
  {
    slug: "drops-of-cure",
    title: "Drops of Cure",
    category: "Pure Water & Health Wellness",
    tagline: "Installing clean drinking water filtration and sanitation systems in water-stressed villages.",
    description:
      "Setting up community reverse-osmosis water plants, deep borewells, and hand pumps to eliminate waterborne illnesses and save rural women miles of daily walking.",
    image: "/drop.jpeg",
    stats: [
      { label: "Water Plants Installed", value: "28+" },
      { label: "Daily Beneficiaries", value: "18,500+" },
      { label: "Waterborne Illness Drop", value: "85%" },
      { label: "Maintained by Community", value: "100%" },
    ],
  },
];

export class ProjectController {
  /**
   * GET /api/projects
   * List all projects
   */
  static async listProjects(req: Request, res: Response, next: NextFunction) {
    try {
      const db = getFirestoreDb();

      if (db) {
        try {
          const snapshot = await db.collection("projects").get();
          if (!snapshot.empty) {
            const projects = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            return res.status(200).json({
              success: true,
              count: projects.length,
              data: projects,
            });
          }
        } catch (error) {
          console.warn("[Firestore] Projects query error, falling back to static catalog:", error);
        }
      }

      return res.status(200).json({
        success: true,
        count: PROJECTS_DATA.length,
        data: PROJECTS_DATA,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/projects/:slug
   * Get single project details
   */
  static async getProjectBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const slug = String(req.params.slug);
      const db = getFirestoreDb();

      if (db) {
        try {
          const snapshot = await db.collection("projects").where("slug", "==", slug).limit(1).get();
          if (!snapshot.empty) {
            const doc = snapshot.docs[0];
            return res.status(200).json({
              success: true,
              data: { id: doc.id, ...doc.data() },
            });
          }
        } catch (error) {
          console.warn("[Firestore] Single project query error:", error);
        }
      }

      const project = PROJECTS_DATA.find((p) => p.slug === slug);
      if (!project) {
        return res.status(404).json({ error: `Project not found for slug: ${slug}` });
      }

      return res.status(200).json({
        success: true,
        data: project,
      });
    } catch (error) {
      next(error);
    }
  }
}
