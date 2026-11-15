import { Pressable, Text, View } from 'react-native';

import { fonts } from '@/constants/fonts';
import { useTheme } from '@/providers/AppState';

type Choice<T extends string> = {
  value: T;
  label: string;
};

type Props<T extends string> = {
  label: string;
  value: T;
  options: readonly Choice<T>[];
  onChange: (value: T) => void;
};

export function SegmentedControl<T extends string>({ label, value, options, onChange }: Props<T>) {
  const colors = useTheme();

  return (
    <View
      accessibilityRole="radiogroup"
      accessibilityLabel={label}
      style={{
        flexDirection: 'row',
        backgroundColor: colors.surfaceMuted,
        borderRadius: 16,
        padding: 4,
        gap: 4,
      }}>
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <Pressable
            key={option.value}
            accessibilityRole="radio"
            accessibilityLabel={option.label}
            accessibilityState={{ checked: selected }}
            onPress={() => onChange(option.value)}
            style={({ pressed }) => [
              {
                flex: 1,
                minHeight: 42,
                borderRadius: 12,
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 8,
                backgroundColor: selected ? colors.accent : 'transparent',
                opacity: pressed ? 0.8 : 1,
              },
            ]}>
            <Text
              style={{
                fontFamily: fonts.bodyStrong,
                fontSize: 15,
                color: selected ? colors.onAccent : colors.text,
              }}>
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
