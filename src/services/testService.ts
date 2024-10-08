import axiosRequest from '../plugins/request';
import { IBaseResponse } from '../types/response.types';

class TestService {
  private _prefixURL = '/v1/test';

  public async saveScore(
    data: Record<string, any>,
  ): Promise<IBaseResponse<any>> {
    try {
      const rs = await axiosRequest.post(this._prefixURL, data);
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default TestService;
