import { writable } from 'svelte/store';

interface Event {
    id : string,
    name : string,
    user_id : string,
    colour : string,
    colour_text : string,
    font : number,
    rounded : number,
    edit_mode : boolean,
    graphic : Graphic[]
}

interface Graphic {
    id : number,
    type : string,
    data : string,
    visible : boolean,
    event_id  : string,
    editing  : boolean
}

export const eventStore = writable<Event>();
