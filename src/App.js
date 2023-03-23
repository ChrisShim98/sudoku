import About from "./components/about";
import Footer from "./components/footer";
import Header from "./components/header";
import Instructions from "./components/instructions";
import SudokuBoard from "./components/sudokuBoard";

function App() {
  return (
    <div className="font-Alkatra text-base lg:text-lg w-screen overflow-x-hidden min-h-screen bg-[#f7f7f7] relative">
      <div className="p-10 pb-16">
        <Header />
        <div className="my-4 min-w-fit flex flex-col lg:flex-row w-full place-content-center gap-12">
          <div className="hidden lg:w-[40vw] lg:max-h-[70vh] min-h-[500px] lg:overflow-y-scroll pr-4 lg:flex flex-col gap-12 pb-6">
            <Instructions />
            <About />
          </div>
          <div className="w-full lg:w-[30vw] pb-12 lg:pb-0">
            <SudokuBoard />
          </div>
          <div className="flex lg:w-[40vw] lg:max-h-[70vh] lg:overflow-y-scroll pr-4 lg:hidden flex-col gap-12 pb-6">
            <Instructions />
            <About />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
