import axiosRequest from '../plugins/request';
import { IQueryKanji, IKanji } from '../types/kanji.types';
import { IBaseResponse, IBaseResponseList } from '../types/response.types';
import onRemoveParams from '../utils/functions/on-remove-params';

class KanjiService {
  private _prefixURL = '/v1/kanji';

  public async listKanji(
    query: Partial<IQueryKanji>,
  ): Promise<IBaseResponse<IBaseResponseList<IKanji[]>>> {
    try {
      const rs = await axiosRequest.get(`${this._prefixURL}/list`, {
        params: onRemoveParams(query),
      });
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async getDetailKanji(id: string): Promise<IBaseResponse<IKanji>> {
    try {
      const rs = await axiosRequest.get(`${this._prefixURL}/${id}`);
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default KanjiService;
