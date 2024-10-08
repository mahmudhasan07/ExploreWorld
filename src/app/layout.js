import "./globals.css";
import TankStackQuery from "./Hooks/TankStackQuery";
import ContextAPI from "./ContextAPI/ContextAPI";
import ReduxProvider from "./components/Redux/ReduxProvider";
import NavBar from "./components/NavBar/NavBar";


export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme='light'>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Poetsen+One&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"></link>
      </head>
      <body className="container ">
        <ReduxProvider>
          <ContextAPI>
            <TankStackQuery>
              <NavBar></NavBar>
              {children}
            </TankStackQuery>
          </ContextAPI>
        </ReduxProvider>

      </body>
    </html>
  );
}
