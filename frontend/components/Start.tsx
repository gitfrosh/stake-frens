import React from "react";
import {
  Text,
  Center,
  Button,
  Card,
  Title,
  Space,
} from "@mantine/core";
import Image from "next/image";
import logo from "../assets/logo.png";
import { useAccount } from "wagmi";

const Start: any = ({ toggleJoinProjectModalOpened , toggleNewProject} :any) => {
  const [{ data: accountData }] = useAccount({
    fetchEns: true,
  });
  return (
    <Center>
      <div style={{ width: "90%", margin: "auto" }}>
        <Card style={{ paddingTop: 80, paddingBottom: 80 }} shadow="sm" p="lg">
          <Card.Section>
            <div style={{ textAlign: "center", padding: 50}}>
              <Image style={{ marginBottom: 20 }} src={logo} alt="Logo" />

            <Title style={{ marginTop: 20 }} order={2}>A better way to get things done.</Title>
            <Space h="xl" />

            <Text>Start a project with your frens, stake xDAI and 
              commit to your sub-tasks. If you fail your deadline, your staked
              xDAI goes to charity. 

            </Text>
            <Space h="xl" />

            {/*
            <Space h="xl" />

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
          disabled={!accountData?.address}
            variant="filled"
            color="primary"
            style={{ marginTop: 14 }}
            onClick={() => toggleNewProject(true)}

          >
            Start Project
          </Button>
          {' '}
          <Button
                    disabled={!accountData?.address}

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
