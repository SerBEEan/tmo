import { random } from './utils/random';
import { ListFutureEvents } from './utils/listFutureEvents';
import { EventType, Event } from './typings/Event';

const list = new ListFutureEvents();
let modelTime = 0,          // модельное время
    numberApps = 0,         // количество заявок
    numberRejectedApps = 0; // количество отклоненных заявок

let isDeviceFree = true;
const queue: Event[] = [];

function main() {
    // Добавил первое событие
    createEvent(EventType.ADD);

    while (modelTime < 1000) {
        const event = list.pop();

        if (event && event.type === EventType.ADD) {
            numberApps++;

            if (isDeviceFree) {
                isDeviceFree = false;
                createEvent(EventType.REMOVE);
            } else {
                if (numberApps <= 1) {
                    queue.push(event);
                } else {
                    numberApps--;
                    numberRejectedApps++;
                }
            }

            createEvent(EventType.ADD);
        }

        if (event && event.type === EventType.REMOVE) {
            numberApps--;
            if (queue.length > 0) {
                createEvent(EventType.REMOVE);
            } else {
                isDeviceFree = true;
            }
        }
    }
}

function createEvent(type: EventType) {
    modelTime += random();
    list.add({ time: modelTime, type});
}

main();
