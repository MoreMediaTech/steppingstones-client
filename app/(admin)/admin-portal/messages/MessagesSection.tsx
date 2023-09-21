"use client";
import React from "react";
import { Loader, Tabs, Text, Box } from "@components/mantine-components";
import { MdEmail } from "react-icons/md";
import { SiMinutemailer } from "react-icons/si";
import { useMediaQuery } from "@mantine/hooks";

import { DataTable } from "@components/table/data-table";
import { columns } from "./table-column";

// hooks (Controller)
import useMessagesController from "./use-messages-controller";

// zod schemas
import { PartialMessageSchemaProps } from "@models/Messages";

export function MessagesSection() {
  const matches = useMediaQuery("(max-width: 900px)", true, {
    getInitialValueInEffect: false,
  });

  const { messages, sentMessages, isLoading, handleDeleteMany } =
    useMessagesController();

  if (isLoading) {
    return (
      <div className="flex h-[700px] items-center justify-center">
        <Loader size="xl" variant="bars" />
      </div>
    );
  }

  return (
    <section className="h-full w-full">
      <Tabs
        color="violet"
        variant="outline"
        orientation={matches ? "horizontal" : "vertical"}
        radius="xs"
        defaultValue="inbox"
        keepMounted={false}
      >
        <Tabs.List aria-label="messages">
          <Tabs.Tab value="inbox" icon={<MdEmail fontSize={24} />}>
            <Text fz="md" fw={500} className="text-gray-800 dark:text-gray-200">
              Inbox
            </Text>
          </Tabs.Tab>
          <Tabs.Tab value="sent" icon={<SiMinutemailer fontSize={24} />}>
            <Text fz="md" fw={500} className="text-gray-800 dark:text-gray-200">
              Sent
            </Text>
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="inbox" pt="xs">
          <Box
            sx={{
              marginTop: "1rem",
              marginLeft: "1rem",
            }}
          >
            <DataTable
              columns={columns}
              data={messages as PartialMessageSchemaProps[]}
              name={"from" || "subject"}
              handleDeleteManyById={handleDeleteMany}
            />
          </Box>
        </Tabs.Panel>
        <Tabs.Panel value="sent" pt="xs">
          <Box
            sx={{
              marginTop: "1rem",
              marginLeft: "1rem",
            }}
          >
            <DataTable
              columns={columns}
              data={sentMessages as PartialMessageSchemaProps[]}
              name={"from" || "subject"}
              handleDeleteManyById={handleDeleteMany}
            />
          </Box>
        </Tabs.Panel>
      </Tabs>
    </section>
  );
}

export default MessagesSection;
