import AllBlogs from "./AllBlogs";


export const metadata = {
    title : "Add Your Blog"
}

export default function Page() {
    return (
        <section>
            <h1 id='title' className="text-5xl font-semibold text-center my-5">All Blogs</h1>
            <AllBlogs></AllBlogs>
        </section>
    );
}