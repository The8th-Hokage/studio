export type User = {
  id: string;
  name: string;
  avatarUrl: string;
  bio: string;
};

export type Team = 'A' | 'B' | null;

export type GroupMember = {
  userId: string;
  team: Team;
};

export type Group = {
  id: string;
  name: string;
  description: string;
  avatarUrl: string;
  members: GroupMember[];
  creatorId: string;
  teamsEnabled?: boolean;
  ultimateNumber?: number;
  ultimateUser?: string;
  ultimateUserId?: string;
  gameEndTime?: number;
  winnerId?: string;
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
