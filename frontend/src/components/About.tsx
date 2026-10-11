import { motion } from 'framer-motion';
import { Code2, Cpu, Rocket, BookOpen } from 'lucide-react';

const About = () => {
  const highlights = [
    {
      icon: Code2,
      title: 'Full-Stack Development',
      description: 'Building complete applications from frontend to backend with modern technologies.',
    },
    {
      icon: Cpu,
      title: 'AI & Machine Learning',
      description: 'Exploring AI fundamentals, machine learning models, and data-driven solutions.',
    },
    {
      icon: Rocket,
      title: 'Product Thinking',
      description: 'Designing and developing technology products that solve real-world problems.',
    },
    {
      icon: BookOpen,
      title: 'Continuous Learning',
      description: 'Always experimenting with new technologies and deepening technical knowledge.',
    },
  ];

  return (
    <section id="about" className="section-container">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <h2 className="text-4xl font-bold mb-4 gradient-text">About Me</h2>
        <p className="text-gray-400 mb-8 max-w-2xl">📍 Based in Himachal Pradesh, India</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        {/* Left: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-gray-300 mb-4 leading-relaxed">
            I'm a B.Tech Computer Science student at Shivalik University, Dehradun, passionate about building meaningful digital products and exploring emerging technologies.
          </p>
          <p className="text-gray-300 mb-4 leading-relaxed">
            My journey spans full-stack web development, mobile app development with Flutter, backend systems design, and AI/ML experimentation. I approach every project with curiosity, learning by doing, and a focus on creating real value.
          </p>
          <p className="text-gray-300 mb-4 leading-relaxed">
            Beyond coding, I'm interested in product thinking, entrepreneurship, and understanding how technology can address meaningful problems. I'm actively working on startup concepts like WorkXphere and StayNest while building my technical foundation.
          </p>
        </motion.div>

        {/* Right: Highlights */}
        <motion.div className="grid sm:grid-cols-2 gap-4">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-effect p-4 rounded-lg hover:bg-white/10 transition-all"
              >
                <Icon className="text-accent-blue mb-3" size={24} />
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Education Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="text-2xl font-bold mb-6 gradient-text">Education</h3>
        <div className="glass-effect p-6 rounded-lg border-l-4 border-accent-blue">
          <h4 className="text-xl font-semibold mb-2">B.Tech in Computer Science and Engineering</h4>
          <p className="text-accent-cyan font-medium mb-2">Shivalik University, Dehradun</p>
          <p className="text-gray-400 mb-3">2021 - 2025</p>
          <p className="text-gray-300 text-sm">
            Focused on software engineering, computer science fundamentals, application development, and technical problem solving.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
