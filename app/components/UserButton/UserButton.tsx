"use client";
import { forwardRef } from "react";
import { FaChevronRight } from "react-icons/fa";

import { useTheme } from "next-themes";
import { Button } from "@components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";

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
      <Button
        ref={ref}
        className="block w-full px-2 py-1 text-[#f9f8fc] hover:bg-[#cfb9f9] dark:text-[#5515d4] hover:dark:bg-[#3b3c40]"
        {...others}
      >
        <div>
          <Avatar>
            {image ? (
              <AvatarImage src={image} alt={name} />
            ) : (
              <AvatarFallback>{initials}</AvatarFallback>
            )}
          </Avatar>

          <div className="hidden lg:block" style={{ flex: 1 }}>
            <h3 className="font-semibold text-[#5E17EB] text-sm">
              {name}
            </h3>

            <p className="text-[#00DCB3] text-xs">
              {email}
            </p>
          </div>

          {show && (icon || <FaChevronRight fontSize={16} color="#5E17EB" />)}
        </div>
      </Button>
    );
  }
);

UserButton.displayName = "UserButton";

export default UserButton;
