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
      {/* <div>{process.env.REACT_APP_API_URL}</div> */}
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        {/* Lamiasoft */}
        <img src="/sareasoft.svg" alt="" className="w-1/2" />
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form action="" onSubmit={handleSubmit}>
          <TextInput
            label="Nom d'utilisateur"
            placeholder="Votre nom de compte"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <PasswordInput
            label="Mot de passe"
            placeholder="Votre mot de passe"
            required
            mt="md"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Group position="apart" mt="lg">
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
