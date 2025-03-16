import { Box, useColorModeValue } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import EventCreate from './pages/EventCreatePage';
import Home from './pages/HomePage';
import Navbar from './components/Navbar';

function App() {
  return (
    <Box minH={'100vh'} bg={useColorModeValue("gray.100", "gray.900")}>
      <Navbar />
      <Routes>
        <Route path="/create" element={<EventCreate />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Box>
  );
}

export default App
