import Home from '@/page-containers/Home';
import { Film, People, Planet, Species } from '@/types';
import { FetchAPI, ParameterType } from '@/utils/api';

const HomePage = async ({ searchParams }: { searchParams: ParameterType }) => {
  const page = typeof searchParams.page === 'string' ? Number(searchParams.page) : 1;
  const search = typeof searchParams.search === 'string' ? searchParams.search : '';
  const fetchApi = new FetchAPI();

  const people = (await fetchApi.getPeoples('people', {
    page,
    search,
  })) as People;
  const planets = (await fetchApi.getPlanets('planets', {
    page: 1,
  })) as Planet;
  const species = (await fetchApi.getSpecies('species', {
    page: 1,
  })) as Species;
  const films = (await fetchApi.getFilms('films', {
    page: 1,
  })) as Film;

  return (
    <>
      <Home
        people={people?.results}
        planets={planets?.results}
        species={species?.results}
        films={films?.results}
        search={search}
        page={page}
      />
    </>
  );
};

export default HomePage;
