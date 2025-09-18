import { create } from 'zustand';
import { groups as initialGroups } from '@/lib/data';
import type { Group } from '@/lib/types';

type GroupState = {
  groups: Group[];
  removeUserFromGroup: (groupId: string, userId: string) => void;
};

export const useGroupStore = create<GroupState>((set) => ({
  groups: initialGroups,
  removeUserFromGroup: (groupId, userId) =>
    set((state) => ({
      groups: state.groups.map((group) => {
        if (group.id === groupId) {
          return {
            ...group,
            members: group.members.filter((memberId) => memberId !== userId),
          };
        }
        return group;
      }),
    })),
}));
