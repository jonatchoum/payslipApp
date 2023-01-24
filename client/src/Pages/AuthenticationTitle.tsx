import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";
import { useLogin } from "../Hooks/useLogin";
import { Navigate } from "react-router-dom";

export function AuthenticationTitle() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const mutation = useLogin(username, password);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  const handleClick = () => {
    navigate("/resetPasswordMail");
  };

  return (
    <Container size={420} my={40} className="grid">
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        {/* Lamiasoft */}
        <img src="logo ona.png" alt="" className="w-full" />
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form action="" onSubmit={handleSubmit}>
          <TextInput
            label="Nom d'utilisateur"
            placeholder="Your username"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <PasswordInput
            label="Mot de passe"
            placeholder="Your password"
            required
            mt="md"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Group position="apart" mt="lg">
            {/* <Checkbox label="Remember me" sx={{ lineHeight: 1 }} /> */}
            <Anchor<"a"> onClick={handleClick} href="#" size="sm">
              Mot de passe oublié ?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl" type="submit">
            Se connecter
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
