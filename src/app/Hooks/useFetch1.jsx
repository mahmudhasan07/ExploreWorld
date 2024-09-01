"use client"
import { useQuery } from '@tanstack/react-query';
import useAxios, { AxiosSource } from './useAxios';

const useFetch1 = (data1,data2) => {
    // console.log(data1,data2);
    const axiosLink = useAxios(AxiosSource)
    const { isLoading, isError, data, error, refetch } = useQuery({
        queryKey: [data1,data2],
        queryFn: async()=>{
            const res = await axiosLink.get(`/${data1}?data=${data2}`)
            return res.data
        },
    })

    if (isLoading) {
        return "loading"
    }

    if (isError) {
        return `An error ${error.message}`
    }

    return [data, refetch]
};

export default useFetch1;