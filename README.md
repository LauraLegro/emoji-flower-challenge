# The Garden Bed

A tiny emoji garden that fetches live data from [emojihub](https://apis.scrimba.com/emojihub/api/all/category/animals-and-nature) and keeps only bugs and flowers — everything else (mammals, trees, leaves) gets filtered out.

Live: https://emoji-flower-challenge.vercel.app

## How it works

`index.js` fetches the `animals-and-nature` category, then `clearTheGarden` filters the response down to the `animal bug` and `plant flower` groups. Survivors are split into two rows and rendered as garden plant-marker tags, each labeled with its real name and unicode code from the API.

## Run locally

Static site, no build step:

```bash
npx http-server .
```

Then open the printed URL in a browser.
