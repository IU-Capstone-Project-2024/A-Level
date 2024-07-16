'use client';
import React, {
  createContext,
  useContext,
  useState,
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
