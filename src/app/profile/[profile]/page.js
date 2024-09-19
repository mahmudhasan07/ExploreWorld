import useAxios, { AxiosSource } from "@/app/Hooks/useAxios";
import Profile from "./Profile";
// import useAxios, { AxiosSource } from "../Hooks/useAxios";

export const generateMetadata = async ({ params }) => {
    const axiosLink = useAxios(AxiosSource)
    const { data } = await axiosLink.get(`/users?data=${params?.profile}`)
    return {
        title: data?.Name,
        openGraph: {
            images: data?.Image,
            size : '180x180'
        },
        icons: {
            icon: data?.Image,
             size : '180x180'
        }
    }



}

export default function Page({ params }) {

    return (
        <div>
            <Profile id={params}></Profile>
        </div>
    );
}