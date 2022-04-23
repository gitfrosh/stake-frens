import { useEffect, useState } from "react";
import {
  Button,
  Title,
  Text,
  Card,
  Alert,
  Space,
  Table,
  Checkbox,
  Divider,
  Group,
} from "@mantine/core";
import { Ban, MoodCrazyHappy, ReportMoney } from "tabler-icons-react";
import { CircleCheck } from "tabler-icons-react";
import { useAccount } from "wagmi";
import { Framework } from "@superfluid-finance/sdk-core";
import {  useProvider } from "wagmi";
import abi from "../utils/Stake.json";
import { ethers } from "ethers";
import { useSigner } from "wagmi";

const Project: any = ({ setProjectId, projectId }: any) => {
  const [{ data: signer }] = useSigner();
  const [{ data: accountData }] = useAccount({
    fetchEns: true,
  });
  // contractAddress
  // 0xD7A0f45254E4167bC042896B9B46D02c4A8a1809
  console.log(projectId);
  const contractABI = abi.abi;
  const provider = useProvider();
  const contract = new ethers.Contract(
    projectId, // smart contract address
    contractABI,
    signer
  );

  console.log(provider)
  const [myTaskChecked, toggleTask] = useState(false);
  const [members, setMembers] = useState<any>([]);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      let allMembers: any = [];
      const data = await contract.stateOfCompletion();
      data.forEach((member: any) => {
        console.log(member);
        // if (member.ownerAddress === accountData?.address) {
        //   setAllowed(true);
        // }
        const item = {
          isLead: member.isLead,
          done: member.isCompleted,
          name: member.task,
          // wallet: "0x03D28Df4b4c3a4bb1eA5D0a518E4D045172a6559"
           wallet: member.ownerAddress, 
        };
        allMembers.push(item);
      });
      setMembers(allMembers);
    };
    if (contract && members.length === 0) {
      fetchData().catch(console.error);
    }
  }, [contract]);
  console.log(allowed)


  async function createNewFlow() {
    const sf = await Framework.create({
      chainId: Number(42),
      provider: provider,
    },
    );

    // const signer = sf.createSigner({
    //   privateKey: "1c01d62fce75b264f3c47cd0a6de4ec25b8458a64cbfb858dadc8631061781f6",
    //   provider: provider,
    // });

    const DAIxContract = await sf.loadSuperToken("fDAIx");
    const DAIx = DAIxContract.address;

    try {
      const createFlowOperation = sf.cfaV1.createFlow({
        flowRate: "1",
        receiver: projectId,
        superToken: DAIx,
      });

      console.log("Creating your stream...");
      if (signer) {
        console.log(signer)
        const result = await createFlowOperation.exec(signer);
        console.log(result);
  
        console.log(
          `Congrats - you've just created a money stream!
      `)
      }

      
    } catch (error) {
      console.log(
        "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
      );
      console.error(error);
    }
  }

  const rows = members.map((element: any) => (
    <tr key={element.wallet}>
      <td>{element.isLead ? "Lead" : "Member"}</td>
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
                <Checkbox
                  checked={myTaskChecked}
                  onChange={() => toggleTask(true)}
                />
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

  // if (!allowed) {
  //   return (
  //     <div style={{ width: "90%", margin: "auto" }}>
  //       <Card style={{ paddingTop: 80, paddingBottom: 80 }} shadow="sm" p="lg">
  //         <Card.Section>
  //           <div style={{ textAlign: "center", padding: 50 }}>
  //             Your not allowed to view this project.
  //           </div>
  //         </Card.Section>
  //       </Card>
  //     </div>
  //   );
  // }

  return (
    <div style={{ width: "90%", margin: "auto" }}>
      <Card style={{ paddingTop: 80, paddingBottom: 80 }} shadow="sm" p="lg">
        <Card.Section>
          <div style={{ textAlign: "center", padding: 50 }}>
            <Title order={1}>Project #</Title>
            <Text color="brand" size="lg">
              {projectId}
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
            <Divider />
            <Space h="xl" />

            <Group position="right" mt="md">
              <Button onClick={() => setProjectId(undefined)} variant="outline">
                Close project
              </Button>
            </Group>
          </div>
        </Card.Section>
      </Card>
    </div>
  );
};

export default Project;
