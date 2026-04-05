export interface Alternative {
  id: string;
  name: string;
  vendor: string;
  category: string;
  relativeCost: 'cheaper' | 'similar' | 'expensive';
  description: string;
}

export const ALTERNATIVES_DATA: Alternative[] = [
  { id: 'alt-1', name: 'Microsoft 365', vendor: 'Microsoft', category: 'Productivity', relativeCost: 'similar', description: 'Office productivity suite' },
  { id: 'alt-2', name: 'Google Workspace', vendor: 'Google', category: 'Productivity', relativeCost: 'similar', description: 'Cloud-based productivity suite' },
  { id: 'alt-3', name: 'Zoho Workplace', vendor: 'Zoho', category: 'Productivity', relativeCost: 'cheaper', description: 'Affordable productivity suite' },
  { id: 'alt-4', name: 'OnlyOffice', vendor: 'Ascensio System', category: 'Productivity', relativeCost: 'cheaper', description: 'Open source office suite' },
  { id: 'alt-5', name: 'LibreOffice', vendor: 'The Document Foundation', category: 'Productivity', relativeCost: 'cheaper', description: 'Free open source office suite' },
  { id: 'alt-6', name: 'Slack', vendor: 'Salesforce', category: 'Communication', relativeCost: 'similar', description: 'Team communication platform' },
  { id: 'alt-7', name: 'Microsoft Teams', vendor: 'Microsoft', category: 'Communication', relativeCost: 'similar', description: 'Collaboration and communication' },
  { id: 'alt-8', name: 'Discord', vendor: 'Discord Inc.', category: 'Communication', relativeCost: 'cheaper', description: 'Free voice and text chat' },
  { id: 'alt-9', name: 'Mattermost', vendor: 'Mattermost', category: 'Communication', relativeCost: 'cheaper', description: 'Open source Slack alternative' },
  { id: 'alt-10', name: 'Zoom', vendor: 'Zoom Video Communications', category: 'Communication', relativeCost: 'similar', description: 'Video conferencing' },
  { id: 'alt-11', name: 'Google Meet', vendor: 'Google', category: 'Communication', relativeCost: 'cheaper', description: 'Free video meetings' },
  { id: 'alt-12', name: 'Jitsi', vendor: '8x8', category: 'Communication', relativeCost: 'cheaper', description: 'Free open source video conferencing' },
  { id: 'alt-13', name: 'GitHub', vendor: 'Microsoft', category: 'Development', relativeCost: 'similar', description: 'Code hosting and collaboration' },
  { id: 'alt-14', name: 'GitLab', vendor: 'GitLab Inc.', category: 'Development', relativeCost: 'similar', description: 'Complete DevOps platform' },
  { id: 'alt-15', name: 'Bitbucket', vendor: 'Atlassian', category: 'Development', relativeCost: 'cheaper', description: 'Git code management' },
  { id: 'alt-16', name: 'SourceForge', vendor: 'SourceForge', category: 'Development', relativeCost: 'cheaper', description: 'Open source software discovery' },
  { id: 'alt-17', name: 'AWS', vendor: 'Amazon', category: 'Infrastructure', relativeCost: 'expensive', description: 'Cloud computing platform' },
  { id: 'alt-18', name: 'Microsoft Azure', vendor: 'Microsoft', category: 'Infrastructure', relativeCost: 'similar', description: 'Cloud services platform' },
  { id: 'alt-19', name: 'Google Cloud', vendor: 'Google', category: 'Infrastructure', relativeCost: 'similar', description: 'Cloud computing services' },
  { id: 'alt-20', name: 'DigitalOcean', vendor: 'DigitalOcean', category: 'Infrastructure', relativeCost: 'cheaper', description: 'Simple cloud hosting' },
  { id: 'alt-21', name: 'Heroku', vendor: 'Salesforce', category: 'Infrastructure', relativeCost: 'similar', description: 'Cloud application platform' },
  { id: 'alt-22', name: 'Vercel', vendor: 'Vercel', category: 'Infrastructure', relativeCost: 'cheaper', description: 'Frontend cloud platform' },
  { id: 'alt-23', name: 'Netlify', vendor: 'Netlify', category: 'Infrastructure', relativeCost: 'cheaper', description: 'Web hosting and automation' },
  { id: 'alt-24', name: 'Cloudflare', vendor: 'Cloudflare', category: 'Infrastructure', relativeCost: 'cheaper', description: 'CDN and security services' },
  { id: 'alt-25', name: '1Password', vendor: '1Password', category: 'Security', relativeCost: 'similar', description: 'Password manager for teams' },
  { id: 'alt-26', name: 'LastPass', vendor: 'LastPass', category: 'Security', relativeCost: 'cheaper', description: 'Password manager' },
  { id: 'alt-27', name: 'Bitwarden', vendor: 'Bitwarden', category: 'Security', relativeCost: 'cheaper', description: 'Open source password manager' },
  { id: 'alt-28', name: 'Okta', vendor: 'Okta', category: 'Security', relativeCost: 'expensive', description: 'Identity management platform' },
  { id: 'alt-29', name: 'Auth0', vendor: 'Okta', category: 'Security', relativeCost: 'expensive', description: 'Authentication platform' },
  { id: 'alt-30', name: 'Dropbox', vendor: 'Dropbox', category: 'Productivity', relativeCost: 'similar', description: 'Cloud storage and file sync' },
  { id: 'alt-31', name: 'Google Drive', vendor: 'Google', category: 'Productivity', relativeCost: 'cheaper', description: 'Free cloud storage' },
  { id: 'alt-32', name: 'OneDrive', vendor: 'Microsoft', category: 'Productivity', relativeCost: 'similar', description: 'Cloud storage from Microsoft' },
  { id: 'alt-33', name: 'Box', vendor: 'Box', category: 'Productivity', relativeCost: 'similar', description: 'Cloud content management' },
  { id: 'alt-34', name: 'Notion', vendor: 'Notion Labs', category: 'Productivity', relativeCost: 'similar', description: 'All-in-one workspace' },
  { id: 'alt-35', name: 'Confluence', vendor: 'Atlassian', category: 'Productivity', relativeCost: 'similar', description: 'Team knowledge base' },
  { id: 'alt-36', name: 'Monday.com', vendor: 'Monday.com', category: 'Productivity', relativeCost: 'similar', description: 'Work management platform' },
  { id: 'alt-37', name: 'Asana', vendor: 'Asana', category: 'Productivity', relativeCost: 'similar', description: 'Project management tool' },
  { id: 'alt-38', name: 'Trello', vendor: 'Atlassian', category: 'Productivity', relativeCost: 'cheaper', description: 'Kanban-style boards' },
  { id: 'alt-39', name: 'Jira', vendor: 'Atlassian', category: 'Development', relativeCost: 'similar', description: 'Issue and project tracking' },
  { id: 'alt-40', name: 'Linear', vendor: 'Linear', category: 'Development', relativeCost: 'cheaper', description: 'Modern project management' },
  { id: 'alt-41', name: 'Figma', vendor: 'Figma', category: 'Development', relativeCost: 'similar', description: 'Collaborative design tool' },
  { id: 'alt-42', name: 'Sketch', vendor: 'Sketch', category: 'Development', relativeCost: 'similar', description: 'Vector design tool' },
  { id: 'alt-43', name: 'Canva', vendor: 'Canva', category: 'Productivity', relativeCost: 'cheaper', description: 'Design and publishing' },
  { id: 'alt-44', name: 'Adobe Creative Cloud', vendor: 'Adobe', category: 'Productivity', relativeCost: 'expensive', description: 'Creative software suite' },
  { id: 'alt-45', name: 'Salesforce', vendor: 'Salesforce', category: 'Finance', relativeCost: 'expensive', description: 'CRM platform' },
  { id: 'alt-46', name: 'HubSpot', vendor: 'HubSpot', category: 'Finance', relativeCost: 'similar', description: 'Marketing and CRM platform' },
  { id: 'alt-47', name: 'Zoho CRM', vendor: 'Zoho', category: 'Finance', relativeCost: 'cheaper', description: 'Affordable CRM solution' },
  { id: 'alt-48', name: 'Stripe', vendor: 'Stripe', category: 'Finance', relativeCost: 'similar', description: 'Online payment processing' },
  { id: 'alt-49', name: 'QuickBooks', vendor: 'Intuit', category: 'Finance', relativeCost: 'similar', description: 'Accounting software' },
  { id: 'alt-50', name: 'FreshBooks', vendor: 'FreshBooks', category: 'Finance', relativeCost: 'cheaper', description: 'Cloud accounting for freelancers' },
];

export function getAlternativesByCategory(category: string): Alternative[] {
  return ALTERNATIVES_DATA.filter(alt => alt.category === category);
}

export function searchAlternatives(query: string): Alternative[] {
  const q = query.toLowerCase();
  return ALTERNATIVES_DATA.filter(alt => 
    alt.name.toLowerCase().includes(q) || 
    alt.vendor.toLowerCase().includes(q)
  );
}
