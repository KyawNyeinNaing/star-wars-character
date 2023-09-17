import Home from '@/page-containers/Home';
import { Film, People } from '@/types';
import { FetchAPI, ParameterType } from '@/utils/api';
import { cn } from '@/utils/cn';
import { Container } from '@radix-ui/themes';
import Link from 'next/link';

const HomePage = async ({ searchParams }: { searchParams: ParameterType }) => {
  const page = typeof searchParams.page === 'string' ? Number(searchParams.page) : 1;
  const search = typeof searchParams.search === 'string' ? searchParams.search : '';
  const fetchApi = new FetchAPI();
  const people = (await fetchApi.getPeoples('people', {
    page,
    search,
  })) as People;

  return (
    <>
      <Home people={people?.results} search={search} page={page} />
    </>
  );
};

export default HomePage;
