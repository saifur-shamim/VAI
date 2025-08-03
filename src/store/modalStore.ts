// src/store/modalStore.ts
import { create } from 'zustand';
import type { TaskType } from './taskStore';

type ModalState = {
  isOpen: boolean;
  editingTask: TaskType | null;
  openModal: (task?: TaskType) => void;
  closeModal: () => void;
};

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  editingTask: null,
  openModal: (task = null) => set({ isOpen: true, editingTask: task }),
  closeModal: () => set({ isOpen: false, editingTask: null }),
}));
