import { useState } from "react";
import {
  Button,
  Title,
  Text,
  Card,
  Alert,
  Space,
  Table,
  Checkbox,
} from "@mantine/core";
import { Ban, MoodCrazyHappy, ReportMoney } from "tabler-icons-react";
import { CircleCheck } from "tabler-icons-react";
import { useAccount } from "wagmi";
import { Framework } from "@superfluid-finance/sdk-core";
import { useProvider } from 'wagmi'

const Project: any = ({}: any) => {
  const [{ data: accountData }] = useAccount({
    fetchEns: true,
  });
  const [myTaskChecked, toggleTask] = useState(false)
  const elements = [
    {
      done: false,
      wallet: "0x03D28Df4b4c3a4bb1eA5D0a518E4D045172a6559",
      staked: false,
      type: "Lead",
    },
    { done: false, wallet: "0fd", staked: false, type: "Member" },
  ];

  const provider = useProvider()

async function createNewFlow() {
  const sf = await Framework.create({
    chainId: Number(4),
    provider: provider
  });

  const signer = sf.createSigner({
    privateKey: accountData?.address,
    provider: provider
  });

  const DAIxContract = await sf.loadSuperToken("fDAIx");
  const DAIx = DAIxContract.address;

  try {
    const createFlowOperation = sf.cfaV1.createFlow({
      flowRate: "0.001",
      receiver: "0x03D28Df4b4c3a4bb1eA5D0a518E4D045172a6559",
      superToken: DAIx
      // userData?: string
    });

    console.log("Creating your stream...");

    const result = await createFlowOperation.exec(signer);
    console.log(result);

    console.log(
      `Congrats - you've just created a money stream!
    View Your Stream At: https://app.superfluid.finance/dashboard/${recipient}
    Network: Kovan
    Super Token: DAIx
    `
    );
  } catch (error) {
    console.log(
      "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
    );
    console.error(error);
  }
}



  const rows = elements.map((element) => (
    <tr key={element.wallet}>
      <td>{element.type}</td>
      <td>{`${element.wallet?.slice(0, 6)}..`}</td>
      <td>
        {element.staked ? (
          <Button disabled leftIcon={<CircleCheck />}>
            Staking started!
          </Button>
        ) : (
          <Button
          onClick={() => createNewFlow()}
            disabled={element.wallet !== accountData?.address}
            leftIcon={
              element.wallet === accountData?.address ? (
                <ReportMoney />
              ) : (
                <Ban />
              )
            }
          >
            {element.wallet === accountData?.address
              ? "Start stake stream now!"
              : "Waiting for stake.."}
          </Button>
        )}
      </td>{" "}
      <td>
        {element.done ? (
          <Button disabled leftIcon={<MoodCrazyHappy />}>
            Task done!
          </Button>
        ) : (
          <Button
            disabled={element.wallet !== accountData?.address}
            leftIcon={
              element.wallet === accountData?.address ? (
                <Checkbox checked={myTaskChecked} onChange={() => toggleTask(true)} />
              ) : (
                <Ban />
              )
            }
          >
            {element.wallet === accountData?.address
              ? "Check now!"
              : "Waiting for completion.."}
          </Button>
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
