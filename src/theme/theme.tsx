import { extendTheme, HTMLChakraProps, ThemingProps } from '@chakra-ui/react';
import { globalStyles } from './styles';
import { inputStyles } from './input';
import { badgeStyles } from './badge';
import { buttonStyles } from './button';
import { linkStyles } from './link';
import { progressStyles } from './progress';
import { sliderStyles } from './slider';
import { textareaStyles } from './textarea';
import { switchStyles } from './switch';

// eslint-disable-next-line react-refresh/only-export-components
export default extendTheme(
	globalStyles,
	badgeStyles, // badge styles
	buttonStyles, // button styles
	linkStyles, // link styles
	progressStyles, // progress styles
	sliderStyles, // slider styles
	inputStyles, // input styles
	textareaStyles, // textarea styles
	switchStyles, // switch styles
);

export interface CustomCardProps extends HTMLChakraProps<'div'>, ThemingProps {}
