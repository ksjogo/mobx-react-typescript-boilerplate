# Royal Cops'n'Robbers

## Inspiration

Games are always more interesting than boring visualizations. A weird
controller is more fun than standard key based movement. We combined
both.

## What it does

Visualize criminal statistics. 2 player game: One cop and one thief
The thief has to collect the spawned points before the police catches
him

## How we built it

Node.js Server with React Frontend. Players get a screen and one
arduino, the arduino pipes input to a local python client. That client
forwards game actions to the Node gameserver, which in turn will
updates the screens and trigger responses on the controller. The data
was processed in Python, with heatmap visualizations in javascript.

## Challenges we ran into

Never used Arduinos before so that was something to overcome.

## Accomplishments that we're proud of

It works and it's fun. And looks quite slick. And players have fun.

## What we learned

A lot.

## What's next for royal cops'n'robbers

More players and player elimination.
