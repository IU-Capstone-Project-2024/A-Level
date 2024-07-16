import { AppProps } from 'next/app';
import '../styles/globals.css';
import { TabProvider } from '../context/TabContext';
import { TopicsProvider } from '../context/TopicContext';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <TopicsProvider>
      <TabProvider>
        <Component {...pageProps} />
      </TabProvider>
    </TopicsProvider>
  );
};

export default MyApp;
