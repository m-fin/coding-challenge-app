import { Fraunces_600SemiBold } from '@expo-google-fonts/fraunces/600SemiBold';
import { Fraunces_700Bold } from '@expo-google-fonts/fraunces/700Bold';
import { Nunito_500Medium } from '@expo-google-fonts/nunito/500Medium';
import { Nunito_600SemiBold } from '@expo-google-fonts/nunito/600SemiBold';
import { Nunito_700Bold } from '@expo-google-fonts/nunito/700Bold';
import { useFonts } from 'expo-font';
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { View } from 'react-native';
import 'react-native-reanimated';

import { fonts } from '@/constants/fonts';
import { palette } from '@/constants/theme';
import { AppStateProvider, useAppState } from '@/providers/AppState';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  anchor: '(tabs)',
};

SplashScreen.preventAutoHideAsync().catch(() => undefined);

const finleyLight = {
  ...DefaultTheme,
  fonts: DefaultTheme.fonts,
  colors: {
    ...DefaultTheme.colors,
    background: palette.light.background,
    card: palette.light.surface,
    text: palette.light.text,
    border: palette.light.line,
    primary: palette.light.accent,
  },
};

const finleyDark = {
  ...DarkTheme,
  fonts: DarkTheme.fonts,
  colors: {
    ...DarkTheme.colors,
    background: palette.dark.background,
    card: palette.dark.surface,
    text: palette.dark.text,
    border: palette.dark.line,
    primary: palette.dark.accent,
  },
};

export default function RootLayout() {
  return (
    <AppStateProvider>
      <RootGate />
    </AppStateProvider>
  );
}

function RootGate() {
  const { hydrated, scheme } = useAppState();
  const [loaded, error] = useFonts({
    [fonts.display]: Fraunces_700Bold,
    [fonts.displaySoft]: Fraunces_600SemiBold,
    [fonts.body]: Nunito_600SemiBold,
    [fonts.bodyStrong]: Nunito_700Bold,
    [fonts.bodyRegular]: Nunito_500Medium,
  });
  const colors = palette[scheme];

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded && hydrated) {
      SplashScreen.hideAsync().catch(() => undefined);
    }
  }, [loaded, hydrated]);

  if (!loaded || !hydrated) {
    return null;
  }

  return (
    <ThemeProvider value={scheme === 'dark' ? finleyDark : finleyLight}>
      <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
      <View style={{ flex: 1, backgroundColor: colors.background, alignItems: 'center' }}>
        <View style={{ flex: 1, width: '100%', maxWidth: 480, backgroundColor: colors.background }}>
          <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }}>
            <Stack.Screen name="(tabs)" />
          </Stack>
        </View>
      </View>
    </ThemeProvider>
  );
}
