import React, { useState } from "react";
import { cards } from "../../api/mock/mock";
import { Card } from "../card";
import styled from "@emotion/styled";
import { Pagination } from "@mui/material";
import { Sort } from "../sort";

interface CardListProps {
  search: string;
}

export const CardList = (props: CardListProps) => {
  const { search } = props;

  const [page, setPage] = useState<number>(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const cardWithSearch = cards.filter((item, index) =>
    item.name.toLowerCase().includes(search)
  );

  const paginationCard = cardWithSearch.filter(
    (item, index) => index >= (page - 1) * PAGE_SIZE && index < page * PAGE_SIZE
  );

  return (
    <Wrapper>
      <div>
        <Sort />
        <CardsWrapper>
          {paginationCard.map((item) => (
            <Card
              key={item._id}
              pictures={item.pictures}
              discount={item.discount}
              price={item.price}
              name={item.name}
            />
          ))}
        </CardsWrapper>
        <Pagination
          count={cardWithSearch.length / PAGE_SIZE}
          size="small"
          page={page}
          onChange={handleChange}
        />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding-bottom: 20px;
`;

const CardsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;

const PAGE_SIZE = 8;
