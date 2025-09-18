import type { User, Group, Message } from '@/lib/types';
import { placeholderImages } from './placeholder-images.json';

export const currentUser: User = {
  id: 'user-1',
  name: 'Alex',
  avatarUrl: placeholderImages.find(p => p.id === "user-1")?.imageUrl || '',
  bio: 'Just a friendly chatter looking for interesting conversations.',
};

export const users: User[] = [
  currentUser,
  {
    id: 'user-2',
    name: 'Beth',
    avatarUrl: placeholderImages.find(p => p.id === "user-2")?.imageUrl || '',
    bio: 'Frontend developer and cat enthusiast.',
  },
  {
    id: 'user-3',
    name: 'Charlie',
    avatarUrl: placeholderImages.find(p => p.id === "user-3")?.imageUrl || '',
    bio: 'Exploring the world, one chat at a time.',
  },
];

export const groups: Group[] = [
  {
    id: 'group-1',
    name: 'Tech Innovators',
    creatorId: 'user-1',
    description: 'Discussing the future of technology and innovation.',
    avatarUrl: placeholderImages.find(p => p.id === "group-1")?.imageUrl || '',
    members: [
      { userId: 'user-1', team: 'A' },
      { userId: 'user-2', team: 'B' },
    ],
    teamsEnabled: true,
  },
  {
    id: 'group-2',
    name: 'Bookworms Corner',
    creatorId: 'user-1',
    description: 'A cozy place for book lovers to share their reads.',
    avatarUrl: placeholderImages.find(p => p.id === "group-2")?.imageUrl || '',
    members: [
      { userId: 'user-1', team: null },
      { userId: 'user-3', team: null },
    ],
    teamsEnabled: false,
  },
  {
    id: 'group-3',
    name: 'Global Travelers',
    creatorId: 'user-2',
    description: 'Share your travel stories and tips.',
    avatarUrl: placeholderImages.find(p => p.id === "group-3")?.imageUrl || '',
    members: [
      { userId: 'user-2', team: 'A' },
      { userId: 'user-3', team: 'B' },
    ],
    teamsEnabled: true,
  },
  {
    id: 'group-4',
    name: 'Gaming Guild',
    creatorId: 'user-1',
    description: 'For all things gaming, from retro to modern.',
    avatarUrl: placeholderImages.find(p => p.id === "group-4")?.imageUrl || '',
    members: [
      { userId: 'user-1', team: 'A' },
      { userId: 'user-2', team: 'A' },
      { userId: 'user-3', team: 'B' },
    ],
    teamsEnabled: true,
  },
  {
    id: 'group-5',
    name: 'Foodies Unite',
    creatorId: 'user-1',
    description: 'A group for sharing recipes and culinary adventures.',
    avatarUrl: placeholderImages.find(p => p.id === "group-5")?.imageUrl || '',
    members: [{ userId: 'user-1', team: null }],
    teamsEnabled: false,
  },
];

const now = new Date();

export const messages: Message[] = [
  {
    id: 'msg-1',
    groupId: 'group-1',
    userId: 'user-1',
    text: 'Hey everyone, excited to be here!',
    timestamp: new Date(now.getTime() - 1000 * 60 * 5),
  },
  {
    id: 'msg-2',
    groupId: 'group-1',
    userId: 'user-2',
    text: 'Welcome, Alex! What new tech are you excited about?',
    timestamp: new Date(now.getTime() - 1000 * 60 * 4),
  },
  {
    id: 'msg-3',
    groupId: 'group-2',
    userId: 'user-3',
    text: 'Just finished an amazing fantasy novel. Anyone have recommendations?',
    timestamp: new Date(now.getTime() - 1000 * 60 * 10),
  },
];
