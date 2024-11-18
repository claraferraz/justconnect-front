import { Grid, GridItem, Text, useBreakpointValue } from '@chakra-ui/react';

export function InstructionsBox() {
  const isDesktop = useBreakpointValue({ base: false, md: true });

  return (
    <>
      <Grid
        padding={'10px'}
        gap="10px"
        templateColumns={isDesktop ? '1fr 1fr' : '1fr'}
        fontSize={'sm'}
      >
        <GridItem>
          <Text as="span" fontWeight={600}>
            [tags]{' '}
          </Text>
          <Text as="span" color="gray.500">
            pesquise por uma tag
          </Text>
        </GridItem>
        <GridItem>
          <Text as="span" fontWeight={600}>
            @username{' '}
          </Text>
          <Text as="span" color="gray.500">
            pesquise por um usuário
          </Text>
        </GridItem>

        <GridItem>
          <Text as="span" fontWeight={600}>
            post: texto{' '}
          </Text>
          <Text as="span" color="gray.500">
            pesquise por um post
          </Text>
        </GridItem>
        <GridItem>
          <Text as="span" fontWeight={600}>
            comment: texto{' '}
          </Text>
          <Text as="span" color="gray.500">
            pesquise por um comentário
          </Text>
        </GridItem>
        <GridItem>
          <Text as="span" fontWeight={600}>
            texto simples{' '}
          </Text>
          <Text as="span" color="gray.500">
            pesquise por posts e comentários
          </Text>
        </GridItem>
      </Grid>
    </>
  );
}
