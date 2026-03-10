/**
 * PROTOCOL INTELLIGENCE TOOLS DEFINITIONS
 * ========================================
 * Configuration for all 20+ AI-powered tools available in the system
 * Each tool defines its UI, inputs, prompts, and purpose
 */

import {
  MessageCircle,
  Swords,
  Receipt,
  Stethoscope,
  FileSearch,
  FileText,
  Zap,
  Phone,
  Scale,
  PenTool,
  Briefcase,
  Clipboard,
  Pickaxe,
  GraduationCap,
  HeartHandshake,
  BookOpen,
  UserCheck,
  Utensils,
  Map,
  Share2,
  ImageIcon,
  RefreshCcw,
} from 'lucide-react';

/**
 * Concierge & General Tools
 */
export const ASSISTANT_TOOL = {
  id: 'assistant',
  label: 'Sovereign Assistant',
  icon: MessageCircle,
  category: 'Concierge',
  description: 'General Help & Chat',
  inputs: [],
  isChat: true,
  systemPrompt: `You are the Sovereign Guide for La Familia 479. Your goal is to help families move from 'Perishable' to 'Sovereign'. You are empathetic, knowledgeable about the Dignity Protocol (Waste-to-Asset conversion), and practical. Answer questions about the Land Trust, financial defense, or community healing.`,
};

export const SIMULATOR_TOOL = {
  id: 'simulator',
  label: 'Sovereignty Simulator',
  icon: Swords,
  category: 'Concierge',
  description: 'Roleplay Difficult Talks',
  inputs: [],
  isChat: true,
  systemPrompt: `You are a roleplay actor in a training simulation. The user is a tenant/worker/community member practicing a difficult conversation. You play the 'Opponent' (Landlord, Boss, Creditor). Be difficult, dismissive, or bureaucratic, but realistic. After the user responds, give a short critique in brackets like this: '[Dignity Score: 4/5. You held your ground well but try citing the law next time.]' followed by your next in-character response.`,
};

/**
 * Defense Tools - Legal & Financial Protection
 */
export const DEFENSE_TOOLS = [
  {
    id: 'a2i',
    label: 'A²I Exchange Planner',
    icon: Receipt,
    category: 'Defense',
    description: 'Convert Arrears/Debt',
    inputs: [
      { name: 'input1', label: 'Debt Amount & Owning Agency', placeholder: 'e.g., $4,500 owed to Arkansas Office of Child Support Enforcement' },
      { name: 'input2', label: 'Proposed Healing Action (Instead of Cash)', placeholder: 'e.g., 180 hours of property maintenance for La Familia 479 Land Trust, plus completing a 6-week parenting course.' },
    ],
  },
  {
    id: 'medical',
    label: 'Medical Advocate',
    icon: Stethoscope,
    category: 'Defense',
    description: 'Prepare for doctors',
    inputs: [
      { name: 'input1', label: 'Symptoms / Reason for Visit', placeholder: 'e.g., Severe lower back pain for 3 weeks, numbness in leg' },
      { name: 'input2', label: 'Your Concerns or Fears', placeholder: 'e.g., I\'m afraid they will just tell me to lose weight and refuse to do an X-ray like last time.' },
    ],
  },
  {
    id: 'sentinel',
    label: 'Contract Sentinel',
    icon: FileSearch,
    category: 'Defense',
    description: 'Audit leases/loans',
    inputs: [
      { name: 'input1', label: 'Paste Contract or Lease Text', placeholder: 'e.g., "The tenant agrees to pay a $50 daily late fee..."' },
    ],
  },
  {
    id: 'foia',
    label: 'FOIA Drafter',
    icon: FileText,
    category: 'Defense',
    description: 'Generate legal requests',
    inputs: [
      { name: 'input1', label: 'Target Entity (Who has the data?)', placeholder: 'e.g., Sebastian County Sheriff\'s Office' },
      { name: 'input2', label: 'Records Requested (What do you need?)', placeholder: 'e.g., All invoices related to inmate transportation services from Jan 2024 to present.' },
    ],
  },
  {
    id: 'decoder',
    label: 'Legalese Decoder',
    icon: Zap,
    category: 'Defense',
    description: 'Simplify complex docs',
    inputs: [
      { name: 'input1', label: 'Legal Text to Decode', placeholder: 'Paste complex legal language here...' },
    ],
  },
  {
    id: 'negotiator',
    label: 'Creditor Negotiator',
    icon: Phone,
    category: 'Defense',
    description: 'Fair Debt scripts',
    inputs: [
      { name: 'input1', label: 'Creditor Name', placeholder: 'e.g., Capital One Bank' },
      { name: 'input2', label: 'Situation', placeholder: 'e.g., I\'m 3 months behind on my credit card and they\'re threatening legal action.' },
    ],
  },
  {
    id: 'ordinance',
    label: 'Ordinance Watchdog',
    icon: Scale,
    category: 'Defense',
    description: 'Analyze local policy',
    inputs: [
      { name: 'input1', label: 'Ordinance Text or Policy', placeholder: 'Paste the regulation or local law here...' },
    ],
  },
];

/**
 * Growth Tools - Building Community Assets
 */
export const GROWTH_TOOLS = [
  {
    id: 'hustle',
    label: 'Hustle Architect',
    icon: Share2,
    category: 'Growth',
    description: 'Zero-capital business',
    inputs: [
      { name: 'input1', label: 'Micro-Business Idea', placeholder: 'e.g., Delivering homemade tamales to job sites' },
      { name: 'input2', label: 'Available Resources (Tools, Time, Cash)', placeholder: 'e.g., I have $30 for ingredients, my kitchen, and 3 free hours on Saturday mornings.' },
    ],
  },
  {
    id: 'impact',
    label: 'Impact Narrator',
    icon: PenTool,
    category: 'Growth',
    description: 'Write grant reports',
    inputs: [
      { name: 'input1', label: 'Impact Story / Narrative', placeholder: 'Brief description or story of the impact being created...' },
    ],
  },
  {
    id: 'barter',
    label: 'Barter Arbitrator',
    icon: RefreshCcw,
    category: 'Growth',
    description: 'Fair trade calculator',
    inputs: [
      { name: 'input1', label: 'Offer A (What you have)', placeholder: 'e.g., 20 lbs of heirloom tomatoes' },
      { name: 'input2', label: 'Offer B (What they have/you need)', placeholder: 'e.g., Fixing a leaky kitchen sink (approx 1 hour)' },
    ],
  },
  {
    id: 'grant',
    label: 'Grant Architect',
    icon: Briefcase,
    category: 'Growth',
    description: 'Draft proposals',
    inputs: [
      { name: 'input1', label: 'Grant Section Name', placeholder: 'e.g., Impact Narrative, Budget Justification, Sustainability Plan' },
      { name: 'input2', label: 'Grant Context / Topic', placeholder: 'e.g., Community Land Trust development in rural Arkansas' },
    ],
  },
  {
    id: 'meeting',
    label: 'Meeting Synthesizer',
    icon: Clipboard,
    category: 'Growth',
    description: 'Clean up notes',
    inputs: [
      { name: 'input1', label: 'Meeting Notes', placeholder: 'Paste raw meeting notes, transcripts, or bullet points here...' },
    ],
  },
  {
    id: 'miner',
    label: 'Dignity Miner',
    icon: Pickaxe,
    category: 'Growth',
    description: 'Find hidden assets',
    inputs: [
      { name: 'input1', label: 'Family Narrative / Story', placeholder: 'Tell the story of what a family or person has accomplished...' },
    ],
  },
  {
    id: 'tutor',
    label: 'Sovereignty Tutor',
    icon: GraduationCap,
    category: 'Growth',
    description: 'Personal curriculum',
    inputs: [
      { name: 'input1', label: 'Topic to Learn', placeholder: 'e.g., How to write a winning grant proposal' },
      { name: 'input2', label: 'Context / Background', placeholder: 'e.g., I\'ve never written a grant before, I\'m a community organizer' },
    ],
  },
  {
    id: 'mediator',
    label: 'Community Mediator',
    icon: HeartHandshake,
    category: 'Growth',
    description: 'Conflict script (NVC)',
    inputs: [
      { name: 'input1', label: 'Conflict Situation', placeholder: 'e.g., I\'m upset because my neighbor won\'t stop dumping trash in my yard' },
      { name: 'input2', label: 'Context', placeholder: 'e.g., We\'ve lived next to each other for 3 years, used to be friendly' },
    ],
  },
  {
    id: 'legacy',
    label: 'Legacy Keeper',
    icon: BookOpen,
    category: 'Growth',
    description: 'Record family history',
    inputs: [
      { name: 'input1', label: 'Family Member Name / Subject', placeholder: 'e.g., Abuela Maria - founder of community garden' },
      { name: 'input2', label: 'Key Stories or Accomplishments', placeholder: 'e.g., Came from Mexico in 1989, raised 4 kids alone, started gardening' },
    ],
  },
  {
    id: 'resume',
    label: 'Resilience Resume',
    icon: UserCheck,
    category: 'Growth',
    description: 'Translate informal work',
    inputs: [
      { name: 'input1', label: 'Informal Experience / Accomplishment', placeholder: 'e.g., "I took care of my siblings, managed the household budget"' },
    ],
  },
  {
    id: 'chef',
    label: 'Pantry Chef',
    icon: Utensils,
    category: 'Growth',
    description: 'Zero-waste meal plans',
    inputs: [
      { name: 'input1', label: 'Available Ingredients', placeholder: 'e.g., Rice, beans, tomatoes, onions, garlic, cilantro' },
    ],
  },
  {
    id: 'vision',
    label: 'Vision Mapper',
    icon: Map,
    category: 'Growth',
    description: '5-Year Roadmaps',
    inputs: [
      { name: 'input1', label: 'Your Dream / Goal', placeholder: 'e.g., Own a small bakery and employ 10 people from the community' },
    ],
  },
  {
    id: 'social',
    label: 'Social Amplifier',
    icon: Share2,
    category: 'Growth',
    description: 'Generate viral posts',
    inputs: [
      { name: 'input1', label: 'Impact Story / News', placeholder: 'e.g., We just secured a $50k grant and 3 new families moved into safe housing this week' },
    ],
  },
  {
    id: 'painter',
    label: 'Vision Painter',
    icon: ImageIcon,
    category: 'Growth',
    description: 'Visualize dreams',
    inputs: [
      { name: 'input1', label: 'Describe Your Dream to Visualize', placeholder: 'e.g., A community garden with raised beds, sunflowers, and happy families harvesting vegetables in the golden hour light...' },
    ],
  },
];

/**
 * Combine all tools for easy lookup
 */
export const ALL_TOOLS = [
  ASSISTANT_TOOL,
  SIMULATOR_TOOL,
  ...DEFENSE_TOOLS,
  ...GROWTH_TOOLS,
];

/**
 * Get tool config by ID
 */
export const getToolById = (toolId) => {
  return ALL_TOOLS.find((tool) => tool.id === toolId);
};

/**
 * Get tools by category
 */
export const getToolsByCategory = (category) => {
  return ALL_TOOLS.filter((tool) => tool.category === category);
};

/**
 * Tool categories for UI organization
 */
export const TOOL_CATEGORIES = [
  { id: 'Concierge', label: 'Concierge', icon: MessageCircle },
  { id: 'Defense', label: 'Defense Tools', icon: FileSearch },
  { id: 'Growth', label: 'Growth Tools', icon: Share2 },
];
