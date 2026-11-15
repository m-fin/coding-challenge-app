import { Text, View } from 'react-native';

import { Eyebrow } from '@/components/Eyebrow';
import { fonts } from '@/constants/fonts';
import { countdownCopy } from '@/lib/thanksgiving';
import { useTheme } from '@/providers/AppState';

export function CountdownCard({ now }: { now: Date }) {
  const colors = useTheme();
  const copy = countdownCopy(now);
  const label =
    copy.headline === 'Today'
      ? `Thanksgiving is today. ${copy.detail}`
      : `${copy.headline} ${copy.unit} until Thanksgiving. ${copy.detail}`;

  return (
    <View
      accessible
      accessibilityLabel={label}
      style={{
        backgroundColor: colors.accentSoft,
        borderRadius: 24,
        paddingHorizontal: 22,
        paddingTop: 18,
        paddingBottom: 20,
        gap: 4,
      }}>
      <Eyebrow>Thanksgiving</Eyebrow>
      <Text
        style={{
          fontFamily: fonts.display,
          fontSize: copy.headline.length > 3 ? 48 : 72,
          lineHeight: copy.headline.length > 3 ? 54 : 76,
          color: colors.accent,
          marginTop: 4,
        }}
        maxFontSizeMultiplier={1.3}
        adjustsFontSizeToFit
        numberOfLines={1}>
        {copy.headline}
      </Text>
      {copy.unit ? (
        <Text style={{ fontFamily: fonts.bodyStrong, fontSize: 18, color: colors.accent, marginTop: -6 }}>
          {copy.unit}
        </Text>
      ) : null}
      <Text style={{ fontFamily: fonts.body, fontSize: 16, lineHeight: 22, color: colors.text, marginTop: 8 }}>
        {copy.detail}
      </Text>
    </View>
  );
}
