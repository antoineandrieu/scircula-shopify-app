import React, { useEffect } from "react";
import styled from "styled-components";
import { useSessionContext } from "../../contexts/SessionContext";

import { payIntegration } from "../../lib/backendMethods";
import { ScirculaPlanTitle } from "./PlansComponent";

const StyledImplementationComponent = styled.div``;

export interface PlanInterface {
  plan: ScirculaPlanTitle;
  title: string;
  price: number;
}

const scirculaImplementations: Array<PlanInterface> = [
  {
    plan: ScirculaPlanTitle.FIRST_PLAN,
    title: `${ScirculaPlanTitle.FIRST_PLAN} Implementation`,
    price: 891,
  },
  {
    plan: ScirculaPlanTitle.SECOND_PLAN,
    title: `${ScirculaPlanTitle.SECOND_PLAN} Implementation`,
    price: 1188,
  },
  {
    plan: ScirculaPlanTitle.THIRD_PLAN,
    title: `${ScirculaPlanTitle.THIRD_PLAN} Implementation`,
    price: 1544,
  },
];

interface PlansComponentProps {
  plan: string;
}

const ImplementationComponent = ({ plan }: PlansComponentProps) => {
  const { shop, host } = useSessionContext();

  const getConfirmationUrl = async (shop, host, input) => {
    const confirmationUrl = await payIntegration(shop, host, input);
    window.top.location.href = confirmationUrl;
  };

  useEffect(() => {
    if (plan) {
      let input = null;
      let planInput = null;
      if (plan == ScirculaPlanTitle.FIRST_PLAN) {
        planInput = scirculaImplementations[0];
      } else if (plan == ScirculaPlanTitle.SECOND_PLAN) {
        planInput = scirculaImplementations[1];
      } else if (plan == ScirculaPlanTitle.THIRD_PLAN) {
        planInput = scirculaImplementations[2];
      }
      input = {
        name: planInput.title,
        amount: planInput.price,
      };
      getConfirmationUrl(shop, host, input);
    }
  }, [plan]);

  return <StyledImplementationComponent />;
};

export default ImplementationComponent;
