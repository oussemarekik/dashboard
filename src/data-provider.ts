import axios from "axios";
import { DataProvider, HttpError } from "@refinedev/core";
import { stringify } from "query-string";
import { error } from "console";

// Error handling with axios interceptors
const axiosInstance = axios.create();
axiosInstance.interceptors.request.use( 
    async (config) => {
    
    config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZHVzZXIiOjEsImVtYWlsIjoiYWRtaW5AYWRtaW4uYWRtaW4iLCJqc29uaWQiOiJub2RlMHY5aXphaTNta2hmcDFtejhxZWg2cGJ2bm8xMTYwODcubm9kZTA7IiwiaWF0IjoxNjgwODU5MjA2LCJleHAiOjE3MTI0MTY4MDZ9.tSf-kugq0M4lat8NKoJC6Jbormdz473kF4YaGuN912Y`;
        return config
    },error=>{
    return Promise.reject(error)
}
)
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const customError: HttpError = {
      ...error,
      message: error.response?.data?.message,
      statusCode: error.response?.status,
    };

    return Promise.reject(customError);
  }
);

export const dataProvider = (
    apiUrl: string,
): Omit<
    Required<DataProvider>,
    "createMany" | "updateMany" | "deleteMany"|"custom"|"getMany"
> => ({
    
    getList: async ({ resource, pagination, filters, sorters }) => {
        //const url = `https://tunitrack-be.ccdev.space/cars`;
      
        const url = `  ${apiUrl}/${resource}`;
        
        const {data}=(await axiosInstance.get(url))
        return {
            data,
            total: data.length,
        };
    },

    create: async ({ resource, variables }) => {
        const url = `${apiUrl}/${resource}`;

        const { data } = await axiosInstance.post(url, variables);

        return {
            data,
        };
    },

    update: async ({ resource, id, variables }) => {
        const url = `${apiUrl}/${resource}/${id}`;

        const { data } = await axiosInstance.patch(url, variables);

        return {
            data,
        };
    },

    getOne: async ({ resource, id }) => {
        const url = `${apiUrl}/${resource}/${id}`;

        const { data } = await axiosInstance.get(url);

        return {
            data,
        };
    },

    deleteOne: async ({ resource, id, variables }) => {
        const url = `${apiUrl}/${resource}/${id}`;

        const { data } = await axiosInstance.delete(url, {
            data: variables,
        });

        return {
            data,
        };
    },

    getApiUrl: () => {
        return apiUrl;
    }
    
});
