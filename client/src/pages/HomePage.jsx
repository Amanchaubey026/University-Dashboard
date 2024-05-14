/* eslint-disable no-unused-vars */

import {
  Container,
  Box,
  Heading,
  Text,
  Button,
  Stack,
  Icon,
  useColorModeValue,
  createIcon,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/auth");
  }
  return (
    <Container maxW={"3xl"}>
      <Stack
        as={Box}
        textAlign={"center"}
        spacing={{ base: 8, md: 14 }}
        py={{ base: 20, md: 36 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
          lineHeight={"110%"}
        >
          To get started, <br />
          <Text as={"span"} color={"blue.400"}>
            please login or register
          </Text>
        </Heading>
        <Text color={"gray.500"}>
          About University Dashboard Web App: A centralized platform for
          students, faculty, and administrators to access academic,
          administrative, and campus life information efficiently.
        </Text>
        <Stack
          direction={"column"}
          spacing={3}
          align={"center"}
          alignSelf={"center"}
          position={"relative"}
        >
          <Button
            onClick={handleClick}
            colorScheme={"blue"}
            bg={"blue.400"}
            rounded={"full"}
            px={6}
            _hover={{
              bg: "blue.500",
            }}
          >
            Login / SignUp
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}

export default Homepage;
