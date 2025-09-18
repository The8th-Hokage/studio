export type User = {
  id: string;
  name: string;
  avatarUrl: string;
  bio: string;
};

export type Group = {
  id: string;
  name: string;
  description: string;
  avatarUrl: string;
  members: string[];
};

export type Message = {
  id: string;
  groupId: string;
  userId: string;
  text: string;
  timestamp: Date;
  isSafe?: boolean;
  reason?: string;
};
