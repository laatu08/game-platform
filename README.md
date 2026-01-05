# Playground - Mini Games Hub

A modern web-based gaming platform featuring a collection of 8 interactive mini-games built with React and Tailwind CSS. Test your reflexes, memory, typing skills, and more in this sleek, dark-themed gaming experience.

## Features

### Core Features

- **Modern UI/UX**: Dark theme interface with smooth animations and transitions
- **Responsive Design**: Optimized for desktop and mobile devices
- **Local High Scores**: Persistent score tracking using localStorage
- **Sound Effects**: Immersive audio feedback for game actions
- **Multiple Difficulty Modes**: Several games offer adjustable difficulty levels
- **Real-time Stats**: Live tracking of scores, time, and performance metrics
- **Clean Navigation**: Intuitive routing with React Router

### Technical Highlights

- Built with React 19 and Vite for fast development and optimal performance
- Styled with Tailwind CSS 4 for modern, utility-first styling
- Custom sound hook for seamless audio integration
- Modular component architecture
- Keyboard and mouse input support
- Local storage integration for score persistence

## Games Library

### 1. Click Speed Test ⚡
**Difficulty**: Easy

Test how fast you can click in 10 seconds. A simple yet addictive reflex game.

**Features**:
- 10-second timed challenge
- Real-time click counter
- CPS (Clicks Per Second) calculation
- Personal best tracking
- Visual feedback on each click
- Countdown timer with danger state (last 3 seconds)
- Sound effects for clicks and achievements

**How to Play**:
1. Click "Start Game"
2. Click the button as fast as possible for 10 seconds
3. View your CPS score and try to beat your best

---

### 2. Reaction Time ⏱️
**Difficulty**: Easy

Measure your visual reaction speed. Click as soon as the screen turns green.

**Features**:
- Random wait time (2-5 seconds)
- Millisecond precision timing
- Best time tracking
- Early click penalty
- Visual state transitions
- Pulse and shake animations

**How to Play**:
1. Click "Start Game"
2. Wait for the yellow "WAIT..." indicator
3. Click immediately when the screen turns green
4. See your reaction time in milliseconds

**States**:
- **Idle**: Ready to start
- **Waiting**: Yellow pulsing screen (don't click!)
- **Ready**: Green screen with shake effect (click now!)
- **Result**: Your reaction time displayed

---

### 3. Snake 🐍
**Difficulty**: Medium

Classic snake game with two play modes. Eat food, grow longer, and avoid collisions.

**Features**:
- Two game modes: Classic and Wrap
- Keyboard controls (arrow keys)
- Dynamic food spawning
- Collision detection (walls and self)
- Score tracking based on food eaten
- Speed remains constant for fair gameplay
- Visual food pulse effect
- Separate high scores per mode

**Game Modes**:
- **Classic**: Hit the wall and you lose
- **Wrap**: Pass through walls to appear on the opposite side

**How to Play**:
1. Select game mode (Classic or Wrap)
2. Click "Start Game"
3. Use arrow keys to control the snake
4. Eat red food to grow and score points
5. Avoid hitting yourself (both modes) or walls (Classic mode)

**Controls**:
- **Arrow Up**: Move up
- **Arrow Down**: Move down
- **Arrow Left**: Move left
- **Arrow Right**: Move right

---

### 4. Whack-a-Mole 🔨
**Difficulty**: Medium

Click the mole as fast as you can before it hides. Speed increases as you score more.

**Features**:
- 9-hole game board
- 30-second gameplay
- Progressive difficulty (moles appear faster as you score)
- Miss penalty with sound feedback
- Mole animations with bounce effect
- Glowing active target indicators
- Time pressure with countdown alert

**How to Play**:
1. Click "Start Game"
2. Click the mole (hamster emoji) when it appears
3. Avoid clicking empty holes (penalty sound)
4. Score as many hits as possible in 30 seconds

**Mechanics**:
- Initial mole speed: 900ms
- Speed decreases by 30ms per successful hit
- Minimum speed: 400ms
- Wrong hole clicks play fail sound

---

### 5. Aim Trainer 🎯
**Difficulty**: Medium

Test your precision and mouse accuracy. Click moving targets before they disappear.

**Features**:
- 30-second timed challenge
- Dynamic target sizing (smaller as you score more)
- Auto-timeout targets
- Miss feedback system
- Score and best score tracking
- Glowing target effects
- Progressive difficulty

**How to Play**:
1. Click "Start Game"
2. Click red circular targets as they appear
3. Targets disappear after a short time
4. Each successful hit makes the next target smaller and faster
5. Maximize your score in 30 seconds

**Target Mechanics**:
- Initial size: 60px
- Size decreases by 2px per hit
- Minimum size: 24px
- Initial timeout: 1200ms
- Timeout decreases by 30ms per hit
- Minimum timeout: 500ms

---

### 6. Memory Match 🧠
**Difficulty**: Easy

Classic memory card game. Match all pairs with the fewest moves possible.

**Features**:
- Three difficulty levels (Easy, Medium, Hard)
- Timer tracking
- Move counter
- Best time tracking per difficulty
- Smooth flip animations
- Auto-matching detection
- Victory celebration

**Difficulty Levels**:
- **Easy**: 12 cards (6 pairs) - 4x3 grid
- **Medium**: 20 cards (10 pairs) - 5x4 grid
- **Hard**: 24 cards (12 pairs) - 6x4 grid

**How to Play**:
1. Select difficulty level
2. Click "Start Game"
3. Click cards to flip them
4. Match identical emoji pairs
5. Complete all pairs to win
6. Try to minimize moves and time

**Scoring**:
- Timer starts when game begins
- Moves counted on each second card flip
- Best time saved per difficulty level

---

### 7. Simon Says 🟦
**Difficulty**: Medium

Remember and repeat increasingly complex color patterns.

**Features**:
- Two difficulty modes (Normal: 4 colors, Hard: 6 colors)
- Progressive pattern length
- Visual and audio feedback
- Pattern playback with timing
- Best level tracking per mode
- Locked input during pattern display

**Game Modes**:
- **Normal**: 4 colors (Red, Green, Blue, Yellow)
- **Hard**: 6 colors (adds Purple and Pink)

**How to Play**:
1. Select difficulty (Normal or Hard)
2. Click "Start Game"
3. Watch the color sequence carefully
4. Repeat the pattern by clicking colors in order
5. Each round adds one more color to remember
6. One mistake ends the game

**Mechanics**:
- Pattern display: 750ms per color
- Color flash duration: 450ms
- Input locked during pattern playback
- New pattern generated after successful completion

---

### 8. Typing Speed ⌨️
**Difficulty**: Medium

Test your typing speed and accuracy with real sentences.

**Features**:
- Three difficulty levels with different sentence lengths
- 60-second timed challenge
- Real-time accuracy display
- WPM (Words Per Minute) calculation
- Accuracy percentage tracking
- Color-coded feedback (green = correct, red = error)
- Continuous sentence flow
- Best WPM tracking per difficulty

**Difficulty Levels**:
- **Easy**: Short phrases (4-8 words)
- **Medium**: Medium sentences (10-15 words)
- **Hard**: Long complex sentences (15-20 words)

**How to Play**:
1. Select difficulty level
2. Type the displayed sentence in the input box
3. When you complete a sentence, a new one appears automatically
4. Continue typing for 60 seconds
5. View your WPM and accuracy stats

**Metrics**:
- **WPM**: Total characters typed / 5 / minutes elapsed
- **Accuracy**: Correct characters / total characters × 100
- Stats update in real-time

---

## Technical Architecture

### Project Structure

```
src/
├── app/
│   ├── Layout.jsx          # Main layout with navbar
│   └── Router.jsx          # Route configuration
├── components/
│   ├── Container.jsx       # Content wrapper
│   ├── GameCard.jsx        # Game card component
│   └── Navbar.jsx          # Navigation bar
├── games/
│   ├── aim-trainer/
│   ├── click-speed/
│   ├── memory-match/
│   ├── reaction-time/
│   ├── simon-says/
│   ├── snake/
│   ├── typing-speed/
│   ├── whack-a-mole/
│   └── games.js            # Games catalog
├── hooks/
│   └── useSound.js         # Sound effect hook
├── assets/
│   └── sounds/             # Audio files
├── main.jsx                # App entry point
└── index.css               # Global styles
```

### Key Technologies

- **React 19**: Latest React features with modern hooks
- **React Router DOM 7**: Client-side routing
- **Tailwind CSS 4**: Utility-first styling with Vite plugin
- **Vite 7**: Fast build tool and dev server
- **ESLint**: Code quality and consistency

### Custom Hooks

#### `useSound(src, volume)`
A custom hook for managing game sound effects with volume control.

**Parameters**:
- `src`: Audio file path
- `volume`: Volume level (0.0 to 1.0)

**Returns**: Play function to trigger sound

**Features**:
- Creates audio instance once via useRef
- Resets audio to start on each play
- Configurable volume
- Optimized for repeated plays

### State Management

All games use React's built-in state management:
- `useState` for game state
- `useEffect` for timers and side effects
- `useRef` for interval/timeout references
- localStorage for persistent high scores

### Sound System

Each game includes carefully selected sound effects:
- **click.mp3**: General clicks and hits
- **success.mp3**: Achievements and wins
- **fail.mp3**: Mistakes and misses
- **tick.mp3**: Timer countdown
- **eat.mp3**: Snake food collection
- **die.mp3**: Game over events

### Styling Approach

- Dark theme (gray-950/gray-900 base)
- Gradient backgrounds for depth
- Hover and active state animations
- Smooth transitions (200-300ms)
- Color-coded feedback states
- Responsive grid layouts
- Custom animations (shake, pop, fade-in)

### Animation Classes

Custom CSS animations defined in `index.css`:
- **animate-shake**: Quick horizontal shake
- **animate-fade-in**: Smooth entrance
- **animate-pop**: Scale-based pop effect
- **animate-pulse**: Tailwind's pulse (attention)
- **animate-bounce**: Tailwind's bounce (action)

---

## Installation

### Prerequisites

- Node.js 18+ and npm

### Setup

1. **Clone or download the project**

2. **Install dependencies**:
```bash
npm install
```

3. **Start development server**:
```bash
npm run dev
```

4. **Build for production**:
```bash
npm run build
```

5. **Preview production build**:
```bash
npm run preview
```

---

## Usage

### Navigation

- **Home**: Browse all available games
- **Game Pages**: Click any game card to play
- **Back to Home**: Click "Home" in navbar or browser back

### Controls

**Mouse/Touch**:
- All games support mouse clicks
- Touch-friendly for mobile devices

**Keyboard**:
- Snake: Arrow keys for movement
- Typing Speed: Keyboard input

### High Scores

- Automatically saved to browser's localStorage
- Persists across sessions
- Separate scores per game/difficulty
- Reset by clearing browser data or playing again

---

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

**Note**: Sound effects may require user interaction to play on some browsers due to autoplay policies.

---

## Performance Considerations

- Lightweight bundle size with Vite
- Lazy loading not needed (small app)
- Efficient re-renders with React best practices
- CSS animations use GPU acceleration
- Sound files cached after first load
- localStorage reads minimized

---

## Future Enhancement Ideas

- Global leaderboard with backend
- User accounts and profiles
- More games (Sudoku, 2048, Breakout, etc.)
- Multiplayer modes
- Achievements system
- Custom themes
- Sound toggle
- Mobile gesture controls
- Progressive Web App (PWA) support
- Social sharing

---

## License

This project is open source and available for personal and educational use.

---

## Credits

**Built with**:
- React
- Vite
- Tailwind CSS
- React Router

**Sound Effects**: Included in project assets

---

## Development

### Scripts

- `npm run dev`: Start dev server (port 5173)
- `npm run build`: Production build
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint

### Adding a New Game

1. Create game component in `src/games/[game-name]/`
2. Add route in `src/app/Router.jsx`
3. Add game metadata to `src/games/games.js`
4. Follow existing patterns for state, timers, and scoring

### Code Style

- Functional components with hooks
- Descriptive variable names
- Consistent spacing and formatting
- Tailwind for all styling
- Comments for complex logic

---

## Contact & Support

For issues, suggestions, or contributions, please refer to the project repository.

---

**Enjoy the games!** 🎮
