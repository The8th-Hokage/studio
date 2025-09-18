import { create } from 'zustand';
import { groups as initialGroups, users } from '@/lib/data';
import type { Group } from '@/lib/types';

type GroupState = {
  groups: Group[];
  addGroup: (group: Group) => void;
  removeUserFromGroup: (groupId: string, userId: string) => void;
  updateUltimateNumber: (groupId: string, number: number, userId: string) => void;
};

export const useGroupStore = create<GroupState>((set) => ({
  groups: initialGroups,
  addGroup: (group) => set((state) => ({ groups: [...state.groups, group] })),
  removeUserFromGroup: (groupId, userId) =>
    set((state) => {
      let groupIsEmpty = false;
      const groupsWithUserRemoved = state.groups.map((group) => {
        if (group.id === groupId) {
          const newMembers = group.members.filter(
            (memberId) => memberId !== userId
          );
          if (newMembers.length === 0) {
            groupIsEmpty = true;
          }
          return {
            ...group,
            members: newMembers,
          };
        }
        return group;
      });

      if (groupIsEmpty) {
        return {
          groups: groupsWithUserRemoved.filter((group) => group.id !== groupId),
        };
      }

      return { groups: groupsWithUserRemoved };
    }),
  updateUltimateNumber: (groupId, number, userId) =>
    set((state) => ({
      groups: state.groups.map((group) => {
        if (group.id === groupId) {
          const user = users.find((u) => u.id === userId);
          return {
            ...group,
            ultimateNumber: number,
            ultimateUser: user?.name || 'Unknown',
          };
        }
        return group;
      }),
    })),
}));
