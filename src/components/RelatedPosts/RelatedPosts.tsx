import { Box, Tabs, Text, useBreakpointValue } from '@chakra-ui/react';

interface Props {
  tags?: string[];
}

export function RelatedPosts({ tags }: Props) {
  const isDesktop = useBreakpointValue({ base: false, md: true });
  console.log(tags);
  if (!tags) return;
  return (
    <>
      <Tabs
        borderBottom="2px solid #281A45 "
        mt="16px"
        variant="line"
        display="flex"
        width={isDesktop ? '655px' : '100%'}
        height="54px"
        justifyContent="center"
        alignItems="center"
      >
        <Text
          color="#281A45"
          textAlign="center"
          fontSize="18px"
          fontWeight="500"
        >
          Relacionados
        </Text>
      </Tabs>
      <Box></Box>
    </>
  );
}
