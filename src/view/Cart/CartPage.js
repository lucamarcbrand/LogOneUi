import React, { useState, useContext } from "react";
import { Card, ListGroup, Button, Alert } from "react-bootstrap";
import Blackmask from "../../static/Resource/blackMask.png";
import Bluemask from "../../static/Resource/blueMask.png";
import Pinkkmask from "../../static/Resource/pinkMask.png";
import Yellowmask from "../../static/Resource/yellowMask.png";
import { Product } from "../Cart/Product";
import { getInvoiceDetail } from "../../services/paymentService";
import { UserContext } from "../../Context/userContext";
// initial cart state
const initState = {
  pink: {
    boxes: 0,
    pallets: 0,
    img: Pinkkmask,
  },
  blue: {
    boxes: 0,
    pallets: 0,
    img: Bluemask,
  },
  yellow: {
    boxes: 0,
    pallets: 0,
    img: Yellowmask,
  },
  black: {
    boxes: 0,
    pallets: 0,
    img: Blackmask,
  },
};
//initial billing information state
const initBillingDetails = {
  pinkCost: 0.0,
  blueCost: 0.0,
  yellowCost: 0.0,
  blackCost: 0.0,
  pinkShippingCost: 0.0,
  blueShippingCost: 0.0,
  yellowShippingCost: 0.0,
  blackShippingCost: 0.0,
  productCost: 0.0,
  shippingCost: 0.0,
  totalCost: 0.0,
};

//currency formater function
const money = new Intl.NumberFormat("de-CH", {
  style: "currency",
  currency: "CHF",
});

// cart component : it displays Mask blue,blck,pink,yellow on screen
export const CartPage = ({ invoiceAddress, showProfile }) => {
  const [state, setState] = useState({ ...initState });
  const [cart, setCart] = useState([]);
  const [showBillingInfo, renderBillingInfo] = useState(false);
  const [palletsCount, setPalletCount] = useState(0);
  const [billingDetails, setBillingDetails] = useState({
    ...initBillingDetails,
  });
  const userDetailsData = useContext(UserContext);

  const shippingCost = {
    pink: billingDetails.pinkShippingCost,
    blue: billingDetails.blueShippingCost,
    yellow: billingDetails.yellowShippingCost,
    black: billingDetails.blackShippingCost,
  };

  const defaultHeaders = {
    "Content-Type": "application/json",
    Authorization: userDetailsData.authorization,
  };
  //change the cart state when boxes or pallets count change
  const onFormEdit = (ele, value, maskName) => {
    if (ele === "boxes" && value <= 9600) {
      state[maskName][ele] = value;
      state[maskName]["pallets"] = Math.ceil(value / 800);
    } else if (ele === "pallets" && value >= 1 && value <= 12) {
      state[maskName][ele] = value;
      state[maskName]["boxes"] = value * 800;
    }

    setState((prev) => ({
      ...prev,
      ...state[maskName],
    }));
  };

  // this function do the get invoice backend call , in the reponse we get shiiping cost ,total product cost
  const orderNow = (showBillingInfo) => {
    
    if (showBillingInfo) {
      // when user clicks on confirm order reset the application state
      // all values in cart will be reset
      setState({
        pink: {
          boxes: 0,
          pallets: 0,
          img: Pinkkmask,
        },
        blue: {
          boxes: 0,
          pallets: 0,
          img: Bluemask,
        },
        yellow: {
          boxes: 0,
          pallets: 0,
          img: Yellowmask,
        },
        black: {
          boxes: 0,
          pallets: 0,
          img: Blackmask,
        },
      });
      setCart([]);
      renderBillingInfo(false);
      setBillingDetails({ ...initBillingDetails });
    } else {
      const payload = {};
      let palletCount = 0;
      if (invoiceAddress && invoiceAddress.place) {
        cart.forEach((mask) => {
          payload[mask] = state[mask];
          palletCount = palletCount + +state[mask]["pallets"];
        });
        setPalletCount(palletCount);
        if (palletCount > 12) {
          return;
        }
        payload["destination"] = invoiceAddress.place;

        // fetch invoice and shipping cost from backend
        getInvoiceDetail(defaultHeaders, payload)
          .then((response) => {
            setBillingDetails(response);
            renderBillingInfo(true);
            console.log(reponse);
          })
          .catch((error) => console.error(error));
        console.log(payload);
      } else {
        showProfile(true);
      }
    }
  };
  // this function adds product in cart
  const addProduct = (product) => {
    if (!cart.includes(product) && state[product].boxes > 0) {
      cart.push(product);
      setCart([...cart]);
    }
  };

  // this function removes product from cart on click of delete icon
  const removeProduct = (e, product) => {
    setCart(cart.filter((p) => p !== product));
    if (cart.length === 1) {
      setBillingDetails(initBillingDetails);
      renderBillingInfo(false);
    }
    e.preventDefault();
  };
  return (
    <div>
      <Alert
        variant="warning"
        key={"warning"}
        show={palletsCount > 12 ? true : false}
      >
        {"Maximum pallets order quantity is 12 "}
      </Alert>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <>
          {["pink", "blue", "yellow", "black"].map((mask, index) => (
            <div className="my-2">
              <Product
                mask={state[mask]}
                maskName={mask}
                index={index}
                shippingCost={shippingCost[mask]}
                onFormEdit={onFormEdit}
                addProduct={addProduct}
                renderShippingCost={showBillingInfo}
              ></Product>{" "}
            </div>
          ))}
        </>

        <>
          <ListGroup className="my-2">
            <ListGroup.Item>
              <div style={{ display: "flex" }}>
                {cart.length == 0 ? "No item in your " : undefined}Shopping Cart
              </div>
            </ListGroup.Item>
            {cart.map((mask, index) => (
              <ListGroup.Item key={index}>
                <div style={{ display: "flex" }}>
                  <div style={{ minWidth: "120px" }}> {`${mask} `}</div>
                  <div className="vr" />

                  <div style={{ minWidth: "120px", paddingLeft: "10px" }}>
                    <span>{money.format(state[mask].boxes * 25)}</span>
                  </div>
                  <div style={{ minWidth: "20px" }}>
                    <Button
                      variant="Link"
                      onClick={(e) => removeProduct(e, mask)}
                    >
                      <span style={{ color: "#0d6efd" }}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-archive bs-link-color"
                          viewBox="0 0 16 16"
                        >
                          <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1V2zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5H2zm13-3H1v2h14V2zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
                        </svg>
                      </span>
                    </Button>
                  </div>
                </div>
              </ListGroup.Item>
            ))}
            {showBillingInfo ? (
              <>
                <ListGroup.Item>
                  <div style={{ display: "flex" }}>
                    <div style={{ minWidth: "120px" }}>
                      <strong>Product Cost</strong>
                    </div>
                    <div className="vr" />
                    <div style={{ minWidth: "120px", paddingLeft: "10px" }}>
                      {money.format(billingDetails.productCost)}
                    </div>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div style={{ display: "flex" }}>
                    <div style={{ minWidth: "120px" }}>
                      <strong>Shipping Cost</strong>
                    </div>
                    <div className="vr" />

                    <div style={{ minWidth: "120px", paddingLeft: "10px" }}>
                      {money.format(billingDetails.shippingCost)}
                    </div>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div style={{ display: "flex" }}>
                    <div style={{ minWidth: "120px" }}>
                      <strong> Total Cost </strong>
                    </div>
                    <div className="vr" />
                    <div style={{ minWidth: "120px", paddingLeft: "10px" }}>
                      {money.format(billingDetails.totalCost)}
                    </div>
                  </div>
                </ListGroup.Item>
              </>
            ) : undefined}
            <ListGroup.Item>
              <Button
                variant="outline-primary"
                disabled={cart.length === 0}
                onClick={(e) => orderNow(showBillingInfo)}
              >
                {showBillingInfo ? "Confirm Order" : "Calculate cost"}
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </>
      </div>
    </div>
  );
};
