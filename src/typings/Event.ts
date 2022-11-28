export enum EventType {
    ADD,
    REMOVE,
    COLLECT_EVENT,
}

export interface Event {
    time: number;
    type: EventType
};