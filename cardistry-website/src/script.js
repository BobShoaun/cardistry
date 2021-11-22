import cardistry from "cardistry";
import { setupCards } from "cardistry/setup";
import {
  stack,
  fan,
  spreadRight,
  flip,
  spreadLeft,
  disperse,
  spreadCenter,
} from "cardistry/presets";

setupCards(".spread-x");

cardistry({
  target: ".spread-x",
  loop: true,
  // relative: true,
  states: [
    stack(),
    disperse(),
    spreadRight(),
    {
      translateY: 100,
      duration: 500,
      delay: (i, n) => (n - i) * 100,
    },
  ],
});

/*
    do we want them to all play at the same time, or stagger them?
    if  we want to stagger, which card goes first? front or back?

    simple builder:
    preset animations, just play them, reset b4 each anim

    animation builder:
    specify deltas
    */