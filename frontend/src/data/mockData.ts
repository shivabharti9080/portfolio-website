export const mockData = {
  skills: [
    { name: 'React.js', category: 'Frontend', level: 86, description: 'Component-driven UI development, state management, and performance tuning.' },
    { name: 'TypeScript', category: 'Frontend', level: 84, description: 'Typed interfaces and scalable frontend architecture.' },
    { name: 'Tailwind CSS', category: 'Frontend', level: 82, description: 'Rapid mobile-first design and modern UX styling.' },
    { name: 'Node.js', category: 'Backend', level: 80, description: 'Server-side logic, REST APIs, and backend architecture.' },
    { name: 'Express.js', category: 'Backend', level: 78, description: 'API services, middleware, validation, and authentication flow.' },
    { name: 'MongoDB', category: 'Database', level: 72, description: 'Model design for application data and portfolio content.' },
    { name: 'Flutter', category: 'App Development', level: 70, description: 'Cross-platform app interfaces and mobile UX thinking.' },
    { name: 'Python', category: 'Programming', level: 76, description: 'Automation, scripting, and AI/ML experimentation.' },
    { name: 'Machine Learning', category: 'AI & ML', level: 68, description: 'Concept-building in models, evaluation, and data-driven experimentation.' },
    { name: 'Git & GitHub', category: 'Tools', level: 88, description: 'Version control, branching, deployment workflows, and collaboration.' }
  ],
  projects: [
    {
      id: 'workxphere',
      slug: 'workxphere',
      name: 'WorkXphere',
      category: 'Workplace Management Platform',
      description: 'A workplace management platform concept focused on attendance, salary visibility, leave management, notices, and communication.',
      status: 'In Development',
      tech: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind'],
      repoUrl: 'https://github.com/shivabharti9080',
      liveUrl: '#',
      featured: true,
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80',
      fullDescription: 'WorkXphere is a concept platform for managing worker communication, attendance records, salary history, leave processes, and notices between workers, HR, and administrators.',
      features: ['Admin dashboard', 'Worker panel', 'HR panel', 'Attendance transparency', 'Leave and payout workflows']
    },
    {
      id: 'staynest',
      slug: 'staynest',
      name: 'StayNest',
      category: 'Accommodation Discovery',
      description: 'A residential listing concept for hostels, PGs, flats, and lifestyle services near the user.',
      status: 'Prototype',
      tech: ['React', 'Express', 'MongoDB', 'UI/UX'],
      repoUrl: 'https://github.com/shivabharti9080',
      liveUrl: '#',
      featured: true,
      image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
      fullDescription: 'StayNest helps users discover accommodation options with filters, local amenities, offers, and service availability information for day-to-day living.',
      features: ['Search and filters', 'PG and hostel listings', 'Meal and service options', 'Booking enquiry experience', 'Property details']
    },
    {
      id: 'zipit',
      slug: 'zipit',
      name: 'Zipit',
      category: 'Product Concept',
      description: 'A product concept currently being shaped with placeholders for deeper detail and feature definition.',
      status: 'Planned',
      tech: ['React', 'Node.js', 'Product Thinking'],
      repoUrl: '#',
      liveUrl: '#',
      featured: false,
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
      fullDescription: 'Zipit is a placeholder project entry for a future product idea that will be refined as the product direction becomes clearer.',
      features: ['Placeholder concept', 'Future product roadmap', 'Editable details', 'Demo-ready structure']
    }
  ],
  brands: [
    {
      id: 'novexora',
      slug: 'novexora',
      name: 'Novexora',
      type: 'Tech startup / software product brand',
      description: 'A technology-driven brand focused on useful digital products and software solutions.',
      positioning: 'Building practical digital systems with a focus on product thinking, engineering, and user experience.',
      status: 'Idea / In Development',
      accent: 'from-blue-500 to-cyan-500',
      website: '#',
      social: '#'
    },
    {
      id: 'novexplore',
      slug: 'novexplore',
      name: 'NoveXplore',
      type: 'Startup / app idea',
      description: 'A product concept exploring digital experiences and technology-driven user journeys.',
      positioning: 'Exploring value-driven product opportunities through design, experimentation, and engineering learning.',
      status: 'Prototype',
      accent: 'from-violet-500 to-fuchsia-500',
      website: '#',
      social: '#'
    }
  ],
  experience: [
    {
      id: 'edu',
      title: 'B.Tech in Computer Science and Engineering',
      organization: 'Shivalik University, Dehradun',
      startDate: '2021',
      endDate: '2025',
      description: 'Focused on software engineering, computer science fundamentals, application development, and technical problem solving.',
      technologies: ['CSE', 'Software Engineering', 'Problem Solving', 'Web Development'],
      type: 'Education'
    },
    {
      id: 'ai-lab',
      title: 'AI & ML Learning Projects',
      organization: 'Self-directed learning',
      startDate: '2024',
      endDate: 'Present',
      description: 'Exploring machine learning fundamentals, mathematics for AI, and applied experiments with Python and predictive modeling.',
      technologies: ['Python', 'NumPy', 'Pandas', 'scikit-learn', 'AI foundations'],
      type: 'Learning'
    },
    {
      id: 'product-ideas',
      title: 'Startup and Product Concept Building',
      organization: 'Independent work',
      startDate: '2024',
      endDate: 'Present',
      description: 'Designing product concepts for workforce systems, stay discovery, and technology experiences that solve real user problems.',
      technologies: ['Product Thinking', 'UX', 'Research', 'Entrepreneurship'],
      type: 'Project'
    }
  ],
  aiModels: [
    {
      id: 'ml-explorer',
      name: 'ML Explorer',
      category: 'Experiment',
      description: 'A modular AI/ML sandbox for experimenting with feature engineering, model evaluation, and data insights.',
      status: 'Coming Soon',
      dataset: 'Custom sample data',
      inputs: ['Dataset CSV', 'Feature selection', 'Model parameters']
    },
    {
      id: 'predictive-demo',
      name: 'Predictive Insights Demo',
      category: 'Model Demo',
      description: 'A placeholder model demonstration for prediction workflows and data-driven outputs.',
      status: 'Prototype',
      dataset: 'Synthetic dataset',
      inputs: ['Feature values', 'Model parameters', 'Threshold tuning']
    }
  ],
  githubRepos: [
    { name: 'workxsphere', url: 'https://github.com/raj-113192007/workxsphere', language: 'Dart' },
    { name: 'StayNest_usr_app', url: 'https://github.com/raj-113192007/StayNest_usr_app', language: 'Dart' },
    { name: 'shiva-portfolio-frontend', url: 'https://github.com/shivabharti9080/shiva-portfolio-frontend', language: 'HTML' },
    { name: 'shivabharti.github.io', url: 'https://github.com/shivabharti9080/shivabharti.github.io', language: 'HTML' }
  ]
};
