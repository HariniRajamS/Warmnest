"use client";

import {
  Box,
  Flex,
  Text,
  Button,
  Image,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  // extract username from email
  const email = session?.user?.email || "";
  const username = email.split("@")[0] || "User";

  // random avatar fallback
  const avatar =
    session?.user?.image ||
    `https://api.dicebear.com/7.x/initials/svg?seed=${username}&backgroundColor=34d399&textColor=ffffff`;

  return (
    <Flex
      px={{ base: 4, md: 10 }}
      py={4}
      justify="space-between"
      align="center"
      bg="white"
      boxShadow="sm"
      position="sticky"
      top={0}
      zIndex={100}
    >
      {/* Logo */}
      <Flex align="center" gap={3}>
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Warmnest Logo"
            height="45px"
            objectFit="contain"
            cursor="pointer"
          />
        </Link>
        <Text
          fontSize={{ base: "xl", md: "2xl" }}
          fontWeight="bold"
          color="green.700"
        >
          Warmnest
        </Text>
      </Flex>

      {/* Right Side */}
      {!session ? (
        <Link href="/login">
          <Button
            colorScheme="green"
            size="md"
            borderRadius="lg"
            px={6}
            _hover={{ bg: "green.600" }}
          >
            Login
          </Button>
        </Link>
      ) : (
        <Menu>
          <MenuButton>
            <Flex align="center" gap={3} cursor="pointer">
              <Avatar size="sm" src={avatar} name={username} />
              <Text fontWeight="medium" color="green.700">
                {username}
              </Text>
            </Flex>
          </MenuButton>

          <MenuList>
            <MenuItem as={Link} href="/user">
              My Profile
            </MenuItem>
            <MenuItem onClick={() => signOut({ callbackUrl: "/" })}>
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      )}
    </Flex>
  );
}
