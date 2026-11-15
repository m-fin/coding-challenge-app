# Finley

Finley is a small iPhone app for the Finley family: Frog, Rick, and Kathy.

It is a family hub you can pass around the kitchen. It keeps a grocery list for the grocery store and another for Costco, counts the days until Thanksgiving, and shows one short note that stays the same all day. Everything lives on the phone. There is no account and no server, so you can open it in the free Expo Go app without an Apple Developer account.

## What you will see

- **Home.** The Finley name, Frog, Rick, and Kathy, a greeting, the Thanksgiving countdown, today's note, and how many items are left on each list.
- **Groceries.** Two tabs: Grocery Store and Costco. Type an item, add it, check it off, remove it, or clear the ones you already bought.
- **Light and dark.** Auto follows the phone. Light and Dark stay put until someone changes them, which makes it easy to show both looks.

The first time you open Finley, each list already has a few starter items (cranberries, butter, paper towels, and so on) so the screen is not blank. The moment you add, check, or remove something, Finley saves your version and brings that back next time. A list you clear stays empty.

## How to run it in Expo Go

1. On the iPhone, install **Expo Go** from the App Store. It is free.
2. On a computer, open this folder and install dependencies:

   ```bash
   npm install
   ```

3. Start the app:

   ```bash
   npx expo start
   ```

4. Put the phone and the computer on the same Wi-Fi network.
5. Open the iPhone camera, scan the QR code in the terminal, and tap **Open in Expo Go**.

If the phone cannot see the computer, stop the server and run:

```bash
npx expo start --tunnel
```

Scan the new QR code. The first tunnel start may install a small helper.

To check the project on a computer:

```bash
npm run typecheck
npm test
npx expo export
```

`npm test` checks the countdown, the daily note, and the grocery lists. `npx expo export` bundles the app to make sure it builds.

## How it's built

Finley is an [Expo](https://expo.dev) app on SDK 58, written in TypeScript. Screens are files in the `app` folder. [Expo Router](https://docs.expo.dev/router/introduction/) turns `app/(tabs)/index.tsx` and `app/(tabs)/groceries.tsx` into the Home and Groceries tabs. React Native draws those screens, which is why the same project runs inside Expo Go.

The words use two free Google fonts: Fraunces for the big titles, and Nunito for everything else. Colors switch between a warm paper light theme and a walnut dark theme.

## Components

A component is one named piece of the screen. It is a function that returns what to draw.

- `app/(tabs)/index.tsx` is the home screen. It puts the family heading, the countdown, the note, and the two list summaries together.
- `app/(tabs)/groceries.tsx` is the lists screen. It chooses Grocery Store or Costco and edits that list.
- `components/CountdownCard.tsx` draws the Thanksgiving countdown.
- `components/NoteCard.tsx` draws today's note.
- `components/GroceryEditor.tsx` draws the store switch, the add box, and the rows.
- `components/SegmentedControl.tsx` is the pill switch used for the stores and for Auto, Light, and Dark.
- `app/_layout.tsx` wraps every screen, loads the fonts, and waits until the saved lists have been read.

The rules live apart from the drawing, in plain TypeScript files under `lib/`. The screens call those functions. That is why the countdown and the lists can be tested without opening the phone.

## State and storage

State is the data on the screen right now: which items are checked, which store is open, and whether the theme is light or dark. Tap a checkbox and React updates that state, then redraws the row.

Storage is what is still there after the app closes. `lib/storage.ts` reads and writes two keys on the phone:

- `finley.lists.v1` holds both grocery lists.
- `finley.appearance.v1` holds Auto, Light, or Dark.

`providers/AppState.tsx` loads those keys when Finley opens, keeps them in state, and writes them back when you change something. The phone shelf it uses is called AsyncStorage. It is just a small file on the device.

The daily note and the Thanksgiving date are not stored. They are calculated from today's date, so the note changes by itself tomorrow and the countdown does not go stale. If the saved lists are missing or unreadable, Finley shows the starter lists instead of a broken screen.

## Tests

The files in `lib` that end in `.test.ts` check the behavior you can explain out loud:

- Thanksgiving is the fourth Thursday in November. The countdown knows about today, tomorrow, and the day after.
- Today's note stays the same until tomorrow.
- Adding, checking, removing, and clearing items never mix up the grocery store and Costco.
- A blank item is ignored. A saved empty list stays empty instead of turning back into the starter list.

Run them with `npm test`.
