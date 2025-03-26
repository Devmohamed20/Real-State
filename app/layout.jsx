import "@/assets/styles/globals.css";
import NavBar from "./_components/Navbar";
import Footer from "./_components/Footer";
import AuthProvider from "./_components/AuthProvider";

export const metadata = {
  title: "Dhulkoob",
  keywords: "Dhulkoob, rental, real state, property",
  description: "Dhulkoob is a rental platform for real state and property",
};
const MainLayout = ({ children }) => {
  return (
    <AuthProvider>
      <html lang="en">
        <body>
          <NavBar />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </AuthProvider>
  );
};

export default MainLayout;
