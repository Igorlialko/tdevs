import gsap from "gsap";

export function gsapFromTo(el, from, to) {
  return  gsap.fromTo(el, {
    opacity: 0,
    ...from
  }, {
    opacity: 1,
    duration: 1,
    stagger: 0.2,
    ...to
  });
}

