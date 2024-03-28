import React from "react";
import FilterProductCard from "../components/Product/FilterProductCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductByCategories } from "../features/category/categorySlice";
import { useParams } from "react-router-dom";
import { Text ,Card} from "@mantine/core";

// import { getProductByCategories } from "../../features/category/categorySlice";

function CtegoryDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(id);
  const { productByCategory } = useSelector((state) => state.categories);
  console.log(productByCategory.length);
  // useEffect(() => {
  //   dispatch(getProductByCategories(id));
  // }, [dispatch]);
  return (
    <>
      {productByCategory.length != 0 ? (
        <div>
          <FilterProductCard Items={productByCategory} />
        </div>
      ) : (
        <>
          <Card
            // m="md"
            p="lg"
            shadow="xl"
            radius="lg"
            h={250}
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
                margin:"auto",
              }}
            >
             Sorry !!! Product not found
            </Text>
          </Card>
        </>
      )}
    </>
  );
}

export default CtegoryDetail;
