"use client";
import { forwardRef } from "react";
import { FaChevronRight } from "react-icons/fa";
import { Group, Avatar, Text, UnstyledButton } from "../mantine-components";
import { useTheme } from "next-themes";

interface UserButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  image?: string;
  name: string;
  email: string;
  initials?: string;
  show?: boolean;
  icon?: React.ReactNode;
}

const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
  (
    { image, name, email, icon, initials, show, ...others }: UserButtonProps,
    ref
  ) => {
    const { theme } = useTheme();
    return (
      <UnstyledButton
        ref={ref}
        className="block w-full px-2 py-1 text-[#f9f8fc] hover:bg-[#cfb9f9] dark:text-[#5515d4] hover:dark:bg-[#3b3c40]"
        {...others}
      >
        <Group>
          <Avatar color="#5E17EB" radius="xl">
            {initials}
          </Avatar>

          <div className="hidden lg:block" style={{ flex: 1 }}>
            <Text size="sm" className="font-semibold text-[#5E17EB]">
              {name}
            </Text>

            <Text className="text-[#00DCB3]" size="xs">
              {email}
            </Text>
          </div>

          {show && (icon || <FaChevronRight fontSize={16} color="#5E17EB" />)}
        </Group>
      </UnstyledButton>
    );
  }
);

UserButton.displayName = "UserButton";

export default UserButton;
