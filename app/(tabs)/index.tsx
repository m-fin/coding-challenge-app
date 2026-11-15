import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { CountdownCard } from '@/components/CountdownCard';
import { Eyebrow } from '@/components/Eyebrow';
import { NoteCard } from '@/components/NoteCard';
import { Screen } from '@/components/Screen';
import { SegmentedControl } from '@/components/SegmentedControl';
import { FAMILY } from '@/constants/family';
import { fonts } from '@/constants/fonts';
import { familyTints } from '@/constants/theme';
import { greetingForHour } from '@/lib/greeting';
import { LIST_LABELS, listStatus, type ListId } from '@/lib/groceries';
import { useAppState, useTheme } from '@/providers/AppState';

const APPEARANCES = [
  { value: 'system', label: 'Auto' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
] as const;

const LISTS: ListId[] = ['grocery', 'costco'];

export default function HomeScreen() {
  const colors = useTheme();
  const { lists, appearance, setAppearance, scheme, setActiveList } = useAppState();
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Screen>
      <View style={{ gap: 6 }}>
        <Eyebrow>Family hub</Eyebrow>
        <Text
          accessibilityRole="header"
          style={{ fontFamily: fonts.display, fontSize: 48, lineHeight: 52, color: colors.text }}>
          Finley
        </Text>
        <Text style={{ fontFamily: fonts.body, fontSize: 16, color: colors.muted }}>Frog, Rick, and Kathy</Text>
      </View>

      <View style={{ gap: 4 }}>
        <Text style={{ fontFamily: fonts.displaySoft, fontSize: 26, lineHeight: 32, color: colors.text }}>
          {greetingForHour(now.getHours())}
        </Text>
        <Text style={{ fontFamily: fonts.body, fontSize: 16, lineHeight: 22, color: colors.muted }}>
          The lists, the countdown, and today's note.
        </Text>
      </View>

      <View style={{ flexDirection: 'row', gap: 10 }}>
        {FAMILY.map((person) => {
          const tint = familyTints[scheme][person.tint];
          return (
            <View
              key={person.name}
              accessible
              accessibilityLabel={person.name}
              style={{
                flex: 1,
                backgroundColor: tint.background,
                borderRadius: 18,
                paddingVertical: 12,
                alignItems: 'center',
                gap: 6,
              }}>
              <View
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 21,
                  backgroundColor: colors.surface,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{ fontFamily: fonts.display, fontSize: 20, color: tint.text }}>{person.initial}</Text>
              </View>
              <Text style={{ fontFamily: fonts.bodyStrong, fontSize: 15, color: tint.text }}>{person.name}</Text>
            </View>
          );
        })}
      </View>

      <CountdownCard now={now} />
      <NoteCard now={now} />

      <View style={{ gap: 10 }}>
        <Eyebrow>On the lists</Eyebrow>
        {LISTS.map((id) => (
          <Pressable
            key={id}
            accessibilityRole="button"
            accessibilityLabel={`${LIST_LABELS[id]}, ${listStatus(lists[id])}`}
            onPress={() => {
              setActiveList(id);
              router.push({ pathname: '/groceries', params: { list: id } });
            }}
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.75 : 1,
                backgroundColor: colors.surface,
                borderRadius: 18,
                borderWidth: 1,
                borderColor: colors.line,
                paddingHorizontal: 16,
                paddingVertical: 14,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 12,
              },
            ]}>
            <Text style={{ fontFamily: fonts.bodyStrong, fontSize: 17, color: colors.text }}>{LIST_LABELS[id]}</Text>
            <Text style={{ fontFamily: fonts.bodyStrong, fontSize: 15, color: colors.accent }}>
              {listStatus(lists[id])}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={{ gap: 8, marginTop: 4 }}>
        <Eyebrow>Appearance</Eyebrow>
        <SegmentedControl label="Appearance" value={appearance} options={APPEARANCES} onChange={setAppearance} />
        <Text style={{ fontFamily: fonts.body, fontSize: 14, color: colors.muted }}>
          Auto follows the phone. Light and Dark stay until you change them.
        </Text>
      </View>
    </Screen>
  );
}
