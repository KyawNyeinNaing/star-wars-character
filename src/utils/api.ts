import dayjs from 'dayjs';

import { ApiResponse, People } from '@/types';

interface ParameterType {
  [key: string]: string | string[];
}

export class FetchAPI {
  apiDomain: string = 'swapi.dev'; // process.env.API_DOMAIN
  apiUrl: string;
  constructor() {
    this.apiUrl = `https://${this.apiDomain}/api`;
  }
  async sendApiRequest(api: string, parameters: ParameterType, method: string = 'GET'): Promise<ApiResponse> {
    const queryString = new URLSearchParams(parameters as any);
    return await fetch(`${this.apiUrl}/${api}?${queryString.toString()}`, {
      method,
      next: {
        revalidate: 3600,
      },
    })
      .then(async (res: Response) => {
        const result = await res.json();

        return {
          ...result,
        };
      })
      .catch((error: Error) => {
        console.log('ERROR ==>', JSON.stringify(error));
        throw new Error(error?.message);
      });
  }

  async getPeoples(path: string, params: ParameterType = {}): Promise<People> {
    return await this.sendApiRequest(path, params);
  }
}
