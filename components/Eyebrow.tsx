import { Text } from 'react-native';

import { fonts } from '@/constants/fonts';
import { useTheme } from '@/providers/AppState';

export function Eyebrow({ children }: { children: string }) {
  const colors = useTheme();

  return (
    <Text
      style={{
        fontFamily: fonts.bodyStrong,
        fontSize: 12,
        letterSpacing: 1.4,
        textTransform: 'uppercase',
        color: colors.muted,
      }}>
      {children}
    </Text>
  );
}
