# Regex events

React + TypeScript + Vite

A website for creating quickly ics.-files. A single line of text (that follows a predetermined syntax) is parsed into a calendar event that includes beginning date and time, end date and time, and location each in their correct places.

Why? I have a bad habit of adding events to my phone calendar just by writing the time and location to the name/summary input. I found it annoying having to click and scroll through the dates and times.

## How to use

> [!NOTE]
> The site is in Finnish and follows the local timezone and Finnish date syntax.

1. Works best and has been tested on iPhone and Safari because the combination handles adding .ics-files to my apple calendar the best. Works somewhat on Chrome and desktop.
2. Go to [ellamac.github.io/regex-events/](https://ellamac.github.io/regex-events/) on **Safari**.
3. Write your event following this syntax:

   - Event name (must have!)
   - start date as DD.MM. (must have!)
   - end date as -DD.MM. (optional)
   - start time as klo hh.mm (optional)
   - end time as -hh.mm (optional)
   - location

   For example

   > Christmas holiday 20.12.-30.12. klo 10.00-22.25 Spain

4. Check the preview and confirm everythings ok
5. Click 'tallenna tapahtuma kalenteriin' to create and save the ics.-file to your device. With the iPhone+Safari combination it takes you straight to the Apple calendar app and you just need to click save there once to add it to your calendar.
