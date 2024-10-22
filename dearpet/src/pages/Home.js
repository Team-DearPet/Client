import Header from '../components/Header';
import Carousel from '../components/Carousel';
import Category from '../components/Category';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div style={{backgroundColor:"#F7F4FD"}}>
      <Header />
      <Carousel />
      <Category />
      <Footer />
    </div>
  );
};

export default Home;
