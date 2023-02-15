import React from "react";
import { createStyles, Header, Container, Group, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { NavLink } from "react-router-dom";
import LogoutButton from "./LogoutButton";

const useStyles = createStyles((theme) => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "right",
    height: "100%",
    backgroundColor: "  ",
  },

  links: {
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("xs")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));

interface HeaderSimpleProps {
  links: { link: string; label: string }[];
}

export function Navbar({ links }: HeaderSimpleProps) {
  const [opened, { toggle }] = useDisclosure(false);
  const { classes, cx } = useStyles();

  const items = links.map((link, index) => (
    <div key={index}>
      <NavLink
        to={link.link}
        className={({ isActive }) =>
          isActive ? cx(classes.link, classes.linkActive) : classes.link
        }
      >
        {link.label}
      </NavLink>
    </div>
  ));

  return (
    <Header height={60} mb={30}>
      <Container className={"flex h-full place-content-between"}>
        <img
          src="/sareasoft.svg"
          alt="sarea soft small logo"
          className="max-h-full"
        />
        <Group spacing={5} className={classes.links}>
          {items}
          <LogoutButton></LogoutButton>
        </Group>

        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size="sm"
        />
      </Container>
    </Header>
  );
}
