
import useAxios, { AxiosSource } from "@/app/Hooks/useAxios";
import CardDetails from "./CardDetails";
import '../../components/lifestyle/Lifestyle.scss'


export const generateMetadata = async({params})=> {
    const axiosLink = useAxios(AxiosSource)
    const cards = await axiosLink.get(`/blogs/${params.card}`)
    return{
        title : cards.data.name,
        openGraph : {
            images : cards.data.hostImages[0]
        },
        icons :{
            icon : cards.data.hostImages[0]
        }

        
    }
}

export default function Page({params})   {
    
    return (
        <section className="my-5">
            <h1 id='title' className="text-4xl font-bold text-center mb-10">Blog Details</h1>
            <CardDetails params={params}></CardDetails>
        </section>
    );
}