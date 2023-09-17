import dayjs from 'dayjs';

import {
  ApiResponse,
  Film,
  People,
  PeopleResult,
  Planet,
  RelativeFilm,
  RelativeHomeWorld,
  ResultFilm,
  Species,
  StarShips,
  Vehicle,
} from '@/types';

export interface ParameterType {
  search?: string | string[] | undefined;
  format?: string;
  page?: number;
}

export class FetchAPI {
  apiDomain: string = 'swapi.dev'; // process.env.API_DOMAIN
  baseUrl: string;
  constructor() {
    this.baseUrl = `https://${this.apiDomain}/api`;
  }
  async sendApiRequest(
    api: string,
    parameters: ParameterType,
    method: string = 'GET'
  ): Promise<ApiResponse & RelativeFilm & RelativeHomeWorld> {
    const queryString = new URLSearchParams(parameters as any);
    return await fetch(`${this.baseUrl}/${api}?${queryString.toString()}`, {
      method,
      next: {
        revalidate: 3600,
      },
    })
      .then(async (res: Response) => {
        const result = await res.json();

        return {
          ...result,
          lastFetchUpdated: dayjs().format('ddd, DD MMM YYYY HH:mm:ss [GMT]'),
        };
      })
      .catch((error: Error) => {
        console.log('error -> ', error);
        console.log('ERROR ==>', JSON.stringify(error));
        throw new Error(error?.message);
      });
  }

  async getPeoples(path: string, params: ParameterType): Promise<People> {
    return await this.sendApiRequest(path, params);
  }

  async getRelativeHomeworld(
    path: string,
    homeworld: any,
    params: ParameterType
  ): Promise<RelativeHomeWorld> {
    try {
      const match = homeworld?.match(/\/(\d+)\/$/);
      if (!match) return { status: false };
      const res = match && (await this.sendApiRequest(`${path}/${match[1]}`, params));
      return {
        name: res?.name,
        terrain: res?.terrain,
        climate: res?.climate,
        residents: res?.residents,
      };
    } catch (error) {
      return {
        status: false,
      };
    }
  }

  async getPlanets(path: string, params: ParameterType): Promise<Planet> {
    return await this.sendApiRequest(path, params);
  }

  async getFilms(path: string, params: ParameterType): Promise<Film> {
    return await this.sendApiRequest(path, params);
  }

  async getRelativeFilm(
    path: string,
    films: any,
    params: ParameterType
  ): Promise<{ data: RelativeFilm[] }> {
    try {
      const data = await Promise.all(
        films.map(async (each: any) => {
          const match = each.match(/\/(\d+)\/$/);
          const res = match && (await this.sendApiRequest(`${path}/${match[1]}`, params));
          return {
            title: res?.title,
            url: res?.url,
          };
        })
      );
      return { data };
    } catch (error) {
      return { data: [] };
    }
  }

  async getVehicle(path: string, params: ParameterType): Promise<Vehicle> {
    return await this.sendApiRequest(path, params);
  }

  async getStarShips(path: string, params: ParameterType): Promise<StarShips> {
    return await this.sendApiRequest(path, params);
  }

  async getSpecies(path: string, params: ParameterType): Promise<Species> {
    return await this.sendApiRequest(path, params);
  }
}
