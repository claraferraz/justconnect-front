import { Divider, Tag, Box, Text } from '@chakra-ui/react';
import { MdArrowUpward, MdMoreVert } from 'react-icons/md';

export function PostPage() {
  return (
    <>
      <Box>
        <Box mt="39px" display="flex" gap="35px">
          <Text
            color="#805AD5"
            fontSize="14px"
            fontWeight="500"
            lineHeight="20px"
          >
            @username
          </Text>
          <Text fontSize="12px" fontWeight="500" color="#515151">
            3 dias atrás
          </Text>
          <MdMoreVert style={{ marginLeft: '100px' }} />
        </Box>

        <Text mt="9px" color="#000" fontSize="16px" fontWeight="600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Text>

        <Box mt="8px" display="flex" alignItems="center">
          <Box display="flex" flexDirection="column" alignItems="center">
            <MdArrowUpward style={{ width: '24px', height: '24px' }} />
            <Text fontSize="16px" fontWeight="600" color="#000">
              8
            </Text>
          </Box>
          <Text
            marginLeft="37px"
            mt="8px"
            color="#111"
            fontSize="14px"
            fontWeight="500"
          >
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.
          </Text>
        </Box>

        <Box marginLeft="126px" mt="28px" display="flex">
          <Tag size="md" variant="solid" colorScheme="purple">
            Tag Name
          </Tag>
          <Tag
            size="md"
            variant="solid"
            colorScheme="purple"
            marginLeft="14px"
            background="#4B6820"
          >
            Tag number 2
          </Tag>
        </Box>

        <Box>
          <Divider mt="15px" background="#DEDEDE" height="1px" />
          <Text mt="5px" color="#515151" fontSize="12px" fontWeight="500">
            2 comentários
          </Text>
        </Box>
        <MdMoreVert style={{ marginTop: '28px', marginLeft: '328px' }} />
        <Box mt="8px" display="flex" alignItems="center">
          <Box
            marginLeft="39px"
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <MdArrowUpward style={{ width: '24px', height: '24px' }} />
            <Text fontSize="16px" fontWeight="600" color="#000">
              4
            </Text>
          </Box>
          <Text
            marginLeft="26px"
            mt="8px"
            color="#111"
            fontSize="14px"
            fontWeight="400"
          >
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur.
          </Text>
        </Box>
      </Box>
    </>
  );
}
