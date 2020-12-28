import { Box, Button, Input, Stack, Table, TableCaption, TabList, TabPanels, Tabs, Tbody, Td, Th, Thead, Tr, Tab, TabPanel } from "@chakra-ui/react";
import { useState } from "react";
import { searchEbooks, searchMusicVideos, selectItunesEbooks, selectItunesMusicVideos } from "./itunesSlice";
import { withSearchItems } from '../hocs/withSearchItems';
import { compose } from "@reduxjs/toolkit";

function ITunes({ ebooks, musicVideos, onEbooksSearch, onMusicVideosSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const onSearch = () => {
    onEbooksSearch(searchTerm);
    onMusicVideosSearch(searchTerm);
  }

  return (
    <Box>
      <Stack direction="row">
        <Input value={searchTerm} onChange={event => setSearchTerm(event.target.value)} />
        <Button colorScheme="blue" onClick={onSearch}>Search</Button>
      </Stack>
      <Tabs>
        <TabList>
          <Tab>Ebooks</Tab>
          <Tab>Music videos</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
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
          </TabPanel>
          <TabPanel>
            <Table variant="simple">
              <TableCaption>Imperial to metric conversion factors</TableCaption>
              <Thead>
                <Tr>
                  <Th>Artist name</Th>
                  <Th>Preview</Th>
                  <Th isNumeric>Time</Th>
                </Tr>
              </Thead>
              <Tbody>
                {musicVideos.map(musicVideo => (
                  <Tr key={musicVideo.trackId}>
                    <Td>{musicVideo.artistName}</Td>
                    <Td><img src={musicVideo.previewUrl} /></Td>
                    <Td isNumeric>{musicVideo.trackTimeMillis}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

const WithSearchEbooks = withSearchItems<void, Parameters<typeof searchEbooks>>({
  itemsProp: 'ebooks',
  selector: selectItunesEbooks,
  searchAction: searchEbooks,
})(ITunes);

const WithSearchMusicVideos = withSearchItems<void, Parameters<typeof searchMusicVideos>>({
  itemsProp: 'musicVideos',
  selector: selectItunesMusicVideos,
  searchAction: searchMusicVideos,
})(WithSearchEbooks);

export { WithSearchMusicVideos as ITunes };

// const composed = compose(
//   withSearchItems<void, Parameters<typeof searchEbooks>>({
//     itemsProp: 'ebooks',
//     selector: selectItunesEbooks,
//     searchAction: searchEbooks,
//   }),
//   withSearchItems<void, Parameters<typeof searchMusicVideos>>({
//     itemsProp: 'musicVideos',
//     selector: selectItunesMusicVideos,
//     searchAction: searchMusicVideos,
//   }),
// )

// export { composed as ITunes };
