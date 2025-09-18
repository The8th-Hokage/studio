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
    description: 'Discussing the future of technology and innovation.',
    avatarUrl: placeholderImages.find(p => p.id === "group-1")?.imageUrl || '',
    members: ['user-1', 'user-2'],
  },
  {
    id: 'group-2',
    name: 'Bookworms Corner',
    description: 'A cozy place for book lovers to share their reads.',
    avatarUrl: placeholderImages.find(p => p.id === "group-2")?.imageUrl || '',
    members: ['user-1', 'user-3'],
  },
  {
    id: 'group-3',
    name: 'Global Travelers',
    description: 'Share your travel stories and tips.',
    avatarUrl: placeholderImages.find(p => p.id === "group-3")?.imageUrl || '',
    members: ['user-2', 'user-3'],
  },
  {
    id: 'group-4',
    name: 'Gaming Guild',
    description: 'For all things gaming, from retro to modern.',
    avatarUrl: placeholderImages.find(p => p.id === "group-4")?.imageUrl || '',
    members: ['user-1', 'user-2', 'user-3'],
  },
  {
    id: 'group-5',
    name: 'Foodies Unite',
    description: 'A group for sharing recipes and culinary adventures.',
    avatarUrl: placeholderImages.find(p => p.id === "group-5")?.imageUrl || '',
    members: ['user-1'],
  },
];

export const messages: Message[] = [
  {
    id: 'msg-1',
    groupId: 'group-1',
    userId: 'user-1',
    text: 'Hey everyone, excited to be here!',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
  },
  {
    id: 'msg-2',
    groupId: 'group-1',
    userId: 'user-2',
    text: 'Welcome, Alex! What new tech are you excited about?',
    timestamp: new Date(Date.now() - 1000 * 60 * 4),
  },
  {
    id: 'msg-3',
    groupId: 'group-2',
    userId: 'user-3',
    text: 'Just finished an amazing fantasy novel. Anyone have recommendations?',
    timestamp: new Date(Date.now() - 1000 * 60 * 10),
  },
];
