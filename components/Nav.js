import Link from "next/link";
import { FiShoppingBag } from "react-icons/fi";
import { NavStyles, NavItems } from "../styles/NavStyles.js";
import Cart from "./Cart";
import { useContext } from "react";
import ShopContext from "../lib/context";
import User from "./User.js";
import { useUser } from "@auth0/nextjs-auth0";

const { AnimatePresence, motion } = require("framer-motion");

const Nav = () => {
  const { showCart, setShowCart, totalQuantities } = useContext(ShopContext);

  // const { user, error, isLoading } = useUser();

  return (
    <NavStyles>
      <Link href={"/"}>The Shop</Link>
      <NavItems>
        <User />
        <div onClick={() => setShowCart((prev) => !prev)}>
          {totalQuantities && (
            <motion.span animate={{ scale: 1 }} initial={{ scale: 0 }}>
              {totalQuantities}
            </motion.span>
          )}
          <FiShoppingBag />
          <h3>Cart</h3>
        </div>
      </NavItems>
      <AnimatePresence>{showCart && <Cart />}</AnimatePresence>
    </NavStyles>
  );
};

export default Nav;
