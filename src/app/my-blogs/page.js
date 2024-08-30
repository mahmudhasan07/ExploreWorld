import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import MyBlog from "./MyBlog";


export const metadata = {
    title: "My Blogs",
}

export default function Page() {
    return (
       <PrivateRoute>
         <section>
            <MyBlog></MyBlog>
        </section>
       </PrivateRoute>
    );
}