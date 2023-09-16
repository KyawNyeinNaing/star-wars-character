import dayjs from 'dayjs';

import { ApiResponse, Film, People, Planet, Species, StarShips, Vehicle } from '@/types';

export interface ParameterType {
  search?: string | string[] | undefined;
  format?: string;
  page: string;
  [key: string]: string | string[] | undefined;
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
  ): Promise<ApiResponse> {
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
        console.log('ERROR ==>', JSON.stringify(error));
        throw new Error(error?.message);
      });
  }

  async getPeoples(path: string, params: ParameterType): Promise<People> {
    return await this.sendApiRequest(path, params);
  }

  async getPlanets(path: string, params: ParameterType): Promise<Planet> {
    return await this.sendApiRequest(path, params);
  }

  async getFilms(path: string, params: ParameterType): Promise<Film> {
    return await this.sendApiRequest(path, params);
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
