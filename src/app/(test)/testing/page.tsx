import PdfGeneratorTest from "@/components/misc/PdfGeneratorTest";

const Home = () => {
  return (
    <main className="flex h-[calc(100vh-56px)] flex-col items-center justify-between">
      <div className="container mx-auto px-4 py-8">
        <PdfGeneratorTest />
      </div>
    </main>
  );
};

export default Home;
