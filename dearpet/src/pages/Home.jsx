import Header from '../component/Header';
import Carousel from '../component/Carousel';
import Category from '../component/Category';
import Footer from '../component/Footer';

const Home = () => {
  return (
    <div style={{fontFamily: 'HakgyoansimDunggeunmisoTTF-B'}}>
      <Header />
      <Carousel />
      <Category />
      <Footer />
    </div>
  );
};

export default Home;
