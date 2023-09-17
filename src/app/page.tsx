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
      <Container size="4">
        <div className="flex items-center justify-end gap-x-[10px]">
          <Link
            href={{
              pathname: '/',
              query: {
                ...(search ? { search } : {}),
                page: page > 1 ? page - 1 : 1,
              },
            }}
            className={cn(
              'rounded border bg-gray-100 px-3 py-1 text-sm text-gray-800',
              page <= 1 && 'pointer-events-none opacity-50'
            )}
          >
            Previous
          </Link>
          <Link
            href={{
              pathname: '/',
              query: {
                ...(search ? { search } : {}),
                page: page + 1,
              },
            }}
            className="rounded border bg-gray-100 px-3 py-1 text-sm text-gray-800"
          >
            Next
          </Link>
        </div>
      </Container>
      <Home people={people?.results} />
    </>
  );
};

export default HomePage;
