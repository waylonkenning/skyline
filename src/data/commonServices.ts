export interface CommonService {
  name: string;
  vendor: string;
  category: string;
  defaultCost: number;
  billingCycle: 'monthly' | 'annual';
  description: string;
}

export const COMMON_SERVICES: CommonService[] = [
  // Accounting & Finance
  { name: 'Xero', vendor: 'Xero', category: 'Finance', defaultCost: 42, billingCycle: 'monthly', description: 'Cloud accounting software for small businesses' },
  { name: 'QuickBooks Online', vendor: 'Intuit', category: 'Finance', defaultCost: 30, billingCycle: 'monthly', description: 'Accounting software for small businesses' },
  { name: 'FreshBooks', vendor: 'FreshBooks', category: 'Finance', defaultCost: 19, billingCycle: 'monthly', description: 'Accounting and invoicing software' },
  { name: 'MYOB', vendor: 'MYOB', category: 'Finance', defaultCost: 49, billingCycle: 'monthly', description: 'Accounting software (AU/NZ popular)' },
  { name: 'Sage Accounting', vendor: 'Sage', category: 'Finance', defaultCost: 35, billingCycle: 'monthly', description: 'Accounting and payroll software' },
  { name: 'Stripe', vendor: 'Stripe', category: 'Finance', defaultCost: 0, billingCycle: 'monthly', description: 'Online payment processing' },
  { name: 'PayPal Business', vendor: 'PayPal', category: 'Finance', defaultCost: 0, billingCycle: 'monthly', description: 'Payment processing for businesses' },
  { name: 'Square', vendor: 'Block', category: 'Finance', defaultCost: 0, billingCycle: 'monthly', description: 'Payment processing and POS' },

  // Productivity
  { name: 'Microsoft 365 Business', vendor: 'Microsoft', category: 'Productivity', defaultCost: 22, billingCycle: 'monthly', description: 'Office suite with Teams, Outlook, SharePoint' },
  { name: 'Google Workspace', vendor: 'Google', category: 'Productivity', defaultCost: 18, billingCycle: 'monthly', description: 'Gmail, Drive, Docs, Meet bundle' },
  { name: 'Notion', vendor: 'Notion Labs', category: 'Productivity', defaultCost: 16, billingCycle: 'monthly', description: 'All-in-one workspace for notes and docs' },
  { name: 'Dropbox', vendor: 'Dropbox', category: 'Productivity', defaultCost: 12, billingCycle: 'monthly', description: 'Cloud storage and file sharing' },
  { name: 'OneDrive', vendor: 'Microsoft', category: 'Productivity', defaultCost: 6, billingCycle: 'monthly', description: 'Personal cloud storage' },
  { name: 'Google Drive', vendor: 'Google', category: 'Productivity', defaultCost: 2, billingCycle: 'monthly', description: 'Personal cloud storage (100GB)' },
  { name: 'Canva', vendor: 'Canva', category: 'Productivity', defaultCost: 15, billingCycle: 'monthly', description: 'Design and visual content creation' },
  { name: 'Adobe Creative Cloud', vendor: 'Adobe', category: 'Productivity', defaultCost: 60, billingCycle: 'monthly', description: 'Design and creative software suite' },
  { name: 'LibreOffice', vendor: 'The Document Foundation', category: 'Productivity', defaultCost: 0, billingCycle: 'monthly', description: 'Free open source office suite' },

  // Communication
  { name: 'Microsoft Teams', vendor: 'Microsoft', category: 'Communication', defaultCost: 13, billingCycle: 'monthly', description: 'Video meetings, chat, collaboration' },
  { name: 'Slack', vendor: 'Salesforce', category: 'Communication', defaultCost: 12, billingCycle: 'monthly', description: 'Team communication and chat' },
  { name: 'Zoom', vendor: 'Zoom Video Communications', category: 'Communication', defaultCost: 16, billingCycle: 'monthly', description: 'Video conferencing platform' },
  { name: 'Google Meet', vendor: 'Google', category: 'Communication', defaultCost: 8, billingCycle: 'monthly', description: 'Video meetings (with Workspace)' },
  { name: 'Discord', vendor: 'Discord Inc.', category: 'Communication', defaultCost: 0, billingCycle: 'monthly', description: 'Free voice and text chat' },
  { name: 'RingCentral', vendor: 'RingCentral', category: 'Communication', defaultCost: 25, billingCycle: 'monthly', description: 'Business phone and video meetings' },

  // Security
  { name: 'CrowdStrike Falcon', vendor: 'CrowdStrike', category: 'Security', defaultCost: 15, billingCycle: 'monthly', description: 'Endpoint protection and threat intelligence' },
  { name: 'Norton Business', vendor: 'NortonLifeLock', category: 'Security', defaultCost: 10, billingCycle: 'monthly', description: 'Antivirus and security software' },
  { name: 'McAfee Enterprise', vendor: 'McAfee', category: 'Security', defaultCost: 10, billingCycle: 'monthly', description: 'Endpoint security and antivirus' },
  { name: '1Password Business', vendor: '1Password', category: 'Security', defaultCost: 8, billingCycle: 'monthly', description: 'Password manager for teams' },
  { name: 'LastPass Teams', vendor: 'LastPass', category: 'Security', defaultCost: 4, billingCycle: 'monthly', description: 'Password management for teams' },
  { name: 'Bitwarden', vendor: 'Bitwarden', category: 'Security', defaultCost: 6, billingCycle: 'monthly', description: 'Open source password manager' },
  { name: 'Okta', vendor: 'Okta', category: 'Security', defaultCost: 8, billingCycle: 'monthly', description: 'Identity and access management' },
  { name: 'Auth0', vendor: 'Okta', category: 'Security', defaultCost: 0, billingCycle: 'monthly', description: 'Authentication platform (free tier available)' },
  { name: 'Cloudflare', vendor: 'Cloudflare', category: 'Security', defaultCost: 0, billingCycle: 'monthly', description: 'CDN, DNS, and security services' },

  // CRM & Sales
  { name: 'Salesforce', vendor: 'Salesforce', category: 'Finance', defaultCost: 75, billingCycle: 'monthly', description: 'CRM and enterprise cloud computing' },
  { name: 'HubSpot CRM', vendor: 'HubSpot', category: 'Finance', defaultCost: 0, billingCycle: 'monthly', description: 'Free CRM with marketing tools' },
  { name: 'Zoho CRM', vendor: 'Zoho', category: 'Finance', defaultCost: 14, billingCycle: 'monthly', description: 'Affordable CRM platform' },
  { name: 'Pipedrive', vendor: 'Pipedrive', category: 'Finance', defaultCost: 15, billingCycle: 'monthly', description: 'Sales CRM for small businesses' },

  // HR & Payroll
  { name: 'Gusto', vendor: 'Gusto', category: 'Finance', defaultCost: 6, billingCycle: 'monthly', description: 'Payroll, benefits, and HR software' },
  { name: 'BambooHR', vendor: 'BambooHR', category: 'Finance', defaultCost: 8, billingCycle: 'monthly', description: 'HR software for small businesses' },
  { name: 'Xero Payroll', vendor: 'Xero', category: 'Finance', defaultCost: 8, billingCycle: 'monthly', description: 'Payroll management addon' },

  // Development
  { name: 'GitHub', vendor: 'Microsoft', category: 'Development', defaultCost: 4, billingCycle: 'monthly', description: 'Code hosting and Git repository' },
  { name: 'GitLab', vendor: 'GitLab Inc.', category: 'Development', defaultCost: 4, billingCycle: 'monthly', description: 'Complete DevOps platform' },
  { name: 'Bitbucket', vendor: 'Atlassian', category: 'Development', defaultCost: 3, billingCycle: 'monthly', description: 'Git code management' },
  { name: 'Jira Software', vendor: 'Atlassian', category: 'Development', defaultCost: 8, billingCycle: 'monthly', description: 'Project and issue tracking' },
  { name: 'Linear', vendor: 'Linear', category: 'Development', defaultCost: 8, billingCycle: 'monthly', description: 'Modern project management for software teams' },
  { name: 'Figma', vendor: 'Figma', category: 'Development', defaultCost: 15, billingCycle: 'monthly', description: 'Collaborative design tool' },
  { name: 'VS Code', vendor: 'Microsoft', category: 'Development', defaultCost: 0, billingCycle: 'monthly', description: 'Free code editor' },

  // Infrastructure
  { name: 'AWS', vendor: 'Amazon', category: 'Infrastructure', defaultCost: 100, billingCycle: 'monthly', description: 'Cloud computing platform' },
  { name: 'Microsoft Azure', vendor: 'Microsoft', category: 'Infrastructure', defaultCost: 100, billingCycle: 'monthly', description: 'Cloud services platform' },
  { name: 'Google Cloud', vendor: 'Google', category: 'Infrastructure', defaultCost: 100, billingCycle: 'monthly', description: 'Cloud computing services' },
  { name: 'DigitalOcean', vendor: 'DigitalOcean', category: 'Infrastructure', defaultCost: 6, billingCycle: 'monthly', description: 'Simple cloud hosting' },
  { name: 'Heroku', vendor: 'Salesforce', category: 'Infrastructure', defaultCost: 7, billingCycle: 'monthly', description: 'Cloud application platform' },
  { name: 'Vercel', vendor: 'Vercel', category: 'Infrastructure', defaultCost: 0, billingCycle: 'monthly', description: 'Frontend cloud platform (free tier)' },
  { name: 'Netlify', vendor: 'Netlify', category: 'Infrastructure', defaultCost: 0, billingCycle: 'monthly', description: 'Web hosting and automation (free tier)' },
  { name: 'MongoDB Atlas', vendor: 'MongoDB', category: 'Infrastructure', defaultCost: 0, billingCycle: 'monthly', description: 'Cloud database (free tier available)' },
];

export function getCommonServicesByCategory(categoryName: string): CommonService[] {
  return COMMON_SERVICES.filter(s => s.category === categoryName);
}

export function searchCommonServices(query: string): CommonService[] {
  const q = query.toLowerCase();
  return COMMON_SERVICES.filter(s => 
    s.name.toLowerCase().includes(q) || 
    s.vendor.toLowerCase().includes(q) ||
    s.description.toLowerCase().includes(q)
  );
}

export const CATEGORIES_WITH_COMMON_SERVICES = [
  'Productivity',
  'Communication', 
  'Security',
  'Finance',
  'Development',
  'Infrastructure',
];
