import axiosRequest from "../plugins/request";
import { IExam, IExamDetail, IQueryExam } from "../types/exam.types";
import { IQueryKanji } from "../types/kanji.types";
import { IBaseResponse, IBaseResponseList } from "../types/response.types";
import { IQueryUser, IUser } from "../types/user.types";
import onRemoveParams from "../utils/functions/on-remove-params";

class ExamService {
  private _prefixURL = '/v1/exam';

  public async getExamList(
    query: Partial<IQueryExam>,
  ): Promise<IBaseResponse<IBaseResponseList<IExam[]>>> {
    try {
      const rs = await axiosRequest.get(this._prefixURL, {
        params: onRemoveParams(query),
      });
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async getDetailExam(
    id: string,
  ): Promise<IBaseResponse<IExamDetail>> {
    try {
      const rs = await axiosRequest.get(`${this._prefixURL}/${id}`);
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async createExam(
    data: Record<string, any>,
  ): Promise<IBaseResponse<any>> {
    try {
      const rs = await axiosRequest.post(this._prefixURL, data);
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async updateExam(
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

  public async deleteExam(id: string): Promise<IBaseResponse<any>> {
    try {
      const rs = await axiosRequest.delete(`${this._prefixURL}/${id}`);
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default ExamService;