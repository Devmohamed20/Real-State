import "@/assets/styles/globals.css";

export const metadata = {
  title: "Dhulkoob",
  keywords: "Dhulkoob, rental, real state, property",
  description: "Dhulkoob is a rental platform for real state and property",
};
const MainLayout = ({ children }) => {
  return (
    <html>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default MainLayout;
