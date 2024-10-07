import axiosRequest from "../plugins/request";
import { ILoginLog } from "../types/login-log.types";
import { IBaseResponse, IBaseResponseList } from "../types/response.types";

class LoginLogService {
  private _prefixURL = '/v1/login-log';

  public async getListLog(
  ): Promise<IBaseResponse<ILoginLog[]>> {
    try {
      const rs = await axiosRequest.get(this._prefixURL);
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default LoginLogService;