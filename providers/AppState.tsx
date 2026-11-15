import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { useColorScheme } from 'react-native';

import { palette, type Palette } from '@/constants/theme';
import { resolveScheme, type Appearance } from '@/lib/appearance';
import {
  addItem,
  clearChecked,
  createId,
  removeItem,
  starterLists,
  toggleItem,
  type GroceryLists,
  type ListId,
} from '@/lib/groceries';
import { loadAppearance, loadLists, saveAppearance, saveLists } from '@/lib/storage';

type AppStateValue = {
  hydrated: boolean;
  lists: GroceryLists;
  appearance: Appearance;
  scheme: keyof typeof palette;
  activeList: ListId;
  setActiveList: (listId: ListId) => void;
  setAppearance: (appearance: Appearance) => void;
  add: (listId: ListId, name: string) => void;
  toggle: (listId: ListId, id: string) => void;
  remove: (listId: ListId, id: string) => void;
  clearChecked: (listId: ListId) => void;
};

const AppStateContext = createContext<AppStateValue | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const systemScheme = useColorScheme();
  const [hydrated, setHydrated] = useState(false);
  const [lists, setLists] = useState(starterLists);
  const [appearance, setAppearanceState] = useState<Appearance>('system');
  const [activeList, setActiveList] = useState<ListId>('grocery');

  useEffect(() => {
    let active = true;
    Promise.all([loadLists(AsyncStorage), loadAppearance(AsyncStorage)])
      .then(([storedLists, storedAppearance]) => {
        if (!active) return;
        setLists(storedLists);
        setAppearanceState(storedAppearance);
        setHydrated(true);
      })
      .catch(() => {
        if (!active) return;
        setLists(starterLists());
        setAppearanceState('system');
        setHydrated(true);
      });
    return () => {
      active = false;
    };
  }, []);

  const setAppearance = useCallback((next: Appearance) => {
    setAppearanceState(next);
    void saveAppearance(AsyncStorage, next).catch(() => undefined);
  }, []);

  const updateLists = useCallback((recipe: (current: GroceryLists) => GroceryLists) => {
    setLists((current) => {
      const next = recipe(current);
      if (next !== current) {
        void saveLists(AsyncStorage, next).catch(() => undefined);
      }
      return next;
    });
  }, []);

  const add = useCallback(
    (listId: ListId, name: string) => {
      updateLists((current) => addItem(current, listId, name, createId()));
    },
    [updateLists],
  );

  const toggle = useCallback(
    (listId: ListId, id: string) => {
      updateLists((current) => toggleItem(current, listId, id));
    },
    [updateLists],
  );

  const remove = useCallback(
    (listId: ListId, id: string) => {
      updateLists((current) => removeItem(current, listId, id));
    },
    [updateLists],
  );

  const clearDone = useCallback(
    (listId: ListId) => {
      updateLists((current) => clearChecked(current, listId));
    },
    [updateLists],
  );

  const scheme = resolveScheme(appearance, systemScheme);

  const value = useMemo<AppStateValue>(
    () => ({
      hydrated,
      lists,
      appearance,
      scheme,
      activeList,
      setActiveList,
      setAppearance,
      add,
      toggle,
      remove,
      clearChecked: clearDone,
    }),
    [hydrated, lists, appearance, scheme, activeList, setAppearance, add, toggle, remove, clearDone],
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState(): AppStateValue {
  const value = useContext(AppStateContext);
  if (!value) {
    throw new Error('useAppState must be used inside AppStateProvider');
  }
  return value;
}

export function useTheme(): Palette {
  return palette[useAppState().scheme];
}
