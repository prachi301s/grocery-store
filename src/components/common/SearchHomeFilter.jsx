import {
  Menu,
  Grid,
  TextInput,
  Button,
  createStyles,
  Text,
  Card,
  Group,
  Image,
  Stack,
  Rating,
  Center,
} from "@mantine/core";
import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import {
//   filteredData,
//   getCategorySearch,
// } from "../../features/getAllCategory/getCategorySearchSlice";
import {
  filterProducts,
  getProductSearch,
} from "../../features/product/productSlice";
import { useState } from "react";

const useStyles = createStyles((theme) => ({
  input: {
    position: "absolute",
    minWidth: "493px",
    // minHeight: "60px",
    // marginTop: "20ox",
    radius: "4px",
    borderColor: "#E6F1D5",
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },
  button: {
    backgroundColor: "#80B82D",
    color: "white",
    borderRadius: "3px",
    height: "35px",
    width: "90px",
    left: "405px",
    top: "0%",
    "&:hover": {
      transform: "scale(1.05)",
      textDecoration: "none",
      backgroundColor: "#fed330",
    },

    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },
  card: {
    transition: "transform 150ms ease, box-shadow 150ms ease",

    "&:hover": {
      transform: "scale(1.01)",
      boxShadow: theme.shadows.md,
    },
  },
}));

const SearchHomeFilter = () => {
  const [search, setSearch] = useState("");
  console.log(search);
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const filteredProducts = useSelector(
    (state) => state.product.filteredProducts
  );

  const inputRef = useRef("");

  console.log(filteredProducts);

  return (
    <Menu>
      <Grid.Col span={5} lg={5}>
        {/* <Menu.Target> */}
        <TextInput
          name=""
          type="text"
          onChange={(e) => {
            setSearch(e.target.value);
            dispatch(getProductSearch(search));
          }}
          value={search}
          radius="xs"
          size="sm"
          placeholder="Search For Product"
          className={classes.input}
        />

        {/* </Menu.Target> */}

        <Button className={classes.button} variant="#80B82D">
          search
        </Button>
      </Grid.Col>

      <Menu.Dropdown>
        <Menu.Label>
          {filteredProducts != null ? (
            filteredProducts.map((item, index) => (
              <Center maw={400} h={50} mx="auto" key={index}>
                <Card padding="5px" radius="md" className={classes.card}>
                  <Group noWrap>
                    {/* <Image src={item.thumbnail} height="60px" width="60px" /> */}
                    <Stack justify="space-around">
                      <Text
                        style={{
                          fontFamily: "Quicksand , sans-serif",
                          fontSize: "16px",
                          lineHeight: "19.2px",
                          marginTop: "xs",
                          color: "#253D4E",
                          "&:hover": {
                            transform: "scale(1.05)",
                            textDecoration: "none",
                            color: "#80B82D",
                          },
                        }}
                      >
                        {item.name}
                      </Text>
                      {/* <Rating
                      defaultValue={2}
                      color="#fed330"
                      size="xs"
                      count={6}
                    />
                    <Group noWrap spacing="xs">
                      <Text
                        style={{
                          fontFamily: "Quicksand , sans-serif",

                          fontSize: "18px",
                          lineHeight: "19.2px",
                          color: "#253D4E",
                        }}
                      >
                        {item.price}
                      </Text>
                      <Text
                        style={{
                          fontFamily: "Quicksand , sans-serif",
                          fontSize: "14px",
                          lineHeight: "18px",
                          color: "#C1C1C1",
                        }}
                      >
                        {item.discount_price}
                      </Text>
                    </Group> */}
                    </Stack>
                  </Group>
                </Card>
              </Center>
            ))
          ) : (
            <Card>null</Card>
          )}
        </Menu.Label>
      </Menu.Dropdown>
    </Menu>
  );
};

export default SearchHomeFilter;

// debounce functionality...

// const getData = setTimeout(() => {
//   dispatch(getCategorySearch());
//   console.log("categorySearch...", getCategorySearch());
// }, 2000);
// return () => clearTimeout(getData);

// getData();
