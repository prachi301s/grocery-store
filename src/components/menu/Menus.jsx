import { createStyles, Anchor, Grid, Flex, Box } from "@mantine/core";
import { MegaMenu } from "./MegaMenu";


import MenuHeadingDropdown from "./MenuHeadingDropdown";
import { Link } from "react-router-dom";
import { SubcategoryDropdown } from "./SubcategoryDropdown";

const pages = [
  "About us",
  "Contact",
  "My account",
  "Shop Cart",
  "Shop Compare",
  "Shop Wishlist",
  "Checkout",
  "Privacy Policy",
  "Refund and Return Policy",
];

const vendors = ["Dashboard", "Store Listing", "Store Details", "My Orders"];
const blog = [
  "Blog Default",
  "Blog Grid",
  "Blog List",
  "Blog Big",
  "Blog Wide",
  "single Blog",
];

const useStyles = createStyles(() => ({
  Typo: {
    fontFamily: "Quicksand, sans-serif",
    fontSize: "16px",
    lineHeight: "20px",
    color: "#253D4E",
    fontWeight: "700px",
  },
  anchor: {
    fontFamily: "Quicksand, sans-serif",
    fontSize: "16px",
    lineHeight: "20px",
    color: "#253D4E",
    // color: "red",
    fontWeight: "700px",
  },
}));
export const Menus = () => {
  const { classes } = useStyles();

  return (
    <Box
      style={{
        width: "100%",
        // height: "87px",
      }}
    >
      <Grid>
        <Grid.Col span={12}>
          <Flex>
            <Grid.Col lg={4}>
              {/* custom component... */}
              <SubcategoryDropdown/>
              {/* end here.... */}
            </Grid.Col>
            <Grid.Col lg={8}>
              <Flex
                mih={50}
                gap='md'
                justify='center'
                align='center'
                direction='row'
                wrap='wrap'
              >
                {/* custom component */}
                <MenuHeadingDropdown dropdownContent={pages} heading={"Home"} />
                {/* end here.... */}

                <Anchor
                  component={Link}
                  to={"sign-up"}
                  // href='sign-up'
                  target='_self'
                  className={classes.anchor}
                  mr={"45px"}
                  style={
                    {
                      // cursor: "pointer",
                      // fontFamily: "Quicksand,sans-serif",
                      // fontWeight: "1500px",
                      // color: "red",
                    }
                  }
                >
                  About
                </Anchor>

                {/* importing Shop section with mega menu */}
                <Anchor
                  href='#'
                  target='_self'
                  mr={"45px"}
                  className={classes.anchor}
                  style={{
                    fontFamily: "Lato, sans-serif",
                    fontSize: "16px",
                    fontWeight: "16px",

                    cursor: "pointer",
                  }}
                >
                  <MegaMenu />
                </Anchor>

                {/* custom component  */}
                <MenuHeadingDropdown
                  dropdownContent={vendors}
                  heading={"Vendors"}
                />
                {/* end here... */}
                <Anchor
                  href='#'
                  target='_self'
                  mr={"45px"}
                  className={classes.anchor}
                  style={{
                    fontFamily: "Quicksand, sans-serif",
                    fontSize: "16px",
                    fontWeight: "600px",

                    cursor: "pointer",
                  }}
                >
                  Mega Menu
                </Anchor>

                {/* Blog custom component */}
                <MenuHeadingDropdown dropdownContent={blog} heading={"Blog"} />
                {/* end here... */}

                <Anchor
                  href='#'
                  target='_self'
                  mr={"45px"}
                  className={classes.anchor}
                  style={{
                    fontFamily: "Quicksand, sans-serif",
                    fontSize: "16px",
                    // fontWeight: "5px",

                    cursor: "pointer",
                  }}
                >
                  Contact
                </Anchor>
              </Flex>
            </Grid.Col>
          </Flex>
        </Grid.Col>
      </Grid>
    </Box>
  );
};
