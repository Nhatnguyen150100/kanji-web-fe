import axiosRequest from '../plugins/request';
import { IBaseResponse } from '../types/response.types';

class ProfileService {
  private _prefixURL = '/v1/profile';

  public async updateKanji(
    id: string,
    data: Record<string, any>,
  ): Promise<IBaseResponse<any>> {
    try {
      const rs = await axiosRequest.put(`${this._prefixURL}/${id}`, data);
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default ProfileService;
