import { useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { Text, View } from 'react-native';

import { Eyebrow } from '@/components/Eyebrow';
import { GroceryEditor } from '@/components/GroceryEditor';
import { Screen } from '@/components/Screen';
import { fonts } from '@/constants/fonts';
import { useAppState, useTheme } from '@/providers/AppState';

function firstParam(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default function GroceriesScreen() {
  const colors = useTheme();
  const params = useLocalSearchParams<{ list?: string | string[] }>();
  const requested = firstParam(params.list);
  const { lists, activeList, setActiveList, add, toggle, remove, clearChecked } = useAppState();

  useEffect(() => {
    if (requested === 'grocery' || requested === 'costco') {
      setActiveList(requested);
    }
  }, [requested, setActiveList]);

  return (
    <Screen>
      <View style={{ gap: 6 }}>
        <Eyebrow>Finley</Eyebrow>
        <Text accessibilityRole="header" style={{ fontFamily: fonts.display, fontSize: 40, lineHeight: 44, color: colors.text }}>
          Lists
        </Text>
        <Text style={{ fontFamily: fonts.body, fontSize: 16, lineHeight: 22, color: colors.muted }}>
          Grocery Store and Costco, shared on this phone. Check items off as you shop.
        </Text>
      </View>
      <GroceryEditor
        listId={activeList}
        items={lists[activeList]}
        onListId={setActiveList}
        onAdd={(name) => add(activeList, name)}
        onToggle={(id) => toggle(activeList, id)}
        onRemove={(id) => remove(activeList, id)}
        onClear={() => clearChecked(activeList)}
      />
    </Screen>
  );
}
