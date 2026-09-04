// Edit this file to add or update projects.
// No UI changes needed.

export const projects = [
  {
    id: 'medscan-ai',
    slug: 'medscan-ai',
    title: 'MedScan AI',
    category: 'Full-Stack / CNNs',
    tagline: 'A full-stack medical imaging diagnosis platform powered by CNN models.',

    description:
      'A full-stack web application integrating four CNN models to analyze X-ray, MRI, and CT scans for tuberculosis, brain tumors, lung cancer, and bone fractures.',

    overview:
      'MedScan AI brings multiple deep learning models together in a single web application, allowing users to upload scans, select the appropriate diagnostic model, and receive prediction results with confidence scores and downloadable reports.',

    problem:
      'Various research models have been developed for medical image diagnosis using MRI, X-ray, and CT scans, but these solutions are often limited to individual research implementations. There is a lack of a unified platform that provides users with access to multiple AI-based diagnostic models across different medical imaging modalities through a single application.',

    solution:
      'I built a full-stack platform that integrates four CNN models with a web interface for scan uploads, model selection, authentication, prediction results, confidence scores, and downloadable analysis reports.',

    approach:
      'The platform connects multiple CNN-based classification models with a full-stack application. Users upload a scan, select the appropriate model, and receive per-class prediction probabilities to understand the model output.',

    technologies: [
      'React.js',
      'Node.js',
      'FastAPI',
      'MongoDB',
      'JWT',
      'PyTorch',
      'TensorFlow',
      'CNNs',
      'Hugging Face'
    ],

    metrics: [
      {
        label: 'Diagnostic models',
        value: '4',
      },
      {
        label: 'Top model accuracy',
        value: ' 100%',
      },
      {
        label: 'Remaining models',
        value: '99.85% - 96.87%',
      },
    ],

    features: [
      'Upload X-ray, MRI, and CT scans',
      'Select the appropriate diagnostic model',
      'JWT-based user authentication',
      'Per-class prediction probabilities and confidence scores',
      'Downloadable analysis reports',
      'Contact page for user inquiries',
    ],

    learnings:
      'Building MedScan AI strengthened my experience in integrating deep learning models with full-stack applications and presenting model predictions and confidence scores through a practical user interface.',

    github: 'https://github.com/Anmol-Singh-Chehal/MedScan-AI-Website.git',
    live: 'https://medscan-ai-six.vercel.app/',
  },

  {
    id: 'plantdx',
    slug: 'plantdx',
    title: 'PlantDx',
    category: 'Full-Stack / Transformers',
    tagline:
      'A full-stack fruit plant leaf disease classification platform powered by transformer models.',

    description:
      'A full-stack website leveraging four transformer-based models to classify leaf diseases across apple, mango, cherry, and grape plants.',

    overview:
      'PlantDx allows users to upload leaf images, select the appropriate classification model, and receive multi-class disease predictions with confidence scores, along with downloadable diagnostic reports.',

    problem:
      'Various deep learning and transformer-based models have been developed for plant leaf disease classification through research studies and individual machine learning implementations. However, these solutions are often limited to standalone models, research experiments, or notebooks, making them difficult for users to access and use in practice. There is a lack of a unified platform that provides access to multiple leaf disease classification models across different fruit plants through a single application.',

    solution:
      'I developed a full-stack platform that integrates four transformer-based models with an interactive web interface for image uploads, model selection, disease classification, confidence scoring, authentication, and report generation.',

    approach:
      'The platform uses four transformer-based models for classifying diseases across apple, mango, cherry, and grape plants. Users upload a leaf image, select the appropriate model, and receive a multi-class prediction indicating whether the leaf is healthy or diseased.',

    technologies: [
      'React.js',
      'Node.js',
      'FastAPI',
      'MongoDB',
      'JWT',
      'timm',
      'Transformers',
      'Hugging Face'
    ],

    metrics: [
      {
        label: 'Diagnostic models',
        value: '4',
      },
      {
        label: 'Top model accuracy',
        value: ' 100%',
      },
      {
        label: 'Remaining models',
        value: '99.46% - 	98.75%',
      },
    ],

    features: [
      'Upload fruit plant leaf images',
      'Select the appropriate classification model',
      'Multi-class disease predictions',
      'Healthy vs. diseased classification',
      'Confidence scores for predictions',
      'JWT-based user authentication',
      'Downloadable diagnostic reports',
    ],

    learnings:
      'Building PlantDx strengthened my experience with transformer-based computer vision models and integrating machine learning predictions into a complete full-stack application.',

    github: 'https://github.com/Anmol-Singh-Chehal/PlantDx-website.git',
    live: 'https://plantdx-six.vercel.app/',
  },
]

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug)
}