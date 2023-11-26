import React from 'react';
import styled from "@emotion/styled";

interface CardProps {
    pictures: string;
    available?: boolean;
    discount?: number,
    stock?: number,
    price: number,
    wight?: string,
    name: string
}

export const Card = (props: CardProps) => {
    const {pictures, discount, price, name} = props
    return (
        <Wrapper>
            <Picture src={pictures} alt={props.name}/>
            {discount && (<text>{discount}</text>)}
            <text>{price}</text>
            <text>{name}</text>
            <ButtonCard>В корзину</ButtonCard>
        </Wrapper>
    );
}

const Picture = styled.img`
    Width: 236px;
    Height: 187px;
`

const Wrapper = styled.div`
    Width: 236px;
    Height:359px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`
const ButtonCard = styled.button`
  Width: 121px;
  Height: 40px;
  border-radius:55px;
  background-color: #FFE44D;
  &:hover {
  background-color: RED;
}
    `