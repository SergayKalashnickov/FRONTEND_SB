import "./styles.css";
import { Header } from "../components";
import { CardList } from "../components";
import { Footer } from "../components";
import styled from "@emotion/styled";
import { useState } from "react";

export const App = () => {
  const [search, setSearch] = useState<string>("");
  const setSearchValue = () => setSearch("");

  return (
    <Page>
      <Header onChange={setSearch} value={search} onReset={setSearchValue} />
      <CardList search={search} />
      <Footer />
    </Page>
  );
};

const Page = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
