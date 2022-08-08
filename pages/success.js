import { useRouter } from "next/router";
import { Wrapper, Card, Address, OrderInfo } from "../styles/SuccessStyles";

const stripe = require("stripe")(
  `${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`
);

export async function getServerSideProps(params) {
  const order = await stripe.checkout.sessions.retrieve(
    params.query.session_id,
    { expand: ["line_items"] }
  );
  return { props: { order } };
}

const success = ({ order }) => {
  const route = useRouter();

  return (
    <Wrapper>
      <Card
        animate={{ opacity: 1, scale: 1 }}
        initial={{ opacity: 0, scale: 0.75 }}
        transition={{ duration: 0.75 }}
      >
        <h1>Thank you for your order!</h1>
        <h2>A confirmation email has been sent to</h2>
        <h2>{order.customer_details.email}</h2>
        <div>
          <Address>
            <h3>Address</h3>
            {Object.entries(order.customer_details.address).map(
              ([key, val]) => (
                <p key={key}>
                  {key}: {val}
                </p>
              )
            )}
          </Address>
          <OrderInfo>
            <h3>Products</h3>
            {order.line_items.data.map((item) => (
              <div key={item.id}>
                <p>Product: {item.Title}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: {item.price.unit_amount}</p>
              </div>
            ))}
          </OrderInfo>
        </div>
        <button onClick={() => route.push("/")}>Continue shopping</button>
      </Card>
    </Wrapper>
  );
};

export default success;
