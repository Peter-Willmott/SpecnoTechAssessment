# Specno Tech Assessment
## Junior - Front-end / Full stack Developer

Thank you for taking the time to look at my assessment, I really appreciate this opportunity.

## Objective 

Memory (also known as Concentration) is a card game played with one or more players. Using a standard card deck (including both jokers) the players shuffle the deck and lay all of the cards face down on a surface and two cards are flipped face up over each turn. The objective of the game is to turn over pairs of matching cards. 


Concentration can be played with any number of players or as solitaire.


Your challenge is to build Memory adhering to the rules of the game listed below.

- The game should consist of 2 players
- Only 1 player can play at a time.
- Shuffle the deck of cards
- Display all 54 cards (jokers included) face down
- Clicking the back of a card should turn a card over
- Player can turn over 2 cards at a time
- When two cards are turned over:
  * If the number and color of the cards match, the player collects the pair and the cards are removed from the board
  * If the cards do not match, they are turned back over and remain in position
- The players with the most cards wins

## Running the Application
To run the application locally

- Download/clone production branch
- Run `npm install` while in the /memory-tech-assessment folder
- To start the application run `npm start`
- The application will open in a new tab of your browser

To view the application on Github Pages

- go to https://peter-willmott.github.io/SpecnoTechAssessment/

## Design Flow
The simple app follows the suggested layout of the Figma document, with 3 main screens.
1. A landing page - Where character names are set.
2. The playing board - Where the actual game is played.
3. Score Board - Where the players scores are shown at the end of the game


### Landing Page
On this page the players can set names for their character, this is done through a modal that is activated when clicking *Name Your Champion*.
If no names are set the default 'Player 1' and 'Player 2' will be used.

Players begin the game by clicking *LET'S PLAY*

#### Available actions
Action | Comment
------------ | -------------
Exit game | Button in the top right corner. Closes the tab (further on this in issues section)
Set Names | Set player names with a form field within a modal
Start Game | Send the player's names through to the board page


### Board Page
The game is played on this page. It shows the 54 cards layed out in a 9 by 6 grid. Player 1 is defaulted to start, indicated by the purple *It's Your Turn* box. The player selects a card which is flipped, showing the card face value. Another card is flipped and the two cards are compared. If the cards do not match they remain visible for 0.8s then flip back over. If the cards are a match a gif of a rocket is displayed for 1.6s that says *It's A Match*. If the player gets a match they get another turn, indicated again by the purple box. If there was no match the purple box appears on the other players side and the cycle continues.

The game is finished either when all the cards are found which takes the players automatically to the scoring page, or if the players press the *End Game* button at the bottom of the board. This will take them to the scoring page with their current score.

The players have the option it restart the game at anytime which will reset scores, the timer and any matched cards, it will also shuffle the deck. This is achieved with the *Play Again* button.

The players score, name and avatar are shown on either side of the board.There is also a timer at the bottom between the end game and play again buttons.

#### Available actions
Action | Comment
------------ | -------------
Exit game | Button in the top right corner. Closes the tab
Back to Landing Page | An arrow in the top left corner take user back to the landing page
Play Game | Select 2 cards. Struggle. Repeat
End Game | Take current scores and go to scoring page.
Play Again | Reshuffle cards, reset time, score and matched cards.

#### Shuffling Logic
To shuffle the cards a very simple random sort is applied.

```
const shuffled = [...cards]
      .sort(() => Math.random() - 0.5)
      .map((cards) => ({ ...cards, id: Math.random(), matched: false }));
```
This is a very common way to randomise an array. Random number between 0 and 1, minus 0.5 and if the result is positive A => B, if negative B => A, if it is 0 they stay in position. Other options were considered like the array-shuffle package but simplicity won out in the end. With more time I would have like to implement a better solution here. Although the current method does work there are times when the array is not very well shuffled and makes for a very easy game.

A very cool visual of sorting [Fisher-Yates Shuffle](https://bost.ocks.org/mike/shuffle/)

#### Matching Logic
To match the cards I used the cards source path (e.g. "/SpecnoTechAssessment/static/media/2_of_diamonds.a51b192d.png"). I split the string on '_' and used the first and last values from the array. Matching value is simple, a direct comparrison. For the suit I checked if the string included the substring "clubs" or "spades" and if true set the suit to "black". 

If there was a match the value of the "matched" key was set to "true". The matched column was is created during the shuffle, along with a random id. The id was used to avoid unique prop errors. 

#### Flipping Logic
A Card component was created to separate out the repetative logic. It takes in the id, the card, a state function getting the value of the selected card, a 'flipped' boolean and the matched value. 
If the card has been matched already it is hidden (rotated 90 degrees). If the card is on the the two selected cards it is flipped to show the value. The first card will show until a second card is selected. If it is a card that was not selected to remains face down as is. The cards are never set to hidden they are just rotated 90 degress in 3D space and so are not visible. 

#### Issues
I feel I was too trigger happy with the useEffects and useState hooks. I enjoy the control they provide but there was potential to make use of other hooks, like potentially incorporating a useMemo into the card matching. 
The code is functional but not efficient and optimised. There is repetitive code that could be moved out into functions and like mentioned above a heavy reliance on useEffect. I would have liked to take more time and focus on coming up with an elegant solution, however my plan was to get working then optimise. Not always the best approach but often safer. I am okay with the logic but there are parts like the the card array that are not scalable. 
There are no loaders implemented which was a poor foresight. The application ran quickly with no thought of loaders locally however when hosted, waiting for the pictures to load would have been an obvious case for a loading spinner. I unfortunately ran out of time and wanted to ficus attention elsewhere.

### Score Page
The final page of the game. A banner saying "Well Done!" and then the name of the winning player is shown. If it is a draw the name reads "It's a Draw! ". At the bottom of the page are the players score. The winning player with be on top along with a winner, winner, chicken dinner medal in their block. If it is a draw then both players get a chicken dinner. 

#### Available actions
Action | Comment
------------ | -------------
Exit game | Button in the top right corner. Closes the tab
Back to Landing Page | An arrow in the top left corner take user back to the landing page
Play Again | Takes the players (preserves names) to the playing board. Shuffles deck and resets scores


### Outcomes
- [x] 2 Players
- [x] Only 1 player can play at a time
- [x] shuffle deck of cards
- [x] Display all 54 cards (jokers included) face down
- [x] Clicking the back of a card should turn a card over
- [x] Player can turn over 2 cards at a time
- [x] Cards can match and the disapear
- [x] Cards remain if not matched
- [x] Player with the most cards wins
- [x] Collect the players’ names with a modal popup
- [x] Frontend Javascript Framework when Developing the solution
- [ ] Clear commit messages and version control standards (Not a 100% productive usage)
- [x] README.md
- [x] Collect the players’ names with a modal popup
- [x] Follow the designs as closely as possible 
- [ ] Scalable UI 
- [x] Animations for card flips 
- [x] Deployed on some hosting platform (Github Pages)
- [x] Reset Button that starts a  game over from the beginning
- [ ] Track the score with a state management system  

I found I was in a bad habit of commiting multiple changes under a single commit. I found it different to go from working on more focused ticket to an end to end project. It was something that could have been improved.
The UI is not entirely scalable with certain elements overflowing their divs and little action into making it viable for other devices.
The score was tracked using useState hooks. A redux approach should have been used to show understanding. 

### General Tidbits
The "Exit Game" button is functional but a bit hacky, it creates a window (copy) and then closes it as the script doesn't have permission to close tabs it didn't create.

## Closing Words
Thank you for taking the time to read through this. I had a really good time making this game and I learnt a lot through it.
THANK YOU!





