// Durations
const POMODORO = "pomodoro";
const SHORT_BREAK = "short-break";
const LONG_BREAK = "long-break";
// Fonts
const KUMBH_SANS = "kumbh-sans";
const ROBOTO_SERIF = "roboto-slab";
const SPACE_MONO = "space-mono";
// Colors
const RED = "red";
const CYAN = "cyan";
const VIOLET = "violet";

// In minutes
const DEFAULT_DURATIONS = {
  [POMODORO]: 25,
  [SHORT_BREAK]: 5,
  [LONG_BREAK]: 15,
};

const app = () => ({
  actions: [POMODORO, SHORT_BREAK, LONG_BREAK],
  colors: [RED, CYAN, VIOLET],
  fonts: [KUMBH_SANS, ROBOTO_SERIF, SPACE_MONO],

  activeAction: POMODORO,
  runningTimer: null,
  duration: minutesToSeconds(DEFAULT_DURATIONS[POMODORO]),

  start() {
    this.runningTimer = setInterval(() => {
      if (this.duration <= 0) {
        this.resetTimers();
        return;
      }
      this.duration -= 1;
    }, 1000);
  },
  pause() {
    clearInterval(this.runningTimer);
    this.runningTimer = null;
  },
  resetTimers() {
    clearInterval(this.runningTimer);
    this.runningTimer = null;
    this.duration = minutesToSeconds(this.settings.durations[this.activeAction]);
  },
  setAction(action) {
    this.activeAction = action;
    this.resetTimers();
  },

  settings: {
    open: false,
    font: KUMBH_SANS,
    color: RED,
    durations: { ...DEFAULT_DURATIONS },
    _raw: { durations: { ...DEFAULT_DURATIONS }, color: RED, font: KUMBH_SANS },
    _errors: {
      [POMODORO]: false,
      [SHORT_BREAK]: false,
      [LONG_BREAK]: false,
    },
  },

  validate(value, action) {
    if (value > 59 || value < 1 || value % 1 !== 0) {
      this.settings._errors[action] = true;
    } else {
      this.settings._errors[action] = false;
      this.settings._raw.durations[action] = value;
    }
  },
});

// Shamelessly copied from here
// https://stackoverflow.com/questions/19700283/how-to-convert-time-milliseconds-to-hours-min-sec-format-in-javascript#19700358
// Note: Does not support hours!
const secondsToMinutes = (duration) => {
  let seconds = parseInt(duration % 60, 10);
  let minutes = parseInt((duration / 60) % 60, 10);

  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return minutes + ":" + seconds;
};

const minutesToSeconds = (minutes) => {
  return minutes * 60;
};

// I hate calculating percentages so much
const durationToPercents = (currentDuration, fullDuration) => {
  const fullDurationSeconds = minutesToSeconds(fullDuration);
  const singlePercent = fullDurationSeconds / 100;
  const durationDifference = fullDurationSeconds - currentDuration;
  // Subtracting from 100% to get reversed percentage
  return 100 - durationDifference / singlePercent;
};
