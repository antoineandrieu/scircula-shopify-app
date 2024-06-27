import { resultKeyNameFromField } from "@apollo/client/utilities";
import axios from "axios";
import React, { useState } from "react";

export const getAuthenticationAccessToken = async () => {
  try {
    const buff = Buffer.from(
      process.env.AUTHENTICATION_CLIENT_ID +
        ":" +
        process.env.AUTHENTICATION_CLIENT_SECRET,
      "utf-8",
    );

    // decode buffer as Base64
    const base64 = buff.toString("base64");

    const params = new URLSearchParams();

    params.append("grant_type", "client_credentials");
    params.append("client_id", process.env.AUTHENTICATION_CLIENT_ID);
    params.append("scope", process.env.AUTHENTICATION_SCOPE);

    const result = await axios({
      method: "POST",
      url: process.env.AUTHENTICATION_SERVER_URL,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${base64}`,
      },
      data: params,
    });

    return result.data.access_token;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getVendorInfo = async (access_token, shop, isDemo = null) => {
  try {
    const result = await axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_API_URL}/vendors`,
      params: { shop_url: shop, demo: isDemo ? true : undefined },
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return result.data;
  } catch (error) {
    console.error(
      `getVendorInfo ${error.response.status}: ${error.response.data?.error}`,
    );
    return null;
  }
};

export const createVendor = async (access_token, vendorInfos) => {
  try {
    const result = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_API_URL}/vendors/`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      data: vendorInfos,
    });

    return result.data;
  } catch (error) {
    console.error(error.response.data);
    return null;
  }
};

export const updateVendor = async (access_token, shop, vendorInfos) => {
  try {
    const result = await axios({
      method: "PATCH",
      url: `${process.env.NEXT_PUBLIC_API_URL}/vendors/x/`,
      params: { shop_url: shop },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      data: vendorInfos,
    });

    return result.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getDashboardData = async ({
  access_token,
  shop_url,
  product,
  gender,
  start_date,
  end_date,
  external_category,
  isDemo,
  setIsTimeOut,
}) => {
  try {
    const result = await axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_API_URL}/vendors/dashboard/`,
      timeout: 10000,
      params: {
        shop_url,
        product: product ? product : undefined,
        gender: gender ? gender : undefined,
        start_date,
        end_date,
        external_category: external_category ? external_category : undefined,
        demo: isDemo ? true : undefined,
      },
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    setIsTimeOut(false);
    return result.data;
  } catch (error) {
    if (error.response) {
      console.error(error.response.data);
      setIsTimeOut(false);
      return null;
    } else {
      if (error.message && error.message.includes("timeout")) {
        setIsTimeOut(true);
        const result = await axios({
          method: "GET",
          url: `${process.env.NEXT_PUBLIC_API_URL}/vendors/dashboard/`,
          params: {
            shop_url,
            product: product ? product : undefined,
            gender: gender ? gender : undefined,
            start_date,
            end_date,
            external_category: external_category
              ? external_category
              : undefined,
            demo: isDemo ? true : undefined,
          },
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
        setIsTimeOut(false);

        return result.data;
      }
    }
  }
};

export const getDashboardProducts = async (access_token, shop_url, isDemo) => {
  try {
    const result = await axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_API_URL}/vendors/products/`,
      params: { shop_url, demo: isDemo ? true : undefined },
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return result.data;
  } catch (error) {
    console.log(error.response);
    return null;
  }
};

export const loadScriptTag = async (shop, input) => {
  try {
    const result = await axios({
      method: "POST",
      url: `/scripttag/`,
      headers: {
        "Content-Type": "application/json",
      },
      data: { shop, input },
    });

    return result.data;
  } catch (error) {
    return null;
  }
};

export const unloadScriptTag = async (shop, input) => {
  try {
    const result = await axios({
      method: "DELETE",
      url: `/scripttag/`,
      headers: {
        "Content-Type": "application/json",
      },
      data: { shop, input },
    });

    return result.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const choosePlan = async (shop, host, input) => {
  try {
    const result = await axios({
      method: "POST",
      url: `/plan/`,
      headers: {
        "Content-Type": "application/json",
      },
      data: { shop, host, input },
    });

    return result.data;
  } catch (error) {
    return null;
  }
};

export const payIntegration = async (shop, host, input) => {
  try {
    const result = await axios({
      method: "POST",
      url: `/integration/`,
      headers: {
        "Content-Type": "application/json",
      },
      data: { shop, host, input },
    });

    return result.data;
  } catch (error) {
    return null;
  }
};
