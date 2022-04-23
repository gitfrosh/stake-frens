import { NextComponentType } from "next";
import type { NextPage } from "next";
import React, { useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Container,
  Center,
  Badge,
  Button,
  Card,
  Group,
  Title,
  Space,
} from "@mantine/core";
import Image from "next/image";
import logo from "../assets/logo.png";

const Start: any = ({ toggleJoinProjectModalOpened , toggleNewProject} :any) => {
  return (
    <Center>
      <div style={{ width: "90%", margin: "auto" }}>
        <Card style={{ paddingTop: 80, paddingBottom: 80 }} shadow="sm" p="lg">
          <Card.Section>
            <div style={{ textAlign: "center", padding: 50}}>
              <Image style={{ marginBottom: 20 }} src={logo} alt="Logo" />
  

           
            <Title style={{ marginTop: 20 }} order={2}>A better way to get things done.</Title>
            {/* <Text>First line</Text>

            <Space h="lg" />
              <Text weight={500}>Norway Fjord Adventures</Text>
              <Badge color="pink" variant="light">
                On Sale
              </Badge>
          

          <Text size="sm" style={{ color: "#000", lineHeight: 1.5 }}>
            With Fjord Tours you can explore more of the magical fjord
            landscapes with tours and activities on and around the fjords of
            Norway
          </Text> */}

          

          <Button
            variant="filled"
            color="primary"
            style={{ marginTop: 14 }}
            onClick={() => toggleNewProject(true)}

          >
            Start Project
          </Button>
          {' '}
          <Button
            variant="outline"
            color="primary"
            onClick={() => toggleJoinProjectModalOpened(true)}
            style={{ marginTop: 14 }}
          >
           Join Project
          </Button>
          </div>
          </Card.Section>
        </Card>
      </div>
    </Center>
  );
};

export default Start;
