## so what sucks?
- maybe too many dom manipulations
- some types in types.ts, others in their own files, not consistent
- file structure: why BRUH/index.ts instead of just BRUH.ts?
- gamegridlayout basically implements virtual dom which should prob just be handled by gamegrid or game. once again no strict boundaries
- some files are bloated (gameGrid)
- gameElements... why one massive obj of elements passed around by all classes? adding elements requires adding it in like 4 diff places
- mix of classes and reducer. why is there even a Game class? it just wrpas the reducer. so why isnt there a reducer for gameGrid?
- css classes arent performant, complicated mix of rules.
- updates only when we attempt to update game state. so if game state is updated somewhere, we need to remember to update game grid / dom.
- almost every util is only used once, why put in its own file?
- hard to unit test anything due to poor structure and organizaztion

this will only make adding features more difficult. for example, history page. need to add styles, update and remove classes in game grid, add history page to game elements. disable if game state has certain status. etc. no.

ideally, i can create a history page class, focus on just ui design, and "register" it as a route or something. and only one route at a time ofc. no need to worry about hiding the rest of the elements or classes. no concern with dom at all, let that happen at the end. 

ugh ok sounds like virtual dom. which sounds like react. but let me try my best to not bias towards what im familiar with and organize this myself.

## ok so what's the ideal?
### component architecture
each component can look something like this
- "Model" - HEADLESS! all stateful logic in here! no DOM interactions of any kind!
- "View" - no stateful logic, just manipulates dom based on model
- "Controller" - communicates w Model and View based on View (user interactions) or Model (state updates)

### example component architecture: Game
model can handle state in any way that is preferable, in this case Reducer pattern makes sense

GameModel
- state:
  - status: GameStatus
  - config: GameConfig
  - grid: GameCell[][]
- dispatch(action: GameAction)

GameView
- model: GameModel
- elements: Record<string, HTMLElement>
- init()
- update()

Game(Component/Controller)
- model: GameModel
- view: GameView
- children: Component[]
- init()
  - add event listeners, call update if considered necessary
- update()
  - update view and trigger update for children compoennts as well

also
- no destroying dom elements (but im assuming this is less performant than just hiding, need to confirm)

### router
config: Record<string, Component>

on window.location update, check against config, if match, then 

uhhh its so late my brain is fried ill come back to this tmr

## update
now i have to deal with destruction of a game to handle a new game on retry

and at this point i am giving up and using react. i would say i have reached a level of complexity that warrants it.
