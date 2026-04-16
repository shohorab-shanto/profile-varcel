import ProjectCard from "@/components/projects/ProjectCard";
import { apiService } from "@/lib/api";
import { Project, Profile } from "@/lib/types";

async function getProjects() {
  try {
    return await apiService.getProjects();
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return [];
  }
}

async function getProfile() {
  try {
    return await apiService.getProfile();
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    return null;
  }
}

export default async function ProjectsPage() {
  const [projects, profile] = await Promise.all([
    getProjects(),
    getProfile()
  ]);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-16">
          <h1 className="text-4xl font-bold mb-4">My Projects</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            A collection of web applications, SaaS platforms, and AI tools I've built.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.length > 0 ? (
            projects.map((project: Project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-slate-500">No projects found. Check back later!</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
