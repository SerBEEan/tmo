import { Event } from './typings/Event';

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

    pop(time: number): Event | undefined {
        if (this.list[this.list.length - 1]?.time <= time) {
            return this.list.pop();
        }
    }
}
