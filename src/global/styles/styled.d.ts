/* Arquivo para sobre escrever theme do styled-components por nosso theme*/
import 'styled-components';
import theme from './theme';

declare module 'styled-components' {
  type ThemeType = typeof theme;

  export interface DefaultTheme extends ThemeType { }
}