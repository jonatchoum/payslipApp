import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Container,
  Group,
  Button,
} from "@mantine/core";
import { useLogin } from "../Hooks/useLogin";

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
        <img src="/sareasoft.svg" alt="" className="w-1/2" />
      </Title>
      <p className="font-bold text-center text-sky-800">
        Bienvenue dans votre espace Sareasoft
      </p>
      <Paper withBorder shadow="md" p={30} mt={0} radius="md">
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
