import { AxiosResponse } from "axios";
import { getDataAxios } from "../http/request";
import { IUser } from "../utils/interfaces/IUser";


export const fetchUsers = async (): Promise<AxiosResponse> =>
{
	return await getDataAxios<IUser[]>('/users');
};
