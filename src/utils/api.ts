import dayjs from "dayjs";

import {
  ApiResponse,
  Countries,
  CurrencyList,
  CurrencyLive,
  Rates
} from "@/types/currency";

interface ParameterType {
  [key: string]: string | string[];
}

export class FetchAPI {
  constructor() {}

  async sendApiRequest(
    path: string,
    parameters: ParameterType,
    apiDomain: string,
    method: string = "GET"
  ): Promise<ApiResponse> {
    const queryString = new URLSearchParams(parameters as any);

    return await fetch(`${apiDomain}/${path}?${queryString.toString()}`, {
      method,
      next: {
        revalidate: 3600
      }
    })
      .then(async (res: Response) => {
        const result = await res.json();
        return {
          ...result,
          lastUpdated: dayjs().format("ddd, DD MMM YYYY HH:mm:ss [GMT]")
        };
      })
      .catch((error: Error) => {
        console.log("ERROR ==>", JSON.stringify(error));
        throw new Error(error?.message);
      });
  }

  async getLive(
    path: string,
    params: ParameterType = {
      access_key: "48da1f6e032599b655161fceff498c5e"
    }
  ): Promise<CurrencyLive> {
    return await this.sendApiRequest(path, params, "http://apilayer.net");
  }
}
