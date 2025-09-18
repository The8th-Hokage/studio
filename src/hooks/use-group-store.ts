import { create } from 'zustand';
import { groups as initialGroups } from '@/lib/data';
import type { Group } from '@/lib/types';

type GroupState = {
  groups: Group[];
  addGroup: (group: Group) => void;
  removeUserFromGroup: (groupId: string, userId: string) => void;
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
}));
