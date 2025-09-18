import { create } from 'zustand';
import { groups as initialGroups, users } from '@/lib/data';
import type { Group } from '@/lib/types';

type GroupState = {
  groups: Group[];
  addGroup: (group: Group) => void;
  removeUserFromGroup: (groupId: string, userId: string) => void;
  updateUltimateNumber: (groupId: string, number: number, userId: string) => void;
  resetUltimateNumber: (groupId: string) => void;
};

export const useGroupStore = create<GroupState>((set) => ({
  groups: initialGroups,
  addGroup: (group) => set((state) => ({ groups: [...state.groups, group] })),
  removeUserFromGroup: (groupId, userId) =>
    set((state) => {
      const targetGroup = state.groups.find((g) => g.id === groupId);
      const isLastMember = targetGroup ? targetGroup.members.length === 1 : false;

      if (isLastMember) {
        // If the last member is leaving, remove the group entirely.
        return {
          groups: state.groups.filter((group) => group.id !== groupId),
        };
      } else {
        // Otherwise, just remove the user from the group's members list.
        return {
          groups: state.groups.map((group) => {
            if (group.id === groupId) {
              return {
                ...group,
                members: group.members.filter(
                  (memberId) => memberId !== userId
                ),
              };
            }
            return group;
          }),
        };
      }
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
  resetUltimateNumber: (groupId) =>
    set((state) => ({
      groups: state.groups.map((group) => {
        if (group.id === groupId) {
          return {
            ...group,
            ultimateNumber: undefined,
            ultimateUser: undefined,
          };
        }
        return group;
      }),
    })),
}));
