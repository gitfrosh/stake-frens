import type { NextPage } from "next";
import React, { useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Start from "../components/Start";
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
  MantineProvider,
  SimpleGrid,
  Grid,
} from "@mantine/core";
import JoinProjectModal from "../components/JoinProjectModal";
import Project from "../components/Project";
import { Provider, chain, defaultChains } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import FrensHeader from "../components/FrensHeader";
import NewProject from "../components/NewProject";
import { EtherscanProvider } from "@ethersproject/providers";
import { ethers } from "ethers";

const Home: NextPage = () => {
  const theme = useMantineTheme();
  const [projectId, setProjectId] = useState();
  const [joinProjectModalOpened, toggleJoinProjectModalOpened] =
    useState(false);
  const [newProject, toggleNewProject] = useState(false);

  // Chains for connectors to support
  const chains = defaultChains;

  // Set up connectors
  const connectors = ({ chainId }: any) => {
    const rpcUrl =
      chains.find((x) => x.id === chainId)?.rpcUrls?.[0] ??
      chain.mainnet.rpcUrls[0];
    return [
      new InjectedConnector({
        chains,
        options: { shimDisconnect: true },
      }),
      // new WalletConnectConnector({
      //   options: {
      //     qrcode: true,
      //   },
      // }),
      // new CoinbaseWalletConnector({
      //   options: {
      //     appName: "My wagmi app",
      //     jsonRpcUrl: `${rpcUrl}/${alchemyId}`,
      //   },
      // }),
    ];
  };

  const provider = new EtherscanProvider(42);
  // Ethers.js provider initialization
// const url =
// "https://eth-kovan.alchemyapi.io/v2/iv9xINB4zud7LQKwTsgcAJP-wxnK9PNV";
//  const provider = new ethers.providers.JsonRpcProvider(url, {
//    name: "kovan",
//    chainId: 42
//  });


  return (
    <Provider provider={provider} autoConnect connectors={connectors}>
      <MantineProvider
        theme={{
          fontFamily: "Courier, sans-serif",
          fontFamilyMonospace: "Monaco, Courier, monospace",
          headings: { fontFamily: "Courier, sans-serif" },
          colors: {
            brand: [
              "#7AD1DD",
              "#5FCCDB",
              "#44CADC",
              "#2AC9DE",
              "#1AC2D9",
              "#11B7CD",
              "#09ADC3",
              "#0E99AC",
              "#128797",
              "#147885",
            ],
          },
          primaryColor: "brand",
        }}
      >
        <AppShell
          styles={{
            main: {
              background:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[8]
                  : theme.colors.gray[0],
            },
          }}
          navbarOffsetBreakpoint="sm"
          asideOffsetBreakpoint="sm"
          fixed
          footer={
            <Footer height={60} p="md">
              Made with love during ETHAmsterdam &hearts;
            </Footer>
          }
          header={<FrensHeader />}
        >
          {projectId ? (
            <Project projectId={projectId} setProjectId={setProjectId} />
          ) : newProject ? (
            <NewProject toggleNewProject={toggleNewProject} />
          ) : (
            <Start
              toggleNewProject={toggleNewProject}
              toggleJoinProjectModalOpened={toggleJoinProjectModalOpened}
            />
          )}
          <JoinProjectModal
            setProjectId={setProjectId}
            joinProjectModalOpened={joinProjectModalOpened}
            toggleJoinProjectModalOpened={toggleJoinProjectModalOpened}
          />
        </AppShell>
      </MantineProvider>
    </Provider>
  );
};

export default Home;
