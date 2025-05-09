export default function Projects() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen pt-[70px] md:pt-[80px] text-white bg-bgDark">
      <div className="px-4 mx-auto md:max-w-4xl">
        <h1 className="mb-8 text-4xl font-bold tracking-tight md:text-6xl">Projects</h1>
        <p className="mb-8 text-lg">Check out some of my recent projects.</p>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Project placeholders - to be replaced with actual projects */}
          {[1, 2, 3, 4].map((project) => (
            <div 
              key={project}
              className="p-6 transition-transform duration-300 border border-gray-700 rounded-lg hover:transform hover:scale-105"
            >
              <h2 className="mb-2 text-2xl font-semibold">Project {project}</h2>
              <p className="mb-4 text-gray-400">
                A brief description of this amazing project that showcases my skills and expertise.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {["Next.js", "React", "TailwindCSS"].map((tech) => (
                  <span key={tech} className="px-2 py-1 text-xs bg-gray-800 rounded-full">{tech}</span>
                ))}
              </div>
              <a href="#" className="inline-flex items-center text-blue-400 hover:underline">
                View Project 
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 