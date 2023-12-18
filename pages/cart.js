import styled from "styled-components";
import Header from "./components/Header";
import Center from "./components/Center";
import Button from "./components/Button";
import { CartContext } from "./components/CartContext";
import { useContext } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Input from "./components/Input";


const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr; 
    gap: 40px; 
    @media screen and (min-width: 768px) {
        grid-template-columns: 1.3fr 0.7fr;
    }
`;

const Box = styled.div`
    background-color: #fff;
    border-radius: 10px;
    padding: 30px; 
`;

const StyledTable = styled.table`
  width: 100%;
  th{
    text-align: left;
    text-transform: uppercase;
    color: #ccc;
    font-weight: 600;
    font-size: .9rem;
  }
  td{
    border-top: 1px solid rgba(0,0,0,.1);
  }
`;

const ProductInfoCell = styled.td` 
    padding: 10px 0;
    border-top: 1px solid rgba(0,0,0,.1);   
`;

const ProductImageBox = styled.div`
    display: flex;
    aligh-items: center;
    justify-content: center;
    width: 70px;
    height: 100px; 
    padding: 2px;
    border-radius: 10px;
    background-color: white; 
    img {
        max-width: 60px;
        max-height: 60px; 
      }
    @media screen and (min-width: 768px) {
        width: 100px;
        height: 100px;
        padding: 10px;
    }
`; 

const QuantityLabel = styled.span`
      padding: 0 10px; 
      display: block;
      @media screen and (min-width: 768px) {
        display: inline-block; 
        padding: 0 10px;
      }
`;

const CityHolder = styled.div`
    display: flex;
    gap: 5px;
`; 



export default function CartPage() {
    const {cartProducts, setCartProducts, addProduct, removeProduct} = useContext(CartContext); 
    const [products, setProducts] = useState([]);
    //fields for order info
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [country, setCountry] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    //get product info using cartProducts
    useEffect(() => {
        if (cartProducts.length > 0){
            axios.post('/api/cart', {ids: cartProducts})
                .then(res => {
                    setProducts(res.data);
                });
        } else {
            setProducts([]);
        } 
    }, [cartProducts])

    useEffect(() => {
        if (typeof window !== 'undefined' && window.location.href.includes('success')) {
            setIsSuccess(true);
            localStorage.setItem('cart', JSON.stringify([]));
            setProducts([]);
            setCartProducts([]);
        }
    }, [])

    // go through productId in cartProducts and find the price in products
    let total = 0;
    for (const productId of cartProducts) {
        const price = products.find(p => p._id === productId)?.price || 0;
        total += parseInt(price);
    }

    //create order and redirect to payment page
    async function goToPayment() {
        const response = await axios.post('/api/checkout', {
          name,email,city,postalCode,streetAddress,country,
          cartProducts,
        });
        if (response.data.url) {
          window.location = response.data.url;
        }
      }

    
    //Order Success 
    if (isSuccess) {
        return (
            <>
                <Header/>
                <Center>
                    <Wrapper>
                        <Box>
                            <h1>Thanks for your Order!</h1>
                            <p>We will email you the details of your order.</p>
                        </Box>
                    </Wrapper>
                </Center>
            </>
        )
    } else {
        // display product info from products state
        return (
            <>
            <Header/>
            <Center>
                <Wrapper>
                    <Box>
                        {!cartProducts?.length && (<div>Your Cart is Empty</div>)}
                        <h2>Cart</h2>
                        {products?.length > 0 && (
                            <StyledTable>
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(product => (
                                                <tr key={product._id}>
                                                    <ProductInfoCell>
                                                        <ProductImageBox>
                                                            <img src={product.images[0]}></img>
                                                        </ProductImageBox>
                                                        {product.name}
                                                    </ProductInfoCell>
                                                    <td>
                                                        <button onClick={() => removeProduct(product._id)}>-</button>
                                                        <QuantityLabel>
                                                            {cartProducts.filter(id => id === product._id).length}
                                                        </QuantityLabel>
                                                        <button onClick={() => addProduct(product._id)}>+</button>
                                                    </td>
                                                    <td>${cartProducts.filter(id => id === product._id).length * product.price}</td>
                                                </tr>   
                                            ))}
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td>${total}</td>
                                        </tr>
                                </tbody>
                            </StyledTable>
                        )}
                    </Box>
                    {products && (
                    <Box>
                        <h2>Order Information</h2>
                        <form method="post" action='/api/checkout'>
                            <Input 
                            placeholder="Name" 
                            value={name} 
                            name="name"
                            onChange={ev => setName(ev.target.value)}></Input>
                            <Input 
                            placeholder="Email" 
                            value={email} 
                            name="email"
                            onChange={ev => setEmail(ev.target.value)}></Input>
                            <CityHolder>
                                    <Input 
                                    placeholder="City" 
                                    value={city} 
                                    name="city"
                                    onChange={ev => setCity(ev.target.value)}></Input>
                                    <Input 
                                    placeholder="Postal Code" 
                                    value={postalCode} 
                                    name="postalCode"
                                    onChange={ev => setPostalCode(ev.target.value)}></Input>
                            </CityHolder>
                            <Input 
                            placeholder="Street Address" v
                            value={streetAddress} 
                            name="streetAddress"
                            onChange={ev => setStreetAddress(ev.target.value)}></Input>
                            <Input 
                            placeholder="Country" 
                            value={country} 
                            name="country"
                            onChange={ev => setCountry(ev.target.value)}></Input>
                            <Button onClick={() => goToPayment()} block primary={1}>Continue to Payment</Button>
                        </form>
                    </Box>
                    )}
                </Wrapper> 
            </Center>
            </>
        )
    }

    
}