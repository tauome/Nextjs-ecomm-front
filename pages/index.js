import Header from './components/Header.js';
import Featured from './components/Featured.js';
import { Product } from '@/models/Product.js';
import mongooseConnect from './lib/mongoose.js';
import NewProducts from './components/NewProducts.js';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 200%;
  @media screen and (min-width: 768px) {
    width: 100%;
  }
`;


export default function Home({featuredProduct, newProducts}) {
  return (
    <Wrapper>
      <Header/>
      <Featured featuredProduct={featuredProduct}/>
      <NewProducts newProducts={newProducts}/>
    </Wrapper>
  )
}; 

export async function getServerSideProps() {
  const featuredfeaturedProductId = "656e6701c5d00de3d718c55d"; 
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredfeaturedProductId); 
  const newProducts = await Product.find({}, null, {sort: {'_id': -1}, limit: 10})
  const allProducts = await Product.find({});
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
      allProducts: JSON.parse(JSON.stringify(allProducts)),
    }
  }; 
}
