# Christmas Chase

A side-scrolling browser game built on the HTML5 Canvas API. Run, jump, and dodge snowballs in an infinite winter runner featuring hand-tuned sprite animations and parallax scrolling.

## Project in Action

🎥 Watch the demo video!

https://github.com/user-attachments/assets/b84d83d0-2499-4bf5-96ba-fab5f30fb5cc

## Features

- Sprite-sheet based character animation with multiple states (breathe, walk, run, jump, attack)
- Parallax-scrolling background and foreground for a layered sense of depth
- Procedurally spawned snowball obstacles with randomized speed and height
- Jump physics with gravity and velocity
- Collision detection that ends the run on impact
- Custom start screen with a clickable play button

## Controls

| Key | Action |
|---|---|
| `Arrow Right` | Move right |
| `Arrow Left` | Move left |
| `W` or `Arrow Up` | Jump |
| Mouse Click | Start the game (click the play button on the start screen) |

## Files

| File | Purpose |
|---|---|
| `spriteAnimation.html` | Canvas setup and page structure |
| `spriteAnimation.css` | Styling |
| `spriteAnimation.js` | Game loop, animation states, physics, and collision logic |
| `images/` | Background, foreground, sprite sheet, obstacle, and UI assets |

## Usage

Open `spriteAnimation.html` in any web browser. No build step or server required.

1. Click the play button on the start screen to begin
2. Use the arrow keys to move and **W** or **Arrow Up** to jump
3. Avoid the incoming snowballs
4. On collision, the game automatically resets so you can try again

## License

MIT