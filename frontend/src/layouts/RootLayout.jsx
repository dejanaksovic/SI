import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const RootLayout = () => {
   console.log("Inside root");
   return ( <div>
      <header>
         <Navbar/>
      </header>
      <main>
         <Outlet/>
      </main>
   </div> );
}
 
export default RootLayout;