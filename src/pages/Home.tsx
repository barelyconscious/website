import MyProjects from "../components/Home/MyProjects";

const Home = () => {
  return (
    <div className="min-h-[calc(100vh-200px)]">
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <MyProjects />
        </div>
      </section>
    </div>
  );
};

export default Home;
