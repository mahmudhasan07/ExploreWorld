import Login from "./Login";
import Registration from "./Registration";

export const metadata = {
    title: "LogIn",
    icons: {
        icon: "https://i.ibb.co/f9g36Zz/exploresphere-high-resolution-logo-transparent-1.png"
    }
}
export default function Authorization() {
    return (
        <section className="relative">
            <div className="bg-black text-black">
                <img id="bgImg" src="https://i.ibb.co/82n2tLY/LogIn.jpg" className="w-full object-cover opacity-85"></img>
                <Login></Login>
                <Registration></Registration>
            </div>
        </section>
    );
}