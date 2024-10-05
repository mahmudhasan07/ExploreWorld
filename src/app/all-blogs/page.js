import AllBlogs from "./AllBlogs";


export const metadata = {
    title: "Add Your Blog",
    icons: {
        icon: "https://i.ibb.co/f9g36Zz/exploresphere-high-resolution-logo-transparent-1.png"
    }
}

export default function Page() {
    return (
        <section>
            <h1 id='title' className="text-4xl font-semibold text-center my-5">All Blogs</h1>
            <AllBlogs></AllBlogs>
        </section>
    );
}