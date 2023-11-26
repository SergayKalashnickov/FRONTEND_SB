import React from "react";
import { Skeleton } from "@mui/material";
import styled from "@emotion/styled";

export const SkeletonPage = () => {
  return (
    <SkeletonWrapper>
      <Skeleton
        sx={{ bgcolor: "grey.900" }}
        variant="rectangular"
        width={236}
        height={359}
      />
      <Skeleton
        sx={{ bgcolor: "grey.900" }}
        variant="rectangular"
        width={236}
        height={359}
      />
      <Skeleton
        sx={{ bgcolor: "grey.900" }}
        variant="rectangular"
        width={236}
        height={359}
      />
      <Skeleton
        sx={{ bgcolor: "grey.900" }}
        variant="rectangular"
        width={236}
        height={359}
      />
      <Skeleton
        sx={{ bgcolor: "grey.900" }}
        variant="rectangular"
        width={236}
        height={359}
      />
      <Skeleton
        sx={{ bgcolor: "grey.900" }}
        variant="rectangular"
        width={236}
        height={359}
      />
    </SkeletonWrapper>
  );
};

const SkeletonWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-content: center;
  grid-gap: 15px;
`;
