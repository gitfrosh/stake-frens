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
} from "@mantine/core";
import { NextComponentType } from "next";
import { useForm } from "@mantine/form";
import { MoodSad } from "tabler-icons-react";
import { CircleCheck } from "tabler-icons-react";

import { ThemeIcon } from "@mantine/core";

const Project: any = ({}: any) => {
  const elements = [
    { done: false, wallet: 12.011, staked: true, type: "Lead" },
    { done: false, wallet: 14.007, staked: false, type: "Member" },
  ];
  const rows = elements.map((element) => (
    <tr key={element.wallet}>
      <td>{element.type}</td>
      
      <td>{element.wallet}</td>
      
      <td>
        {element.staked ? (
          <ThemeIcon>
            <CircleCheck />
          </ThemeIcon>
        ) : (
            <ThemeIcon>
            <MoodSad />
          </ThemeIcon>
        )}
      </td>      <td>
        {element.done ? (
          <ThemeIcon>
            <CircleCheck />
          </ThemeIcon>
        ) : (
            <ThemeIcon>
            <MoodSad />
          </ThemeIcon>
        )}
      </td>
    </tr>
  ));

  return (
      <div style={{ width: "90%", margin: "auto" }}>
        <Card style={{ paddingTop: 80, paddingBottom: 80 }} shadow="sm" p="lg">
          <Card.Section>
        
            <div style={{ textAlign: "center", padding: 50 }}>
              <Title order={1}>Project #123</Title>
              <Text color="brand" size="lg">
                Our global task.
              </Text>
              <Space h="md" />
              <Alert color="red">Deadline: 2022-04-22 </Alert>

              <Space h="xl" />
              </div>
              <div style={{ padding: 50 }}>

              <Table striped>
                <thead>
                  <tr>
                    <th>Member / Lead</th>
                    <th>Wallet</th>
                    <th>Staked</th>
                    <th>Task completion</th>
                  </tr>
                </thead>
                <tbody>{rows}</tbody>
              </Table>
              </div>
          </Card.Section>
        </Card>
      </div>
  );
};

export default Project;
