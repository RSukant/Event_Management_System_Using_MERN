import React from 'react'
import { Box, Heading, IconButton, Image, HStack, Text, useColorModeValue, useToast, Modal, useDisclosure, ModalBody } from '@chakra-ui/react'
import { Input, VStack } from '@chakra-ui/react'
import { ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, ModalFooter, Button } from '@chakra-ui/react'
import { useEventStore } from '../store/event'
import { useState } from 'react'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'


const EventCard = ({event}) => {
  const [updatedEvent, setUpdatedEvent] = useState(event);
  const textColor = useColorModeValue('gray.600', 'gray.200');
  const bg= useColorModeValue('white', 'gray.800');

  const { isOpen, onOpen, onClose } = useDisclosure()

  const {deleteEvent, updateEvent} = useEventStore();
  const toast = useToast();

  const handleDeleteEvent = async (eid) => {
  const {success, message} = await deleteEvent(eid);
  if(success){
    toast({
      title: "Success",
      description: message,
      status: "success",
      duration: 5000,
      isClosable: true,
    })
  } else {
    toast({
      title: "Error",
      description: message,
      status: "error",
      duration: 5000,
      isClosable: true,
    })
  }
}

const handleUpdateEvent = async (eid, updatedEvent) => {
  const {success, message} = await updateEvent(eid, updatedEvent);
  onClose();
  if(!success){
    toast({
      title: "Error",
      description: message,
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  } else {
    toast({
      title: "Success",
      description: "Event updated successfully",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  }
};

  return (
    <Box
      shadow='lg'
      rounded='lg'
      overflow='hidden'
      transition='all 0.3s'
      _hover={{transform: 'translateY(-5px)', shadow: 'xl'}}
      bg={bg}
    >
      <Image src={event.image} alt={event.name} h='48' w='full' objectFit='cover' />

      <Box p={4}>
        <Heading as='h3' size='md' mb={2}>
          {event.name}
        </Heading>
        <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
          {event.date}
        </Text>

        <HStack spacing={2}>
          <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme='blue' />
          <IconButton icon={<DeleteIcon />} onClick={() => handleDeleteEvent(event._id)} colorScheme='red' />
        </HStack>
    </Box>

    <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Event</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
                  <Input placeholder={"Event Name"} name='name' value={updatedEvent.name}
                  onChange={(e) => setUpdatedEvent({ ...updatedEvent, name: e.target.value })}
                  />
        
                  <Input placeholder={"Event Place"} name='place' value={updatedEvent.place}
                  onChange={(e) => setUpdatedEvent({ ...updatedEvent, place: e.target.value })}
                  />
        
                  <Input placeholder={"Event Date"} name='date' value={updatedEvent.date}
                  onChange={(e) => setUpdatedEvent({ ...updatedEvent, date: e.target.value })}
                  />
  
                  <Input placeholder={"Event Description"} name='description' value={updatedEvent.description}
                  onChange={(e) => setUpdatedEvent({ ...updatedEvent, description: e.target.value })}
                  />
        
                  <Input placeholder={"Event Image URL"} name='image' value={updatedEvent.image}
                  onChange={(e) => setUpdatedEvent({ ...updatedEvent, image: e.target.value })}
                  />
            </VStack>
        </ModalBody>
        <ModalFooter>
            <Button colorScheme='blue' mr={3} 
              onClick={() => handleUpdateEvent(event._id, updatedEvent)}
            >
              Update
            </Button>
            <Button variant='ghost' onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default EventCard;