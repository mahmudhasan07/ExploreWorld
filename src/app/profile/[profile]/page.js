import useAxios, { AxiosSource } from "@/app/Hooks/useAxios";
import Profile from "./Profile";
// import useAxios, { AxiosSource } from "../Hooks/useAxios";

export const generateMetadata = async ({ params }) => {
    const axiosLink = useAxios(AxiosSource)
    const { data } = await axiosLink.get(`/users?data=${params?.profile}`)
    return {
        title: data?.Name,
        openGraph: {
            images: [
                {
                    url: data?.Image,
                    width: 1200, // Fixed width
                    height: 630,  // Fixed height
                    alt: 'Image description',
                },
            ]
        },
        icons: {
            icon: data?.Image,
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