export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-black/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="text-lg font-bold">Portfolio</span>
          <div className="flex gap-6 text-sm">
            <a href="#about" className="hover:underline">About</a>
            <a href="#projects" className="hover:underline">Projects</a>
            <a href="#contact" className="hover:underline">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight">
          Hi, I&apos;m <span className="text-blue-600 dark:text-blue-400">GummyBear479</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-xl">
          Welcome to my personal portfolio. I build things for the web.
        </p>
        <a
          href="#projects"
          className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          View My Work
        </a>
      </section>

      {/* About */}
      <section id="about" className="py-24 px-6 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">About Me</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            I&apos;m a developer passionate about creating clean, functional, and
            user-friendly applications. I enjoy working with modern web
            technologies and am always looking to learn something new.
          </p>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-10">Projects</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Project One",
                description: "A brief description of what this project does and the technologies used.",
              },
              {
                title: "Project Two",
                description: "A brief description of what this project does and the technologies used.",
              },
              {
                title: "Project Three",
                description: "A brief description of what this project does and the technologies used.",
              },
            ].map((project) => (
              <div
                key={project.title}
                className="border border-gray-200 dark:border-gray-800 rounded-xl p-6 hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {project.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-6 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Have a question or want to work together? Feel free to reach out.
          </p>
          <a
            href="mailto:hello@example.com"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Say Hello
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 text-center text-sm text-gray-500 dark:text-gray-600 border-t border-gray-200 dark:border-gray-800">
        &copy; {new Date().getFullYear()} GummyBear479. All rights reserved.
      </footer>
    </main>
  );
}
