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
      const groupsWithUserRemoved = state.groups.map((group) => {
        if (group.id === groupId) {
          return {
            ...group,
            members: group.members.filter(
              (memberId) => memberId !== userId
            ),
          };
        }
        return group;
      });

      const updatedGroups = groupsWithUserRemoved.filter((group) => {
        // If the group is the one we modified, check if it has any members left.
        if (group.id === groupId) {
          return group.members.length > 0;
        }
        // Keep all other groups.
        return true;
      });

      return { groups: updatedGroups };
    }),
}));
