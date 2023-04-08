import { quartInOut } from 'svelte/easing';

export function wipe(node : HTMLElement, { delay = 0,	duration = 300, easing = quartInOut }) {
    //const o = +getComputedStyle(node).opacity;            
    return {
        delay,
        duration,
        easing,
        css: (t:number) => `width: ${t * 50}%`
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