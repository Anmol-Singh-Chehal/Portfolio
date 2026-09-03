// Edit this file to add or update projects. No UI changes needed.
// Only include metrics you can actually back up — the UI will simply
// omit a metrics row if the `metrics` array is empty.

export const projects = [
  {
    id: 'medscan-ai',
    slug: 'medscan-ai',
    title: 'MedScan AI',
    category: 'AI / Full-Stack',
    tagline: 'A full-stack diagnostic platform that reads X-ray, MRI and CT scans.',
    description:
      'A full-stack medical imaging platform that integrates four CNN models to analyze X-ray, MRI and CT scans for tuberculosis, brain tumors, lung cancer, and bone fractures.',
    overview:
      'MedScan AI lets a user upload a scan, choose the relevant diagnostic model, and receive a confidence-scored prediction along with a downloadable report — bringing four separate deep learning models together behind one authenticated web interface.',
    problem:
      'Radiology screening tools are often locked inside research notebooks or single-purpose scripts, with no interface a clinician or student could actually use, and no consistent way to compare a model\u2019s confidence across classes.',
    solution:
      'I built a MERN-based web application that wraps four trained CNN models behind a single upload-and-select flow, added JWT authentication so scan history stays private per user, and designed a reporting layer that turns raw model output into a downloadable, per-class confidence breakdown.',
    approach:
      'Each condition — tuberculosis, brain tumors, lung cancer, and wrist/elbow/hand/foot fractures — is served by its own CNN, selected by the user at upload time. The backend returns per-class prediction probabilities rather than a single label, so the report shows exactly how confident the model was in the finding (for example, fracture vs. normal).',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'PyTorch', 'TensorFlow', 'CNNs'],
    metrics: [
      { label: 'Diagnostic models', value: '4' },
      { label: 'Top model accuracy', value: '99.00%+' },
      { label: 'Remaining models', value: '98.00%+' },
    ],
    features: [
      'Upload a scan and select the relevant diagnostic model',
      'JWT-based login and signup for private scan history',
      'Per-class confidence scoring, not just a single prediction',
      'Downloadable analysis reports',
      'Contact page for follow-up questions',
    ],
    learnings:
      'Serving four independent models behind one interface pushed me to think carefully about how a non-technical user reads a confidence score, and about keeping the upload-to-report flow simple even as the backend logic grew.',
    github: 'https://github.com/Anmol-Singh-Chehal',
    live: '',
  },
  {
    id: 'plantdx',
    slug: 'plantdx',
    title: 'PlantDx',
    category: 'Computer Vision / Transformers',
    tagline: 'Transformer-based leaf disease classification for four fruit crops.',
    description:
      'A full-stack platform that uses four transformer-based models to classify leaf diseases across apple, mango, cherry and grape plants from a single uploaded photo.',
    overview:
      'PlantDx lets a user photograph a leaf, pick the plant type, and get a multi-class prediction — healthy or a specific disease — with a confidence score and a downloadable diagnostic report, backed by JWT-authenticated accounts.',
    problem:
      'Fruit growers and students often need a fast, visual way to tell whether a leaf shows early disease symptoms, but most classification demos stop at a Jupyter notebook and never become something a real user could upload a photo to.',
    solution:
      'I trained four transformer-based classifiers, one per plant type, and wrapped them in a full-stack MERN application where a user uploads a leaf image, selects the matching plant, and receives a multi-class prediction with confidence scores and a downloadable report.',
    approach:
      'Each plant — apple, mango, cherry, and grape — has its own transformer-based model, so the classification head is tuned to the disease patterns specific to that crop rather than a single generalized classifier across all four.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'PyTorch', 'Transformers'],
    metrics: [
      { label: 'Plant types covered', value: '4' },
      { label: 'Model architecture', value: 'Transformer-based' },
    ],
    features: [
      'Upload a leaf photo and select the plant type',
      'Multi-class healthy-vs-disease prediction with confidence scores',
      'JWT-based user authentication',
      'Downloadable diagnostic reports',
    ],
    learnings:
      'Working with transformer-based vision models across four distinct crops taught me how much a classification UI needs to communicate uncertainty clearly — a confidence score means little without context for the person reading it.',
    github: 'https://github.com/Anmol-Singh-Chehal',
    live: '',
  },
]

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug)
}
