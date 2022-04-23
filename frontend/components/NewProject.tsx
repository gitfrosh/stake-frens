import { useState } from "react";
import {
  Modal,
  Button,
  Group,
  Input,
  Text,
  InputWrapper,
  Title,
  TextInput,
  Card,
  Space,
  ActionIcon,
  Divider,
} from "@mantine/core";
import { NextComponentType } from "next";
import { formList, useForm } from "@mantine/form";
import { useAccount, useConnect } from "wagmi";
import { Trash } from "tabler-icons-react";
import { DatePicker } from "@mantine/dates";

const NewProject: any = ({
  toggleNewProject
}: any) => {
  const [{ data: accountData }] = useAccount({
    fetchEns: true,
  });
  const form = useForm({
    initialValues: {
      projectName: "",
      deadline: undefined,
      lead: accountData?.address,
      members: formList([{ wallet: "" }]),
    },
  });
  const fields = form.values.members.map((_, index) => (
    <Group key={index} mt="xs">
      <TextInput
        placeholder="0x..."
        required
        sx={{ flex: 1 }}
        {...form.getListInputProps("members", index, "wallet")}
      />
      <ActionIcon
        color="red"
        variant="hover"
        onClick={() => form.removeListItem("members", index)}
      >
        <Trash size={16} />
      </ActionIcon>
    </Group>
  ));

  return (
    <div style={{ width: "90%", margin: "auto" }}>
      <Card style={{ paddingTop: 80, paddingBottom: 80 }} shadow="sm" p="lg">
        <Card.Section>
          <div style={{ textAlign: "center", padding: 50 }}>
            <Title order={1}>Start a new Project with your frens!</Title>
          </div>
          <div style={{ padding: 50 }}>
            <form
              onSubmit={form.onSubmit((values) => {
                console.log(values);
              })}
            >
              <TextInput
                required
                label="Project name"
                description="Please enter a project name or a global task for your team."
                {...form.getInputProps("projectName")}
                placeholder=""
              />
              <Space h="md" />
              <DatePicker
                {...form.getInputProps("deadline")}
                placeholder="Pick due date"
                label="Deadline"
                required
              />
              <Space h="md" />
              <TextInput
                required
                disabled
                label="Team Lead (It's you!)"
                description="Please enter a project name or a global task for your team."
                {...form.getInputProps("lead")}
              />
              <Space h="md" />
              {fields.length > 0 ? (
                <Group mb="xs">
                  <Text weight={500} size="sm" sx={{ flex: 1 }}>
                    Team Members
                  </Text>
                </Group>
              ) : (
                <Text color="dimmed" align="center">
                  No one here...
                </Text>
              )}
              {fields}{" "}
              <Group position="center" mt="md">
                <Button
                  onClick={() => form.addListItem("members", { wallet: "" })}
                >
                  Add member
                </Button>
              </Group>
              <Space h="xl" />

              <Divider />
              <Group position="right" mt="md">
              <Button onClick={() => toggleNewProject(false)} variant="outline" >Cancel</Button>

                <Button type="submit">Submit</Button>
              </Group>
            </form>
          </div>
        </Card.Section>
      </Card>
    </div>
  );
};

export default NewProject;
