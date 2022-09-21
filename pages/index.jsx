import HomeComponent from "../components/home";
import Nav from "../components/Nav";

export default function Home() {
  return (
    <div className="px-20 pb-8 bg-[#111827] !mt-0 min-h-screen">
      <Nav />
      <HomeComponent />
    </div>
  );
}
