import React from "react";
import Container from "../components/Container";
import { Header, AppName } from "../components/Header";
import JumbotronDefault from "../components/JumbotronDefault";
import Navbar from "../components/Navbar";

type MainLayoutProps = {
  children: React.ReactNode;
  showJumbotronDefault?: boolean;
};

export default function MainLayout({
  children,
  showJumbotronDefault,
}: MainLayoutProps) {
  return (
    <Container>
      <Header>
        <AppName>ANIMECOLLECTIONS</AppName>
        <Navbar />
      </Header>
      {showJumbotronDefault && <JumbotronDefault />}

      {children}
    </Container>
  );
}
