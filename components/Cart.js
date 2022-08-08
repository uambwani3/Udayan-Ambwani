import { useContext } from "react";
import ShopContext from "../lib/context";
import {
  CartWrapper,
  CartStyle,
  Card,
  CardInfo,
  EmptyStyle,
  Checkout,
  Cards,
} from "../styles/CartStyles";
import { Quantity } from "../styles/ProductDetails";
import { FaShoppingCart } from "react-icons/fa";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import getStripe from "../lib/getStripe";

//Animate Variants
const card = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1, transition: { delay: 1 } },
};

const cards = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { delayChildren: 0.5, staggerChildren: 0.1 },
  },
};

const Cart = () => {
  const {
    cartItems,
    setShowCart,
    handleCartAdd,
    handleCartRemove,
    totalPrice,
  } = useContext(ShopContext);

  //Payment
  const handleCheckout = async () => {
    const stripe = await getStripe();
    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cartItems),
    });
    const data = await response.json();
    await stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <CartWrapper
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      onClick={() => setShowCart((prev) => !prev)}
    >
      <CartStyle
        initial={{ x: "50%" }}
        animate={{ x: "0%" }}
        exit={{ x: "50%" }}
        transition={{ type: "tween" }}
        onClick={(e) => e.stopPropagation()}
      >
        {cartItems.length < 1 && (
          <EmptyStyle
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1>You have more shopping to do</h1>
            <FaShoppingCart />
          </EmptyStyle>
        )}
        <Cards variants={cards} initial='hidden' animate='show' Layout>
          {cartItems.length >= 1 &&
            cartItems.map((item) => {
              return (
                <Card key={item.Slug} variants={card} Layout>
                  <img
                    src={item.Image.data.attributes.formats.thumbnail.url}
                    alt={item.Title}
                  />
                  <CardInfo>
                    <h3>{item.Title}</h3>
                    <h3>{item.Price}$</h3>
                    <Quantity>
                      <span>Quantity</span>
                      <button>
                        <AiFillMinusCircle
                          onClick={() => handleCartRemove(item)}
                        />
                      </button>
                      <p>{item.quantity}</p>
                      <button>
                        <AiFillPlusCircle
                          onClick={() => handleCartAdd(item, 1)}
                        />
                      </button>
                    </Quantity>
                  </CardInfo>
                </Card>
              );
            })}
        </Cards>
        {cartItems.length >= 1 && (
          <Checkout Layout>
            <h3>Subtotal: {totalPrice}$</h3>
            <button onClick={handleCheckout}>Purchase</button>
          </Checkout>
        )}
      </CartStyle>
    </CartWrapper>
  );
};

export default Cart;
