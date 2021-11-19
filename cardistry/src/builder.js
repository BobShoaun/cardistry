export const build = async ({ target, states, loop }) => {
  const hand = document.querySelector(target);
  if (!hand) return;

  const cards = hand.querySelectorAll(".card");
  const cardProps = [...cards].map(() => ({
    translateX: 0,
    translateY: 0,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    scale: 1,
    zIndex: 1,
    transformOrigin: "50% 50%",
    contentRotateY: 0,
    contentRotateZ: 0,
    hoverScale: 1,
    duration: 0,
    delay: 0,
    timing: "ease",
  }));

  const apply = async state => {
    cardProps.forEach((cardProp, i) => {
      for (const [prop, value] of Object.entries(state)) {
        if (typeof value === "function") {
          cardProp[prop] = value(i);
          continue;
        }
        cardProp[prop] = value;
      }
    });

    return new Promise((resolve, reject) => {
      let numTransitions = 0;

      cards.forEach((card, i) => {
        const {
          translateX,
          translateY,
          rotateX,
          rotateY,
          rotateZ,
          scale,
          zIndex,
          transformOrigin,
          contentRotateY,
          contentRotateZ,
          hoverScale,
          duration,
          delay,
          timing,
        } = cardProps[i];

        // card.style.transformOrigin = transformOrigin;
        card.style.transform = `translateX(${translateX}px) translateY(${translateY}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`;
        card.style.transitionDuration = `${duration}ms`;
        card.style.transitionDelay = `${delay}ms`;
        card.style.transitionTimingFunction = timing;
        // card.style.transitionDelay = `${1000}ms`;
        // card.style.zIndex = zIndex;

        // const cardContent = card.querySelector(".content");
        // cardContent.style.transform = `rotateY(${contentRotateY}deg) rotateZ(${contentRotateZ}deg)`;
        // cardContent.style.transitionDuration = `${duration}ms`;
        // cardContent.style.transitionDelay = `${i * delay}ms`;

        // card.onmouseover = () => {
        //   card.style.transform = `translateX(${translateX}px) translateY(${translateY}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${hoverScale})`;
        // };

        // card.onmouseleave = () => {
        //   card.style.transform = `translateX(${translateX}px) translateY(${translateY}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`;
        // };

        card.ontransitionstart = () => numTransitions++;
        card.ontransitionend = () => {
          if (--numTransitions <= 0) resolve();
        };
      });
    });
  };

  await new Promise(resolve => setTimeout(resolve, 500)); // sleep

  if (typeof loop === "boolean") {
    do for (const state of states) await apply(state);
    while (loop);
  }

  for (let i = loop ?? 0; i >= 0; i--)
    for (const state of states) await apply(state);
};