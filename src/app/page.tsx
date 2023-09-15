import Home from '@/page-containers/Home';
import { People } from '@/types';
import { FetchAPI } from '@/utils/api';
import Image from 'next/image';

const HomePage = async () => {
  const fetchApi = new FetchAPI();
  const people = (await fetchApi.getPeoples('people', {
    page: '1',
  })) as People;

  return <Home people={people.results} />;
};

export default HomePage;
