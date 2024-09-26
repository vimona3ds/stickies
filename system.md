### high level goals
- there is a "Sticky" configuration for each day
  - randomly defined
  - support for manually overriding a day's Sticky configuration
  - day changes at midnight PST for everyone
- system reads configuration and automatically produces same visual
  - cross platform support
- visual sticky is 9x9 grid of monospace characters

### Sticky
helper functions to parse
- id: number
- layout: leftToRight
  - eventually - rightToLeft, spiralIn, spiralOut, upsideDown, custom
- delimeter: string,
- content: Token[]

### Token
- content: string
eventually
- revealedAsTyped: boolean
- highlightAsTyped: boolean
- errorsHighlighted: boolean
eventually (custom direction, fully manual)
- directionX: number?
- directionY: number?

### examples
```
{
  id: 0,
  layout: leftToRight,
  delimeter: " ",
  tokens: [
    { content: "hello" },
    { content: "world" }
  ]
}
```
user would see:
- `hello world` on screen
user types "helloasdfsdf"
- hello highlighted, asdfsdf marked error
user presses space a bunch
- we move onto next token "world", move cursor to beginning of "world", extra spaces removed from input

```
{
  id: 0,
  layout: leftToRight,
  delimeter: "",
  content: [
    { content: "hello world" },
  ]
}
```
user sees
- `hello world` on screen
user types "helloasdfsdfsd"
- hello highlighted, asdfsdf marked error
user presses space a bunch
- the spaces marked as errors too

### (eventually) examples
```
{
  id: 0,
  layout: leftToRight,
  delimeter: "",
  content: [
    { content: "2 + 2 = " },
    { content: "4", revealedAsTyped: true},
  ]
}
```
user sees
- "2 + 2 = " on screen
user types "2 + 2 = 3"
- they see 2 + 2 = in highlighted text, then 3 in error text since it's wrong
user types "2 + 2 = 4"
- 4 is correct so its not shown as an error

alright continuing later

## ok but local storage?
uh pretty simple. `localStorage.get/setItem`. thats simple right idk

## grid system
ugh for another day

### how decide config for the day?
subtract current date from starting date and floor to get config id
- i dont like this, prob an edge case idk about, maybe see what wordle does