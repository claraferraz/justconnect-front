import { Grid, GridItem, Text, useBreakpointValue } from '@chakra-ui/react';

export function InstructionsCard() {
  //const SearchTypes = ['posts', 'comments', 'users', 'tags'];
  const isDesktop = useBreakpointValue({ base: false, md: true });

  return (
    <>
      <Grid
        padding={'10px'}
        gap="10px"
        templateColumns={isDesktop ? '1fr 1fr' : '1fr'}
        background={'#ffffff'}
      >
        <GridItem>
          <Text>
            <Text fontWeight={600}>[tags]</Text>
            pesquise por uma tag
          </Text>
        </GridItem>
        <GridItem>
          <Text>
            <Text fontWeight={600}>@username</Text>
            pesquise por um usuário
          </Text>
        </GridItem>

        <GridItem>
          <Text>
            <Text fontWeight={600}>post: texto</Text>
            pesquise por um post
          </Text>
        </GridItem>
        <GridItem>
          <Text>
            <Text fontWeight={600}>comment: texto</Text>
            pesquise por um comentário
          </Text>
        </GridItem>
        <GridItem>
          <Text>
            <Text fontWeight={600}>texto simples</Text>
            pesquise por posts e comentários
          </Text>
        </GridItem>
      </Grid>
    </>
  );
}
