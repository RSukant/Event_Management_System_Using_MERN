import React from 'react';
import { useState } from 'react';
import { Container, VStack, Heading, Box, Input, Button, useColorModeValue, useToast } from '@chakra-ui/react';
import { useEventStore } from '../store/event';

const EventCreatePage = () => {
  const [newEvent, setNewEvent] = useState({
    name: '',
    place: '',
    date: '',
    description: '',
    image: '',
  });

  const toast = useToast();

  const {createEvent} = useEventStore();

  const handleCreateEvent = async() => {
    const {success,message} = await createEvent(newEvent);
    if(success){
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    setNewEvent({ name: '', place: '', date: '', description: '', image: '' });
  };

  return <Container maxW={"container.sm"}>
    <VStack
      spacing={8}
    >
      <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
        Create New Event
      </Heading>

      <Box
        w={"full"} bg={useColorModeValue("white", "gray.800")}
        p={8} rounded={"lg"} shadow={"md"}
      >
        <VStack spacing={4}>
          <Input
          placeholder={"Event Name"}
          name='name'
          value={newEvent.name}
          onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
          />

          <Input
          placeholder={"Event Place"}
          name='place'
          value={newEvent.place}
          onChange={(e) => setNewEvent({ ...newEvent, place: e.target.value })}
          />

          <Input
          placeholder={"Event Date"}
          name='date'
          value={newEvent.date}
          onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
          />

          <Input
          placeholder={"Event Description"}
          name='description'
          value={newEvent.description}
          onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
          />

          <Input
          placeholder={"Event Image URL"}
          name='image'
          value={newEvent.image}
          onChange={(e) => setNewEvent({ ...newEvent, image: e.target.value })}
          />
          <Button colorscheme={"blue"} onClick={handleCreateEvent} w={"full"}>
            Create Event
          </Button>
        </VStack>
      </Box>
    </VStack>
  </Container>
};

export default EventCreatePage;