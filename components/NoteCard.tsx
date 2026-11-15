import { Text, View } from 'react-native';

import { fonts } from '@/constants/fonts';
import { noteForDate } from '@/lib/notes';
import { useTheme } from '@/providers/AppState';

export function NoteCard({ now }: { now: Date }) {
  const colors = useTheme();
  const note = noteForDate(now);

  return (
    <View
      accessible
      accessibilityLabel={`Today's note. ${note.text} ${note.credit}`}
      style={{
        backgroundColor: colors.surface,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: colors.line,
        borderLeftWidth: 5,
        borderLeftColor: colors.gold,
        paddingHorizontal: 20,
        paddingVertical: 18,
        gap: 10,
      }}>
      <Text
        style={{
          fontFamily: fonts.bodyStrong,
          fontSize: 12,
          letterSpacing: 1.4,
          textTransform: 'uppercase',
          color: colors.gold,
        }}>
        Today's note
      </Text>
      <Text style={{ fontFamily: fonts.displaySoft, fontSize: 22, lineHeight: 30, color: colors.text }}>
        {note.text}
      </Text>
      <Text style={{ fontFamily: fonts.body, fontSize: 14, color: colors.muted }}>{note.credit}</Text>
    </View>
  );
}
