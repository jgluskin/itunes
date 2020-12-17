import { Box, Button, Input, Stack, Table, TableCaption, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchEbooks, selectItunesEbooks } from "./itunesSlice";

export function ITunes() {
  const [searchTerm, setSearchTerm] = useState('');
  const ebooks = useSelector(selectItunesEbooks);
  const dispatch = useDispatch();

  return (
    <Box>
      <Stack direction="row">
        <Input value={searchTerm} onChange={event => setSearchTerm(event.target.value)} />
        <Button colorScheme="blue" onClick={() => dispatch(searchEbooks(searchTerm))}>Search</Button>
      </Stack>
      <Table variant="simple">
        <TableCaption>Imperial to metric conversion factors</TableCaption>
        <Thead>
          <Tr>
            <Th>Track name</Th>
            <Th>Art</Th>
            <Th isNumeric>Price</Th>
          </Tr>
        </Thead>
        <Tbody>
          {ebooks.map(ebook => (
            <Tr key={ebook.trackId}>
              <Td>{ebook.trackName}</Td>
              <Td><img src={ebook.artworkUrl60} /></Td>
              <Td isNumeric>{ebook.formattedPrice}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  )
}
