import Head from "next/head";
// import Link from "next/Link";
import Product from "../components/Product";
import { useQuery } from "urql";
import { PRODUCT_QUERY } from "../lib/query";

import { Gallery } from "../styles/Gallery";

export default function Home() {
  //Fetch products from strapi
  const [results] = useQuery({ query: PRODUCT_QUERY });
  const { data, fetching, error } = results;

  //Checks for the data coming in
  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;
  const products = data.products.data;

  console.log(products);

  return (
    <div>
      <Head>
        <title>HomePage</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <Gallery>
          {products.map((product) => (
            <Product key={product.attributes.Slug} product={product} />
          ))}
        </Gallery>
      </main>
    </div>
  );
}
