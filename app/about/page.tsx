export default function AboutPage() {
  return (
    <div className="flex flex-col justify-center min-h-screen max-w-3xl mx-auto text-green-400 p-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in">About Me</h1>
      <div className="space-y-4 animate-fade-in animation-delay-200">
        <p>
          Hello! I'm a passionate web developer with expertise in React, Next.js,
          Three.js, and modern web technologies. I love creating intuitive, performant,
          and visually stunning user interfaces that solve real-world problems.
        </p>
        <p>
          With several years of experience in the industry, I've worked on a variety
          of projects ranging from small business websites to large-scale enterprise
          applications. I'm always eager to learn new technologies and push the
          boundaries of what's possible on the web.
        </p>
        <p>
          My specialty lies in creating immersive 3D experiences on the web,
          blending cutting-edge technology with artistic design to craft memorable
          user experiences.
        </p>
        <p>
          When I'm not coding, you can find me exploring new VR technologies,
          contributing to open-source projects, or experimenting with generative art.
        </p>
      </div>
    </div>
  )
}

