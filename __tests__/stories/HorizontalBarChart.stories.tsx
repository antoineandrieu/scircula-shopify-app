import React, { StrictMode } from "react";
import styled from "styled-components";
import { useState } from "react";
import HorizontalBarChart from "../../components/charts/HorizontalBarChart";

const StyledHorizontalBarStory = styled.div`
  height: 100vh;
  width: 100vw;
`;

export const NewHorizontalBarComponentStory = () => {
  return (
    <StyledHorizontalBarStory>
      <HorizontalBarChart
        loading={false}
        title="Title"
        data={[
          {
            externalId: "gid://shopify/Product/4839586201677",
            name: "nora straight forever | deep blue",
            total: 40,
            addedToCart: 20,
            purchased: 10,
          },
          {
            externalId: "gid://shopify/Product/4839628144717",
            name: "nora loose tapered corduroy leaf green | leaf green",
            total: 24,
            addedToCart: 12,
            purchased: 6,
          },
          {
            externalId: "gid://shopify/Product/4799628116045",
            name: "nora loose tapered undyed | off white",
            total: 22,
            addedToCart: 11,
            purchased: 4,
          },
          {
            externalId: "gid://shopify/Product/4855726997581",
            name: "nora loose tapered grey (clay coated) | light grey",
            total: 21,
            addedToCart: 6,
            purchased: 0,
          },
          {
            externalId: "gid://shopify/Product/4845424705613",
            name: "haily super skinny dark indigo | deep blue",
            total: 21,
            addedToCart: 6,
            purchased: 1,
          },
          {
            externalId: "gid://shopify/Product/4838637076557",
            name: "roxy super skinny high skylar blue | light blue",
            total: 20,
            addedToCart: 6,
            purchased: 0,
          },
          {
            externalId: "gid://shopify/Product/4846350663757",
            name: "carey skinny black again | black",
            total: 19,
            addedToCart: 6,
            purchased: 2,
          },
          {
            externalId: "gid://shopify/Product/4855647928397",
            name: "carey skinny dark blue | deep blue",
            total: 18,
            addedToCart: 6,
            purchased: 4,
          },
          {
            externalId: "gid://shopify/Product/4831696322637",
            name: "rachel turtle neck | bordeaux",
            total: 18,
            addedToCart: 6,
            purchased: 2,
          },
          {
            externalId: "gid://shopify/Product/4855702061133",
            name: "roxy super skinny ever black | black",
            total: 17,
            addedToCart: 6,
            purchased: 1,
          },
        ]}
      />
    </StyledHorizontalBarStory>
  );
};

export default {
  title: "NewHorizontalBarComponent",
  component: NewHorizontalBarComponentStory,
};
