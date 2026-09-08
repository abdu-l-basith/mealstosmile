import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROJECTS } from "@/data/projects";
import ProjectDetailView from "@/components/ProjectDetailView";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static routes for all 8 projects
export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

// Generate dynamic SEO metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found | Meal to Smile",
    };
  }

  return {
    title: `${project.title} - ${project.category} | Meal to Smile`,
    description: project.description.slice(0, 160) + "...",
    openGraph: {
      title: `${project.title} - ${project.category}`,
      description: project.tagline,
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <ProjectDetailView project={project} />
      <Footer />
      <FloatingButtons />
    </>
  );
}
