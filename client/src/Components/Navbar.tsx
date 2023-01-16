import React from "react";
// import { Link } from "react-router-dom";
// import LogoutButton from "./LogoutButton";

// const Navbar = () => {
//   return (
//     <nav className="flex gap-5 place-content-center mb-10 p-5 text-xl place-items-center">
//       <Link to={"/users"}>users</Link>
//       {/* <Link to={"/login"}>login</Link> */}
//       <Link to={"/services"}>services</Link>
//       <Link to={"/me"}>me</Link>
//       <LogoutButton />
//     </nav>
//   );
// };

// export default Navbar;

import { useState } from "react";
import { createStyles, Header, Container, Group, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MantineLogo } from "@mantine/ds";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";

const useStyles = createStyles((theme) => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
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
  const [active, setActive] = useState(links[0].link);
  const { classes, cx } = useStyles();

  const items = links.map((link, index) => (
    <div key={index}>
      <Link
        to={link.link}
        className={cx(classes.link, {
          [classes.linkActive]: active === link.link,
        })}
        onClick={() => {
          // event.preventDefault();
          setActive(link.link);
        }}
      >
        {link.label}
      </Link>
    </div>
  ));

  return (
    <Header height={60} mb={120}>
      <Container className={classes.header}>
        <div className="pt-5  rounded-full">
          <img
            src="/grosLogo.png"
            alt="donibaneLOGO"
            className="bg-black rounded-b-xl w-full"
          />
        </div>
        {/* <MantineLogo size={28} /> */}
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
