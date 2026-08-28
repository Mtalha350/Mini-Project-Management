import type { Project } from '../types/project';

export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Website Redesign',
    description:
      'Redesign the company website with a modern and responsive experience.',
    status: 'Active',
    completedTasks: 6,
    totalTasks: 8,
    createdAt: '2026-08-20',
    assignedUserId: 1,
  },
  {
    id: '2',
    name: 'Mobile Application',
    description: 'Build the new mobile application for iOS and Android.',
    status: 'Active',
    completedTasks: 5,
    totalTasks: 10,
    createdAt: '2026-08-18',
    assignedUserId: 2,
  },
  {
    id: '3',
    name: 'Marketing Campaign',
    description: 'Launch the Q3 marketing campaign across all major channels.',
    status: 'Completed',
    completedTasks: 12,
    totalTasks: 12,
    createdAt: '2026-08-10',
    assignedUserId: 3,
  },
  {
    id: '4',
    name: 'Internal Dashboard',
    description:
      'Create an internal dashboard for monitoring business metrics.',
    status: 'Active',
    completedTasks: 4,
    totalTasks: 9,
    createdAt: '2026-08-05',
    assignedUserId: 4,
  },
  {
    id: '5',
    name: 'Design System',
    description:
      'Build reusable UI components and establish the company design system.',
    status: 'Completed',
    completedTasks: 15,
    totalTasks: 15,
    createdAt: '2026-07-28',
    assignedUserId: 5,
  },
  {
    id: '6',
    name: 'Customer Portal',
    description:
      'Develop a self-service customer portal for account management.',
    status: 'Active',
    completedTasks: 3,
    totalTasks: 12,
    createdAt: '2026-07-20',
    assignedUserId: 6,
  },
];
