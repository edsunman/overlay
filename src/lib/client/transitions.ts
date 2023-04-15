import { quartInOut } from 'svelte/easing';

export function fullScreenWipeIn(node : HTMLElement, { delay = 0, duration = 300, easing = quartInOut }){

    return {
        delay,
        duration,
        easing,
        css: (t:number, u: number) => `top: ${u * 100}%`
    };
}

export function fullScreenWipeOut(node : HTMLElement, { delay = 0, duration = 300, easing = quartInOut }){

    return {
        delay,
        duration,
        easing,
        css: (t:number, u: number) => `top: ${u * -100}%`
    };
}

export function wipe(node : HTMLElement, { delay = 0,	duration = 300, easing = quartInOut }) {

    const w = parseInt(getComputedStyle(node).width) + 1;      

    return {
        delay,
        duration,
        easing,
        css: (t:number) => `width: ${t * w}px`
    };
}

export function slideUp(node : HTMLElement, { delay = 0,	duration = 300, easing = quartInOut }) {

    const height = parseFloat(getComputedStyle(node).height);         

    return {
        delay,
        duration,
        easing,
        css: (t:number, u:number) => 
        `padding-top: ${u * height * 3}px;` +
            `opacity: ${Math.min(t * 20, 1) * 100};`
    };
}