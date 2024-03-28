import { useEffect } from "react";
import {
  Box,
  Card,
  Container,
  Image,
  Text,
  Stack,
  Button,
  Grid,
  Divider,
} from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { banner14 } from "../assets/imgImport";
import loadingCartPng from "../assets/loadingCartPng.gif";
import {
  getToCart,
  removeToCart,
  updateToCart,
  decreaseCartQuantity,
  increaseCartQuantity,
} from "../features/cart/cartSlice";
const user = JSON.parse(localStorage.getItem("user"));

import { useNavigate } from "react-router-dom";

import { addToCheckout } from "../features/checkout/checkOutSlice";
import { getAddress } from "../features/address/addressSlice";
function Cart() {
  const dispatch = useDispatch();

  const { Carts, isSucces } = useSelector((state) => state.cart);

  const navigate = useNavigate();
  const handleClick = () => navigate("/");

  const handleClickTwo = () => {
    {
      dispatch(getAddress());
      dispatch(addToCheckout(Carts.totalPrice));
      navigate("/Checkout");
    }
  };
  const img = import.meta.env.VITE_REACT_PRODUCT_IMAGE_URL;
  useEffect(() => {
    dispatch(getToCart());
  }, [dispatch]);
  useEffect(() => {
    dispatch(updateToCart());
  }, [dispatch]);
  // useEffect(()=>{dispatch(addToCheckout(Carts.totalPrice))},[dispatch]);
  // console.log("cart", Carts.card.length);

  return (
    <Container size="md" sx={{ margin: "auto" }}>
     
      {Carts.length === 0 ? (
        <Card
          m="md"
          p="xs"
          shadow="xl"
          radius="lg"
          h={300}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justify: "space-around",
          }}
        >
          <Text
            c="red"
            sx={{
              fontFamily: "Lato, sans-serif",
              fontSize: "18px",
              fontWeight: "16px",
            }}
          >
            Your Cart is empty
          </Text>
          <div>
            <img src={loadingCartPng} width={100} height={100} alt="png" />
          </div>
          <Button
            onClick={handleClick}
            sx={{
              backgroundColor: "#80B82D",
              fontFamily: "Lato, sans-serif",
              fontSize: "15px",
              fontWeight: "10px",
            }}
          >
            Shop Now
          </Button>
        </Card>
      ) : (
        <Grid gutter={30} m="auto">
          <Grid.Col lg={7}>
            {Carts?.card?.map((cItem) => (
              <Card
                key={cItem.id}
                m="md"
                p="xs"
                shadow="xl"
                radius="lg"
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justify: "space-around",
                }}
              >
                <Image width={150} height={150} src={img + cItem.thumbnail} />
                <Stack>
                  <Text
                    sx={{
                      fontFamily: "Lato, sans-serif",
                      fontSize: "18px",
                      fontWeight: "16px",
                      color: "#80B82D",
                    }}
                  >
                    {cItem.name}
                  </Text>
                  <Stack
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justify: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      fw={700}
                      sx={{
                        fontFamily: "Lato, sans-serif",
                        fontSize: "18px",
                        fontWeight: "16px",
                        color: "#80B82D",
                      }}
                    >
                      ${cItem.discount_price}
                    </Text>
                    <Text
                      c="dimmed"
                      // td="line-through"
                      fw={500}
                      sx={{
                        fontFamily: "Lato, sans-serif",
                        fontSize: "18px",
                        fontWeight: "16px",
                      }}
                    >
                      $
                      {parseFloat(
                        cItem.discount_price * cItem.quantity
                      ).toFixed(2)}
                    </Text>
                  </Stack>
                  <Stack
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justify: "center",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      size="xs"
                      variant="default"
                      radius="xl"
                      onClick={() => {
                        dispatch(updateToCart({ cItem, type: "increase" }));
                        dispatch(increaseCartQuantity(cItem.id));
                      }}
                    >
                      +
                    </Button>
                    {cItem.quantity}
                    <Button
                      size="xs"
                      variant="default"
                      radius="xl"
                      onClick={() => {
                        dispatch(updateToCart({ cItem }));
                        dispatch(decreaseCartQuantity(cItem.id));
                      }}
                    >
                      -
                    </Button>
                  </Stack>
                </Stack>
                <Button
                  size="xs"
                  variant="subtule"
                  sx={{
                    justify: "flex-end",
                    top: "-70px",
                    fontFamily: "Lato, sans-serif",
                    fontSize: "15px",
                  }}
                  onClick={() => dispatch(removeToCart(cItem))}
                >
                 <IconX stroke={1} size="15px"/>
                </Button>
              </Card>
            ))}
          </Grid.Col>
          <Grid.Col lg={4}>
            <Box
              h={300}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",

                position: "cover",
              }}
            >
              <Image src={banner14} />
            </Box>

            <Card radius="lg" shadow="xl">
              <h3>Price details</h3>
              <Divider mb={10} />
              <Stack>
                <Text
                  sx={{
                    fontFamily: "Lato, sans-serif",
                    fontSize: "15px",
                    fontWeight: "12px",
                  }}
                >
                  Quantity : {Carts.totalQuantity}
                </Text>
                <Text
                  sx={{
                    fontFamily: "Lato, sans-serif",
                    fontSize: "15px",
                    fontWeight: "12px",
                  }}
                >
                  Price : ${Carts.totalPrice}
                </Text>

                <Button
                  sx={{
                    backgroundColor: "#80B82D",
                    fontFamily: "Lato, sans-serif",
                    fontSize: "15px",
                    fontWeight: "10px",
                  }}
                  onClick={handleClickTwo}
                >
                  Continue
                </Button>
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>
      )}
    </Container>
  );
}

export default Cart;
 {/* {isSucces ? (
        Carts.card.length === 0 ? (
          <Card
            m="md"
            p="xs"
            shadow="xl"
            radius="lg"
            h={300}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justify: "space-around",
            }}
          >
            <Text
              c="red"
              sx={{
                fontFamily: "Lato, sans-serif",
                fontSize: "18px",
                fontWeight: "16px",
              }}
            >
              Your Cart is empty
            </Text>
            <div>
              <img src={loadingCartPng} width={100} height={100} alt="png" />
            </div>
            <Button
              onClick={handleClick}
              sx={{
                backgroundColor: "#80B82D",
                fontFamily: "Lato, sans-serif",
                fontSize: "15px",
                fontWeight: "10px",
              }}
            >
              Shop Now
            </Button>
          </Card>
        ) : (
          <Grid gutter={30} m="auto">
            <Grid.Col lg={7}>
              {Carts?.card?.map((cItem) => (
                <Card
                  key={cItem.id}
                  m="md"
                  p="xs"
                  shadow="xl"
                  radius="lg"
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justify: "space-around",
                  }}
                >
                  <Image width={150} height={150} src={img + cItem.thumbnail} />
                  <Stack>
                    <Text
                      sx={{
                        fontFamily: "Lato, sans-serif",
                        fontSize: "18px",
                        fontWeight: "16px",
                        color: "#80B82D",
                      }}
                    >
                      {cItem.name}
                    </Text>
                    <Stack
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justify: "space-around",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        fw={700}
                        sx={{
                          fontFamily: "Lato, sans-serif",
                          fontSize: "18px",
                          fontWeight: "16px",
                          color: "#80B82D",
                        }}
                      >
                        ${cItem.discount_price}
                      </Text>
                      <Text
                        c="dimmed"
                        // td="line-through"
                        fw={500}
                        sx={{
                          fontFamily: "Lato, sans-serif",
                          fontSize: "18px",
                          fontWeight: "16px",
                        }}
                      >
                        $
                        {parseFloat(
                          cItem.discount_price * cItem.quantity
                        ).toFixed(2)}
                      </Text>
                    </Stack>
                    <Stack
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justify: "center",
                        alignItems: "center",
                      }}
                    >
                      <Button
                        size="xs"
                        variant="default"
                        radius="xl"
                        onClick={() => {
                          dispatch(updateToCart({ cItem, type: "increase" }));
                          dispatch(increaseCartQuantity(cItem.id));
                        }}
                      >
                        +
                      </Button>
                      {cItem.quantity}
                      <Button
                        size="xs"
                        variant="default"
                        radius="xl"
                        onClick={() => {
                          dispatch(updateToCart({ cItem }));
                          dispatch(decreaseCartQuantity(cItem.id));
                        }}
                      >
                        -
                      </Button>
                    </Stack>
                  </Stack>
                  <Button
                    size="xs"
                    variant="subtule"
                    sx={{
                      justify: "flex-end",
                      top: "-70px",
                      fontFamily: "Lato, sans-serif",
                      fontSize: "15px",
                    }}
                    onClick={() => dispatch(removeToCart(cItem))}
                  >
                    <IconX stroke={1} size="15px" />
                  </Button>
                </Card>
              ))}
            </Grid.Col>
            <Grid.Col lg={4}>
              <Box
                h={300}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",

                  position: "cover",
                }}
              >
                <Image src={banner14} />
              </Box>

              <Card radius="lg" shadow="xl">
                <h3>Price details</h3>
                <Divider mb={10} />
                <Stack>
                  <Text
                    sx={{
                      fontFamily: "Lato, sans-serif",
                      fontSize: "15px",
                      fontWeight: "12px",
                    }}
                  >
                    Quantity : {Carts.totalQuantity}
                  </Text>
                  <Text
                    sx={{
                      fontFamily: "Lato, sans-serif",
                      fontSize: "15px",
                      fontWeight: "12px",
                    }}
                  >
                    Price : ${Carts.totalPrice}
                  </Text>

                  <Button
                    sx={{
                      backgroundColor: "#80B82D",
                      fontFamily: "Lato, sans-serif",
                      fontSize: "15px",
                      fontWeight: "10px",
                    }}
                    onClick={handleClickTwo}
                  >
                    Continue
                  </Button>
                </Stack>
              </Card>
            </Grid.Col>
          </Grid>
        )
      ) : (
        "page"
      )} */}