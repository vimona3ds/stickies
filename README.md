## uhhh

you'll see lol

## changelog/todo

### 9/22/24

- [x] boilerplate

### 9/23/24

- [ ] ~~refactor typing logic so that cursor can move across space between words (detect when starting new word)~~ nevermind fuck it start planning letter-based typing system, we can deal with word-based later
- [x] also fuck js i need types. move to typescript
- [x] rebrand to stickies!!!!!!!!
- [x] package management!!!!!!!!!!!!

### 9/24/24

- [x] system design (too busy to code lol)

### 9/25/24

- [x] webpack + typescript

### 9/26/24

- [x] wrist pain from typing all day so i am not doing shit today goodnight

### 9/27/24

- [x] local dev server (with hot reloading??)
- [x] ts boilerplate
- [x] realize i barely did any system design and i have no idea where to start

### 9/28/24

- [x] Grid class with placeholder input
- [x] fix module imports
- [x] fix bug where cell incorrect class overrides correct class (use enum in declaration file, clear classes, change setCellClassNameByIndex to use the enum)
- [ ] ~~Input class?~~
- [x] make the game actually work
- [x] intro card
- [x] results card
- [x] cursor
- [x] configuration system!

### 9/29/24

- [x] simplify Game types (non optional), remove getter functions

### 9/30/24

~~ok fuck this. can i get this ready to upload TODAY?~~
ok i can get close. but i want to submit it when it's actually fun. and it isn't rn.
so i'm gonna wait. but im gonna stop working on principles, get something going
then clean up later. i may regret it but fuck i just want this done.

- [x] mobile support almost
- [x] style cleanup
- [x] broken timer thing

### 10/01/24

happy october!!!!

- [x] minor style updates (header, keyboard open)
- [x] fix choppy animations
- [x] fix mobile compatibility!!! including reducing grid size

### 10/02/24

- [x] fix timer and its styles
- [x] fix bug where timer would reset after game end
- [x] cleaner animations

### 10/03/24

- [x] fix cursor not updating position when game container moves and game starts

### 10/04/24

- [x] clean up animation/styles for game results (blur while playing, unblur at end, transition from hidden to not hidden)
- [x] fix keyboard remaining open on mobile after game complete

### 10/05/24

- [x] clean up types
- [x] begin game reducer (boilerplate)
- [x] jest setup!!!
- [x] clean up reducer unit tests (better organized)

### 10/06/24

so much stuff that im jt gonna stop updating this lol

### eventually...

- [x] refactor
  - [x] Game to use pure reducer logic + disjoint union type for state
  - [x] split Game into diff classes or functions and generally simplify. we are passing a lot of shit around that doesnt need to be passed around. Game concerns itself with things that it shouldnt. decide on boundaries and enforce
- [x] mobile support!!!
- [ ] history feature
  - [ ] integrate localstorage
  - [ ] design history board
  - [ ] implement history board
- [x] share button
- [x] improve sounds
- [x] improve animations
- [ ] improve styles/branding
- [ ] dev
  - [ ] linter
  - [ ] enable source maps in ts/webpack config
  - [ ] prod vs dev webpack config
- [x] config
  - [x] custom layout system!!!!!
  - [x] use layout field
  - [x] add other bidirectional layout types
- [x] clean up styles -- just put game state as class on body instead of all these one off class names?
- [ ] press esc to unfocus input
- [x] figure out where to show timer / acc
- [x] shouldnt be able to type in grid before game starts
- [x] timer should not suddenly show up
- [ ] settings
  - [ ] difficulty
  - [ ] clear progress
  - [ ] hide background timer
  - [ ] reduce motion
  - [ ] theme
    - [ ] boilerplate
    - [ ] normal
    - [ ] high contrast
- [ ] difficulty setting
- [ ] dom read/write optimization
- [ ] fix last letter error still showing after results screen
- [ ] fix cursor not updating when resize / transition of screen
- [ ] fix spiral outward and counter/clockwise direction
- [ ] get initial position from next fill?
- [ ] convert all of game layout funcinto generators? maybe?
- [ ] fix moving cursor around input and typing
- [ ] clean up files / folder structure (more complicated than necessary)
- [ ] pass list of layout types in token in order of preference...
- [ ] overlapping letters
- [x] animate countdown in increasing font size?
- [x] why winning sound effect sounds weird
- [ ] refactor 2...
- [ ] analytics
- [x] fix apostrophe unicode not matching as apostrophe on ios
- [ ] better game generator
- [ ] retry button
- [ ] fix complete sound playing when unfocus keyboard
- [ ] fix keyboard not auto unfocusing after complete game
- [ ] padding is a bit weird on larger grid sizes on ios
- [ ] overscroll on ios due to animated utility bar not actually hiding
- [ ] timer isnt updating in 0.05 increments anymore?

### EVENTUALLY...

- [ ] percentiles
- [ ] analytics
- [ ] i18n
- [ ] accessibility
- [ ] perf optimization
- [ ] embed game preview when sharing?
