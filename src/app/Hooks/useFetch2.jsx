'use client'
import useAxios, { AxiosSource } from './useAxios';
import { useQuery } from '@tanstack/react-query';

const useFetch2 = (data1,data2,data3) => {
    const axiosLink = useAxios(AxiosSource)
    const {isLoading, isError, data, error, refetch}  = useQuery({
        queryKey : [data1,data2,data3],
        queryFn: async () =>{
            const res = await axiosLink.get(`/${data1}/${data2}`)
            return res.data
        }
    })
    if (isLoading) {
        return "loading"
    }

    if (isError) {
        return `An error ${error.message}`
    }

    return [data, refetch]
};

export default useFetch2;