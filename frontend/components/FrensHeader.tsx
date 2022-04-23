import { useState } from "react";
import {
  Button,
  Text,
  Burger,
  Grid,
  Header,
  MediaQuery,
  useMantineTheme,
} from "@mantine/core";
import Image from "next/image";
import logo from "../assets/logo.png";
import { useAccount, useConnect } from "wagmi";


const FrensHeader: any = ({}: any) => {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const [{ data }, connect] = useConnect();
  const [{ data: accountData }] = useAccount({
    fetchEns: true,
  });

  const LoggedIn = () => (
    <div style={{ marginTop: 10 }}>
     <Text>  {accountData?.ens?.name
        ? `Hello ${accountData.ens?.name}!`
        : `Hello ${accountData?.address?.slice(0, 6)}...${accountData?.address?.slice(
            accountData?.address?.length - 4,
            accountData?.address?.length
          )}!`}</Text> </div>
  );
  const LoggedOut = () => (
    <>
      {data.connectors.map((connector) => (
        <Button
          disabled={!connector.ready && !!accountData?.address}
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
