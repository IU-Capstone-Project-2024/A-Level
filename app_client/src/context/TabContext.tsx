'use client';
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';

type TabType =
  | 'browse'
  | 'uploaded'
  | 'questions'
  | 'create'
  | 'generate'
  | 'saved'
  | 'about'
  | ''
  | 'document'
  | 'question'
  | null;

interface TabContextType {
  tab: TabType;
  setTab: Dispatch<SetStateAction<TabType>>;
}

const TabContext = createContext<TabContextType | undefined>(undefined);

export const TabProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [tab, setTab] = useState<TabType>(null);

  // Load tab state from local storage when the component mounts
  useEffect(() => {
    const storedTab = localStorage.getItem('tab');
    if (storedTab) {
      setTab(storedTab as TabType);
    }
  }, []);

  // Save tab state to local storage whenever it changes
  useEffect(() => {
    if (tab !== null) {
      localStorage.setItem('tab', tab);
    }
  }, [tab]);

  return (
    <TabContext.Provider value={{ tab, setTab }}>
      {children}
    </TabContext.Provider>
  );
};

export const useTab = () => {
  const context = useContext(TabContext);
  if (context === undefined) {
    throw new Error('useTab must be used within a TabProvider');
  }
  return context;
};
