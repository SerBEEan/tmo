import { Event, EventType } from '../typings/Event';

export class ListFutureEvents {
    private list: Event[] = [];

    constructor() {}

    get length() {
        return this.list.length;
    }

    add(event: Event): void {
        this.list.push(event);
        this.list.sort((a, b) => b.time - a.time);
    }

    pop(): Event | undefined {
        return this.list.pop();
    }
}
