// src/utils/animations.js
import { gsap } from 'gsap'

export const fadeInUp = (element, delay = 0) => {
  gsap.from(element, {
    y: 50,
    opacity: 0,
    duration: 1,
    delay,
    ease: 'power3.out'
  })
}

export const fadeInScale = (element, delay = 0) => {
  gsap.from(element, {
    scale: 0.8,
    opacity: 0,
    duration: 0.8,
    delay,
    ease: 'back.out(1.7)'
  })
}

export const staggerAnimation = (elements, staggerAmount = 0.1) => {
  gsap.from(elements, {
    y: 30,
    opacity: 0,
    duration: 0.6,
    stagger: staggerAmount,
    ease: 'power2.out'
  })
}