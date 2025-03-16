import { Container, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useEventStore } from '../store/event'
import EventCard from '../components/EventCard'
import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
    const {fetchEvents, events} = useEventStore();

    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);
    console.log(events);

  return (
    <Container maxW='container.x1' py={12}>
        <VStack spacing={8}>
            <Text
            fontSize={"30"}
            fontWeight={"bold"}
            bgGradient={"linear(to-r, cyan.400, blue.500)"}
            bgClip={"text"}
            textAlign={"center"}
            >
                Current Events
            </Text>

            <SimpleGrid
                columns={{
                    base:1,
                    md:2,
                    lg:3
                }}
                spacing={10}
                w={"full"}
            >
                {events.map((event) => (
                    <EventCard key={event.id} event={event} />
                ))}

            </SimpleGrid>

            {events.length === 0 && (
                <Text fontSize='x1' textAlign={"center"} fontWeight='bold' color='gray.500'>
                No events available{" "}
                <Link to='/create'>
                <Text as='span' color='blue.500' _hover={{textDecoration: 'underline'}}>Create Event</Text>
                </Link>
            </Text>
            )}
        </VStack>
    </Container>
  )
}

export default HomePage