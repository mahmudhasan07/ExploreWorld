import useAxios, { AxiosSource } from "@/app/Hooks/useAxios";
import Profile from "./Profile";
// import useAxios, { AxiosSource } from "../Hooks/useAxios";

export const generateMetadata = async ({ params }) => {
    const axiosLink = useAxios(AxiosSource)
    const data = await axiosLink.get(`/users?data=${params?.profile}`)

    return {
        title: data?.data?.Name,
        openGraph: {
            images: [{
                url: data?.data?.Image,
                width: 800,
                height: 600,
            },]
        },
        icons: {
            icon: data?.data?.Image,
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