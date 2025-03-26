import Link from "next/link";
import Hero from "./_components/Hero";
import InfoBoxes from "./_components/InfoBoxes";
import HomeProperties from "./_components/HomeProperties";
const HomePage = () => {
  return (
    <>
      <Hero />
      <InfoBoxes />
      <HomeProperties />
    </>
  );
};

export default HomePage;
