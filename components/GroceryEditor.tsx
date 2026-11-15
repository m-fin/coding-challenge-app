import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

import { SegmentedControl } from '@/components/SegmentedControl';
import { fonts } from '@/constants/fonts';
import {
  displayItems,
  LIST_LABELS,
  listStatus,
  MAX_ITEM_LENGTH,
  type GroceryItem,
  type ListId,
} from '@/lib/groceries';
import { useTheme } from '@/providers/AppState';

const STORES: readonly { value: ListId; label: string }[] = [
  { value: 'grocery', label: LIST_LABELS.grocery },
  { value: 'costco', label: LIST_LABELS.costco },
];

type Props = {
  listId: ListId;
  items: GroceryItem[];
  onListId: (listId: ListId) => void;
  onAdd: (name: string) => void;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
};

export function GroceryEditor({ listId, items, onListId, onAdd, onToggle, onRemove, onClear }: Props) {
  const colors = useTheme();
  const [draft, setDraft] = useState('');
  const [hint, setHint] = useState('');
  const visible = displayItems(items);
  const bought = items.some((item) => item.done);

  function submit() {
    if (!draft.trim()) {
      setHint('Type an item first.');
      return;
    }
    onAdd(draft);
    setDraft('');
    setHint('');
  }

  return (
    <View style={{ gap: 14 }}>
      <SegmentedControl
        label="Store"
        value={listId}
        options={STORES}
        onChange={(next) => {
          onListId(next);
          setHint('');
        }}
      />
      <Text style={{ fontFamily: fonts.body, fontSize: 15, color: colors.muted }}>{listStatus(items)}</Text>
      <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
        <TextInput
          value={draft}
          onChangeText={(text) => {
            setDraft(text);
            if (hint) setHint('');
          }}
          onSubmitEditing={submit}
          placeholder={`Add to ${LIST_LABELS[listId]}`}
          placeholderTextColor={colors.muted}
          maxLength={MAX_ITEM_LENGTH}
          returnKeyType="done"
          accessibilityLabel={`New ${LIST_LABELS[listId]} item`}
          style={{
            flex: 1,
            minHeight: 52,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: colors.line,
            backgroundColor: colors.surface,
            paddingHorizontal: 16,
            fontFamily: fonts.body,
            fontSize: 17,
            color: colors.text,
          }}
        />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Add item to ${LIST_LABELS[listId]}`}
          onPress={submit}
          style={({ pressed }) => [
            {
              width: 52,
              height: 52,
              borderRadius: 16,
              backgroundColor: colors.accent,
              alignItems: 'center',
              justifyContent: 'center',
              opacity: pressed ? 0.8 : 1,
            },
          ]}>
          <Text style={{ color: colors.onAccent, fontSize: 30, lineHeight: 32, fontFamily: fonts.body }}>+</Text>
        </Pressable>
      </View>
      {hint ? (
        <Text style={{ fontFamily: fonts.body, fontSize: 14, color: colors.accent }} accessibilityLiveRegion="polite">
          {hint}
        </Text>
      ) : null}
      {visible.length === 0 ? (
        <View
          style={{
            backgroundColor: colors.surface,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: colors.line,
            padding: 20,
          }}>
          <Text style={{ fontFamily: fonts.displaySoft, fontSize: 22, color: colors.text, marginBottom: 6 }}>
            Nothing on this list
          </Text>
          <Text style={{ fontFamily: fonts.body, fontSize: 16, lineHeight: 22, color: colors.muted }}>
            Add the first thing for {LIST_LABELS[listId]}.
          </Text>
        </View>
      ) : (
        <View
          style={{
            backgroundColor: colors.surface,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: colors.line,
            paddingHorizontal: 14,
          }}>
          {visible.map((item, index) => (
            <View
              key={item.id}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderTopWidth: index === 0 ? 0 : 1,
                borderTopColor: colors.line,
              }}>
              <Pressable
                accessibilityRole="checkbox"
                accessibilityState={{ checked: item.done }}
                accessibilityLabel={`${item.name}, ${item.done ? 'bought' : 'still needed'}`}
                onPress={() => onToggle(item.id)}
                style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 14 }}>
                <View
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: 13,
                    borderWidth: 2,
                    borderColor: item.done ? colors.check : colors.accent,
                    backgroundColor: item.done ? colors.check : 'transparent',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {item.done ? (
                    <Text style={{ color: colors.onCheck, fontSize: 14, fontFamily: fonts.bodyStrong }}>✓</Text>
                  ) : null}
                </View>
                <Text
                  style={{
                    flex: 1,
                    fontFamily: fonts.body,
                    fontSize: 17,
                    lineHeight: 22,
                    color: item.done ? colors.muted : colors.text,
                    textDecorationLine: item.done ? 'line-through' : 'none',
                  }}>
                  {item.name}
                </Text>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`Remove ${item.name}`}
                onPress={() => onRemove(item.id)}
                hitSlop={8}
                style={({ pressed }) => [
                  {
                    width: 44,
                    height: 44,
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: pressed ? 0.6 : 1,
                  },
                ]}>
                <Text style={{ color: colors.muted, fontSize: 22, lineHeight: 24 }}>×</Text>
              </Pressable>
            </View>
          ))}
        </View>
      )}
      {bought ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Clear bought items"
          onPress={onClear}
          style={({ pressed }) => [{ alignSelf: 'flex-start', opacity: pressed ? 0.7 : 1, paddingVertical: 6 }]}>
          <Text style={{ fontFamily: fonts.bodyStrong, fontSize: 15, color: colors.accent }}>Clear bought items</Text>
        </Pressable>
      ) : null}
    </View>
  );
}
