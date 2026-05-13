
import { Project, BlogPost, Experience, Publication } from './types';

// Simple Frontmatter Parser to avoid heavy dependencies and polyfill issues
const parseFrontmatter = (text: string) => {
  // Match YAML block between ---
  const pattern = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = text.match(pattern);
  
  if (!match) {
    // If no frontmatter, return empty attributes and full text
    return { attributes: {} as any, body: text };
  }

  const yaml = match[1];
  const body = match[2].trim();
  const attributes: any = {};
  
  let currentKey: string | null = null;

  yaml.split('\n').forEach(line => {
    // Skip empty lines
    if (!line.trim()) return;
    
    // Handle list items (e.g., tags)
    if (line.trim().startsWith('- ')) {
      if (currentKey && Array.isArray(attributes[currentKey])) {
        attributes[currentKey].push(line.trim().substring(2));
      }
      return;
    }

    const colonIndex = line.indexOf(':');
    if (colonIndex !== -1) {
      const key = line.substring(0, colonIndex).trim();
      const value = line.substring(colonIndex + 1).trim();
      
      if (value === '') {
        // Start of a list (e.g., "tags:")
        currentKey = key;
        attributes[key] = [];
      } else {
        // Simple key-value
        currentKey = null;
        attributes[key] = value;
      }
    }
  });

  return { attributes, body };
};

// Helper to load content dynamically
const loadContent = <T>(files: Record<string, any>, type: 'project' | 'blog'): T[] => {
  return Object.entries(files).map(([path, mod]) => {
    const id = path.split('/').pop()?.replace('.md', '') || '';
    const content = mod.default as string;
    const parsed = parseFrontmatter(content);
    
    return {
      id,
      ...parsed.attributes,
      markdown: parsed.body
    } as T;
  });
};

// Load Projects
const projectFiles = import.meta.glob('./content/projects/*.md', { eager: true, query: '?raw' });
export const PROJECTS: Project[] = loadContent<Project>(projectFiles, 'project')
  .sort((a, b) => {
    const orderA = a.order ? Number(a.order) : 999;
    const orderB = b.order ? Number(b.order) : 999;
    return orderA - orderB;
  });

// Load Blog Posts
const blogFiles = import.meta.glob('./content/posts/*.md', { eager: true, query: '?raw' });
export const BLOG_POSTS: BlogPost[] = loadContent<BlogPost>(blogFiles, 'blog')
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export const EXPERIENCES: Experience[] = [
  {
    company: "Wyser LTD",
    role: "Junior Data Scientist",
    period: "May 2024 – June 2025",
    description: [
      "Collaborated with academic partners on a research project addressing sociolinguistic biases in Automatic Speech Recognition (ASR) models for regional dialects in the UK public service sector.",
      "Delivered the final project presentation to UK Research and Innovation evaluating technical achievements for ASR research project contributing to a highly positive funder review.",
      "Designed and implemented a public benchmarking leaderboard and white paper on the project website, showcasing the comparative performance of ASR models on UK regional accents.",
      "Developed data pipelines encompassing data cleaning, inference, and visualisation, providing actionable insights into the comparative performance of finetuned Whisper and Gemini multimodal transcription models on UK accents.",
      "Developed a Key Information error rate metric, which used NER models and LLMs to quantify the ability of different ASR models to capture important facts.",
      "Engineered a custom text normaliser to improve data consistency by standardising transcription styles, addressing variations in date formatting and spacing.",
      "Designed comparative experiments to evaluate the performance of different text summarisation and speaker diarisation methods."
    ]
  },
  {
    company: "TELUS International AI-Data Solutions",
    role: "Data Analyst",
    period: "Sep 2020 – May 2024",
    description: [
      "Labelled and annotated AI training data, including map-related data, images and text, to ensure accuracy and relevance for machine learning models.",
      "Ensured all data collection and evaluation processes were consistent with the client’s precise guidelines."
    ]
  }
];

export const PUBLICATIONS: Publication[] = [
  {
    title: "Adapting Whisper for Regional Dialects: Enhancing Public Services for Vulnerable Populations in the United Kingdom",
    authors: "Torgbi, M., Clayman, A., Speight, J.J. and Madabushi, H.T.",
    venue: "ACL Anthology",
    year: "2025",
    month: "Jan",
    link: "https://aclanthology.org/2025.vardial-1.4/"
  },
  {
    title: "Inclusive ASR for Critical Public Services: Debiasing with Actor-Simulated Speech",
    authors: "Torgbi, M., Clayman, A., Speight, J., Hirst, J. and Madabushi, H.T.",
    venue: "International Conference on Text, Speech, and Dialogue",
    year: "2025",
    month: "Aug",
    link: "https://link.springer.com/chapter/10.1007/978-3-032-02548-7_28"
  }
];

