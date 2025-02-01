import React, { createContext, useContext, useState, ReactNode } from "react";

interface ModalContextType {
  visibleModalId: string | null;
  showModal: (modalId: string) => void;
  hideModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [visibleModalId, setVisibleModalId] = useState<string | null>(null);

  const showModal = (modalId: string) => setVisibleModalId(modalId);
  const hideModal = () => setVisibleModalId(null);

  return (
    <ModalContext.Provider value={{ visibleModalId, showModal, hideModal }}>
      {children}
    </ModalContext.Provider>
  );
};

// Custom hook for using modal context
export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
