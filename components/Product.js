import { ProductStyle } from "../styles/ProductStyle";
import Link from "next/link";

const Product = ({ product }) => {
  const { Title, Price, Image, Description, Slug } = product.attributes;

  return (
    <ProductStyle>
      <Link href={`/product/${Slug}`}>
        <img src={Image.data.attributes.formats.small.url} alt='' />
      </Link>
      <h2>{Title}</h2>
      <h3>{Price}</h3>
      <h3>{Description}</h3>
    </ProductStyle>
  );
};

export default Product;
