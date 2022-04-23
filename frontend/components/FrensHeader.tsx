import { useState } from "react";
import {
  Modal,
  Button,
  Group,
  Input,
  InputWrapper,
  Title,
  Text,
  TextInput,
  Card,
  Center,
  Alert,
  Space,
  Table,
  Burger,
  Grid,
  Header,
  MediaQuery,
  useMantineTheme,
  Chip,
} from "@mantine/core";
import { NextComponentType } from "next";
import { useForm } from "@mantine/form";
import { MoodSad } from "tabler-icons-react";
import { CircleCheck } from "tabler-icons-react";
import Image from "next/image";
import logo from "../assets/logo.png";
import { useAccount, useConnect } from "wagmi";

import { ThemeIcon } from "@mantine/core";

const FrensHeader: any = ({}: any) => {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const [{ data, error }, connect] = useConnect();
  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: true,
  });

  const LoggedIn = () => (
    <Chip>
      {accountData?.ens?.name
        ? `${accountData.ens?.name}`
        : `${accountData?.address?.slice(0, 6)}...${accountData?.address?.slice(
            accountData?.address?.length - 4,
            accountData?.address?.length
          )}`}
    </Chip>
  );
  const LoggedOut = () => (
    <>
      {data.connectors.map((connector) => (
        <Button
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => connect(connector)}
          variant="outline"
          color="primary"
        >
          {connector.ready
            ? "Connect " + connector.name
            : connector.name + " (unsupported)"}
        </Button>
      ))}
    </>
  );
  return (
    <Header height={70} p="md">
      <Grid grow gutter="sm" justify="flex-end" align="flex-start">
        <Grid.Col span={3}>
          <div>
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
            <Image src={logo} alt="Logo" width="200" height="40" />
          </div>
        </Grid.Col>
        <Grid.Col span={3}>
          <div style={{ textAlign: "right" }}>
            {accountData ? <LoggedIn /> : <LoggedOut />}
          </div>
        </Grid.Col>
      </Grid>
    </Header>
  );
};

export default FrensHeader;
