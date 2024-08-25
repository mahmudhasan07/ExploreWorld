import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import MyBlog from "./MyBlog";

export default function Page() {
    return (
       <PrivateRoute>
         <section>
            <MyBlog></MyBlog>
        </section>
       </PrivateRoute>
    );
}