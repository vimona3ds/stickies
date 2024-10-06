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

### 10/06/24
- [x] clean up reducer unit tests (better organized)

### eventually...
- [ ] refactor
  - [ ] Game to use pure reducer logic + disjoint union type for state
  - [ ] split Game into diff classes or functions and generally simplify. we are passing a lot of shit around that doesnt need to be passed around. Game concerns itself with things that it shouldnt. decide on boundaries and enforce
- [ ] mobile support!!!
- [ ] history feature
  - [ ] integrate localstorage
  - [ ] design history board
  - [ ] implement history board
- [ ] share button
- [ ] improve sounds
- [ ] improve animations
- [ ] improve styles/branding
- [ ] theme system?
- [ ] dev
  - [ ] linter
  - [ ] enable source maps in ts/webpack config
  - [ ] prod vs dev webpack config
- [ ] config
  - [ ] custom layout system!!!!!
  - [ ] use layout field
- [ ] clean up styles -- just put game state as class on body instead of all these one off class names?
- [ ] press esc to unfocus input
- [ ] figure out where to show timer / acc
- [ ] shouldnt be able to type in grid before game starts
- [ ] timer should not suddenly show up
- [ ] figure out better place for timer? or dont show it at all?

### EVENTUALLY...
- [ ] percentiles
- [ ] analytics
- [ ] i18n
- [ ] accessibility
- [ ] perf optimization