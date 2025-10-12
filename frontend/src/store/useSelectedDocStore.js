import { create } from "zustand";

const useSelectedDocStore = create((set) => ({
  selectedDocId:
    typeof window !== "undefined"
      ? localStorage.getItem("selectedDocId")
      : null,

  setSelectedDocId: (id) => {
    localStorage.setItem("selectedDocId", id);
    set({ selectedDocId: id });
  },

  toggleSelect: (id) =>
    set((state) => {
      const newId = state.selectedDocId === id ? null : id;
      if (newId) localStorage.setItem("selectedDocId", newId);
      else localStorage.removeItem("selectedDocId");
      return { selectedDocId: newId };
    }),
}));

export default useSelectedDocStore;
