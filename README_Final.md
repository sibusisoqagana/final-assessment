## Question 4: MuniFix SA Defect Repairs


I fixed the following bugs in the starter code:

1. Event Handler: The original code ran the toggle function while the page was loading. I changed it so it only runs when the user actually taps the button.
2. State Mutation: The original code changed the array directly. I changed it to create a new copy of the array so React can see the update.
3. Stable Keys: The list used the item's positiOn (index) as the key. I changed it to use the item's ID.
4. Animation: The animation value was being reset every time the screen updared. I used useRef so it stays stable and only animates once when the card appears.

## Testing Evidence

I tested the app by running it and checking the following:

Test 1 (Normal): I tapped Mark Resolved on an open report. Expected it to turn green and say Resolved. It worked (Pass).
Test 2 (Edge): I tapped the button really fast multiple times. Expected it to toggle safely without the app crashing. It worked (Pass).
Test 3 (State): I resolved a report and then scrolled down and back up. Expected it to stay resolved. It worked (Pass).
Test 4 (Regression): I pressed and held the button. Expected it to only trigger one update. It worked (Pass).

Screenshot of the final working report list and open report counter is included with my submission.

## Expo Build Preparation

In the app.json file, I set the following:
* Name: MuniFix SA
* Slug: munifix-sa
* Version: 1.0.0
* Android Package: com.uj.munifix

These are the commands I would use to create a production Android build:
npm install -g eas-cli
eas login
eas build:configure
eas build --platform android --profile production

## Stakeholder Demo Script (60 seconds)

Our communities usuallu wait weeks for potholes or broken streetlights to be fixed. MuniFix SA is a mobile app that allows the residents quickly log these issues. The app has three main features: you can report an issue by category, you can see real-time status updates, and there is a live dashboard showing how many problems are still open. One known limitation is that users currently have to type the location manually instead of the app finding it automatically. Thank you.

## Peer Review Response

Finding: Users can tap the status action repeatedly and are unsure whether the report was updated.

Improvement: I added immediate visual feedback. When a report changes, the whole card turns green and the button text changes. I also addrd a counter at the top that updates instantly. This way the user knows the action actually happened