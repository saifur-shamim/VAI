// src/store/modalStore.ts
import { create } from 'zustand';
import type { TaskType } from './taskStore';

type ModalState = {
  isOpen: boolean;
  editingTask?: TaskType;
  openModal: (task?: TaskType) => void;
  closeModal: () => void;
};

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  editingTask: undefined,
  openModal: (task) => set({ isOpen: true, editingTask: task }),
  closeModal: () => set({ isOpen: false, editingTask: undefined }),
}));

