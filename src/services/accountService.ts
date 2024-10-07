import axiosRequest from "../plugins/request";
import { IQueryKanji } from "../types/kanji.types";
import { IBaseResponse, IBaseResponseList } from "../types/response.types";
import { IQueryUser, IUser } from "../types/user.types";
import onRemoveParams from "../utils/functions/on-remove-params";

class AccountService {
  private _prefixURL = '/v1/account';

  public async listAccount(
    query: Partial<IQueryUser>,
  ): Promise<IBaseResponse<IBaseResponseList<IUser[]>>> {
    try {
      const rs = await axiosRequest.get(this._prefixURL, {
        params: onRemoveParams(query),
      });
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async deleteAccount(
    id: string,
  ): Promise<IBaseResponse<any>> {
    try {
      const rs = await axiosRequest.delete(`${this._prefixURL}/${id}`);
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default AccountService;