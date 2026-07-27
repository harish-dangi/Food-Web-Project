import Banner from "../components/Banner"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import OurHomeMenu from "../components/OurHomeMenu"
import SpecialOffer from "../components/SpecialOffer"
import About from "../components/About"

const Home = () => {
  return (
    <>
    <Navbar/>
    <Banner/>
    <SpecialOffer/>
    <About/>
    <OurHomeMenu/>
    <Footer/>
    </>
  )
}

export default Home