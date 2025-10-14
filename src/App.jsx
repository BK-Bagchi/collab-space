import Footer from "./components/shared/Footer/Footer";
import Navbar from "./components/shared/Navbar/navbar";
function App() {
  return (
    <>
      <Navbar />
      <Footer user={true} />
    </>
  );
}

export default App;
