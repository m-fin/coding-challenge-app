import { Link, Stack } from 'expo-router';
import { Text, View } from 'react-native';

import { fonts } from '@/constants/fonts';
import { useTheme } from '@/providers/AppState';

export default function NotFoundScreen() {
  const colors = useTheme();

  return (
    <>
      <Stack.Screen options={{ title: 'Finley', headerShown: false }} />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, backgroundColor: colors.background, gap: 12 }}>
        <Text style={{ fontFamily: fonts.display, fontSize: 32, color: colors.text }}>That page is not in Finley.</Text>
        <Link href="/" style={{ paddingVertical: 12 }}>
          <Text style={{ fontFamily: fonts.bodyStrong, fontSize: 16, color: colors.accent }}>Back to the family hub</Text>
        </Link>
      </View>
    </>
  );
}
