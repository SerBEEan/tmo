export enum EventType {
    ADD,
    REMOVE,
}

export interface Event {
    time: number;
    type: EventType
};