import { motion } from 'framer-motion';
import { ChevronDown, Github, Linkedin } from 'lucide-react';
import { useState } from 'react';

const Hero = () => {
  const [activeHeadline, setActiveHeadline] = useState(0);
  const headlines = [
    'Full-Stack Developer',
    'App & Web Developer',
    'AI/ML Enthusiast',
    'Future Startup Founder',
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-dark-950 to-dark-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-96 h-96 bg-accent-blue/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent-violet/10 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        className="relative z-10 section-container text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Profile Image Placeholder */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="w-32 h-32 mx-auto rounded-full border-4 border-accent-blue bg-dark-800 flex items-center justify-center overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-accent-blue to-accent-cyan flex items-center justify-center text-3xl font-bold text-dark-950">
              SB
            </div>
          </div>
        </motion.div>

        {/* Main Title */}
        <motion.h1 variants={itemVariants} className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6">
          Hi, I'm <span className="gradient-text">Shiva Bharti</span>
        </motion.h1>

        {/* Dynamic Headline */}
        <motion.div variants={itemVariants} className="mb-8 h-12 flex items-center justify-center">
          <motion.div
            key={activeHeadline}
            className="text-2xl sm:text-3xl text-accent-cyan font-semibold"
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 4 }}
            onAnimationComplete={() => setActiveHeadline((prev) => (prev + 1) % headlines.length)}
          >
            {headlines[activeHeadline]}
          </motion.div>
        </motion.div>

        {/* Tagline */}
        <motion.p variants={itemVariants} className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
          I build web applications, mobile experiences, and technology-driven products while exploring the possibilities of artificial intelligence and machine learning.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <a href="#projects" className="btn-primary">
            Explore My Projects
          </a>
          <a href="#contact" className="btn-secondary">
            Contact Me
          </a>
          <a
            href="#resume"
            className="btn-ghost border border-accent-blue text-accent-blue hover:bg-accent-blue/10"
          >
            Download Resume
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div variants={itemVariants} className="flex justify-center gap-4 mb-12">
          <a
            href="https://github.com/shivabharti9080"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-dark-800 hover:bg-dark-700 hover:text-accent-blue transition-colors"
          >
            <Github size={24} />
          </a>
          <a
            href="https://linkedin.com/in/shiva-bharti-11285537b/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-dark-800 hover:bg-dark-700 hover:text-accent-blue transition-colors"
          >
            <Linkedin size={24} />
          </a>
          <a
            href="mailto:shivabharti9080@gmail.com"
            className="p-3 rounded-full bg-dark-800 hover:bg-dark-700 hover:text-accent-blue transition-colors"
          >
            <span className="text-2xl">✉️</span>
          </a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          variants={itemVariants}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="text-accent-blue" size={28} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
