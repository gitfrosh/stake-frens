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

const Home: NextPage = () => {
  const theme = useMantineTheme();
  const [projectId, setProjectId] = useState();
  const [joinProjectModalOpened, toggleJoinProjectModalOpened] =
    useState(false);
  const [newProject, toggleNewProject] = useState(false);
  const alchemyId =
    "https://eth-rinkeby.alchemyapi.io/v2/2jGs4dNiDis1z-obgpnYChHC91ur_Zfg";

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

  // const provider = () =>
  // new providers.InfuraProvider(4, 'Your infura id')


  return (
    <Provider 
    // provider={provider}
     autoConnect connectors={connectors}>
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
              Application footer
            </Footer>
          }
          header={<FrensHeader />}
        >
          {projectId ? (
            <Project />
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
