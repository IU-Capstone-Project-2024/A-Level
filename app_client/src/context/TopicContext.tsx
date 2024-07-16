import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from 'react';
import axios, { AxiosResponse } from 'axios';

interface TopicTransformResp {
  names: string[];
}

interface TopicsContextType {
  topics: TopicTransformResp | undefined;
  fetchTopics: () => void;
}

const TopicsContext = createContext<TopicsContextType | undefined>(undefined);

const TopicsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [topics, setTopics] = useState<TopicTransformResp | undefined>(
    undefined,
  );

  const fetchTopics = async () => {
    const topicTransformResp: AxiosResponse<TopicTransformResp> =
      await axios.get(
        'https://chartreuse-binghamite1373.my-vm.work/utils/topicEnum',
      );
    if (topicTransformResp.status === 200) {
      setTopics(topicTransformResp.data);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  return (
    <TopicsContext.Provider value={{ topics, fetchTopics }}>
      {children}
    </TopicsContext.Provider>
  );
};

const useTopics = (): TopicsContextType => {
  const context = useContext(TopicsContext);
  if (!context) {
    throw new Error('useTopics must be used within a TopicsProvider');
  }
  return context;
};

export { TopicsProvider, useTopics };
