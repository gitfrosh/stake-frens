import { useState } from "react";
import {
  Modal,
  Button,
  Group,
  Input,
  InputWrapper,
  Title,
  TextInput,
} from "@mantine/core";
import { NextComponentType } from "next";
import { useForm } from "@mantine/form";

const JoinProjectModal: any = ({
  joinProjectModalOpened,
  toggleJoinProjectModalOpened,
  setProjectId,
}: any) => {
  const form = useForm({
    initialValues: {
      projectId: "",
    },
  });
  return (
    <Modal
      size="sm" // -> predefined small size
      centered
      opened={joinProjectModalOpened}
      onClose={() => toggleJoinProjectModalOpened(false)}
      title={<Title order={3}>Hey fren!</Title>}
    >
      <form onSubmit={form.onSubmit((values) => {
        setProjectId(values.projectId) 
        toggleJoinProjectModalOpened(false) 
      } )}>
          
      <TextInput
         required
         label="Project id"
         description="Please enter an existing project id. Hint: Try 0xD7A0f45254E4167bC042896B9B46D02c4A8a1809 :)"
          {...form.getInputProps("projectId")}
          placeholder=""
        />
        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Modal>
  );
};

export default JoinProjectModal;
