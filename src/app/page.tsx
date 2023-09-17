import Home from '@/page-containers/Home';
import { Film, People } from '@/types';
import { FetchAPI, ParameterType } from '@/utils/api';

const HomePage = async ({ searchParams }: { searchParams: ParameterType }) => {
  const search = typeof searchParams.search === 'string' ? searchParams.search : '';
  const fetchApi = new FetchAPI();
  const people = (await fetchApi.getPeoples('people', {
    page: '1',
    search,
  })) as People;

  return <Home people={people.results} />;
};

export default HomePage;
