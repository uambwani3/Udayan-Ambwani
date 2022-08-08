import { useQuery } from "urql";
import { GET_PRODUCT_QUERY } from "../../lib/query";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useEffect } from "react";

import ShopContext from "../../lib/context";
import { useContext } from "react";

//Styles
import {
  DetailsStyle,
  ProductInfo,
  Quantity,
  Buy,
} from "../../styles/ProductDetails";

import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";

const ProductDetails = () => {
  //Fetch quantity from context
  const { qty, handleAddQty, handleSubtractQty, handleCartAdd, setQty } =
    useContext(ShopContext);

  //Reset Quantity
  useEffect(() => {
    setQty(1);
  }, []);

  //Fetch Slug
  const { query } = useRouter();

  //Fetch GraphQl Data
  const [results] = useQuery({
    query: GET_PRODUCT_QUERY,
    variables: { slug: query.Slug },
  });

  //Extract data
  const { data, fetching, error } = results;

  //Create Toast
  const notify = () => {
    toast.success(`${Title} added to your cart`, { duration: 1500 });
  };

  //Checks for the data coming in
  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  const { Title, Description, Image } = data.products.data[0].attributes;

  return (
    <DetailsStyle>
      <img src={Image.data.attributes.formats.medium.url} alt={Title} />
      <ProductInfo>
        <h3>{Title}</h3>
        <p>{Description}</p>
        <Quantity>
          <span>Quantity</span>
          <button onClick={() => handleSubtractQty()}>
            <AiFillMinusCircle />
          </button>
          <p>{qty} </p>
          <button onClick={() => handleAddQty()}>
            <AiFillPlusCircle />
          </button>
        </Quantity>
        <Buy
          onClick={() => {
            handleCartAdd(data.products.data[0].attributes, qty), notify();
          }}
        >
          Add to cart
        </Buy>
      </ProductInfo>
    </DetailsStyle>
  );
};

export default ProductDetails;
