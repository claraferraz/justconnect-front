import { Box, useBreakpointValue } from '@chakra-ui/react';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};
// talvez criar um section proprio pro auth seja melhor
export function SectionAuth({ children }: Props) {
  const isDesktop = useBreakpointValue({ base: false, md: true });
  return (
    <>
      <Box margin={isDesktop ? '0px 0px 0px ' : '65px auto 0px'}>{children}</Box>
    </>
  );
}
