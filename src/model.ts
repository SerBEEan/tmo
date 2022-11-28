import { ListFutureEvents } from './listFutureEvents';
import { identifyModelState, StatisticsData } from './statistics';
import { EventType } from './typings/Event';
import { random } from './utils/random';

interface SimulationModelParams {
    numberServiceChannels: number,
    numberPlaceQueue: number;
    intensityServiceApps: number;
    intensityReceiptApps: number;
    statisticStep: number;
    modalTimeLimit: number;
}

export function simulationModel(params: SimulationModelParams): StatisticsData {
    const {
        intensityReceiptApps,
        intensityServiceApps,
        numberPlaceQueue,
        numberServiceChannels,
        statisticStep,
        modalTimeLimit,
    } = params;

    const list = new ListFutureEvents();
    const modelStatistics: StatisticsData = [];

    let numberAllApps = 0,                              // всего заявок в системе
        numberRejectedApps = 0,                         // количество отклоненных заявок
        numberFreePlacesInQueue = numberPlaceQueue,     // число свободных мест в очереди
        numberFreeChannels = numberServiceChannels;     // число свободных каналов

    list.add({ time: random(intensityReceiptApps), type: EventType.ADD });
    list.add({ time: statisticStep, type: EventType.COLLECT_EVENT });

    for (let modelTime = 0, numberCollectStatistics = 1; modelTime < modalTimeLimit; modelTime++) {
        const event = list.pop(modelTime);

        if (event?.type === EventType.ADD) {
            numberAllApps++;

            if (numberFreeChannels > 0) {
                numberFreeChannels--;
                list.add({ time: modelTime + random(intensityServiceApps), type: EventType.REMOVE });
            } else {
                if (numberFreePlacesInQueue > 0) {
                    numberFreePlacesInQueue--;
                } else {
                    numberRejectedApps++;
                }
            }

            list.add({ time: modelTime + random(intensityReceiptApps), type: EventType.ADD });
        }

        if (event?.type === EventType.REMOVE) {
            // если есть в очереди
            if (numberFreePlacesInQueue < numberPlaceQueue) {
                numberFreePlacesInQueue++;
                list.add({ time: modelTime + random(intensityServiceApps), type: EventType.REMOVE });
            } else {
                numberFreeChannels++;
            }
        }

        if (event?.type === EventType.COLLECT_EVENT) {
            modelStatistics.push(
                identifyModelState({
                    numberChannels: numberServiceChannels,
                    numberFreeChannels,
                    numberFreePlacesInQueue,
                    numberPlaceInQueue: numberPlaceQueue,
                })
            );
            numberCollectStatistics++;

            list.add({ time: statisticStep * numberCollectStatistics, type: EventType.COLLECT_EVENT });
        }
    }

    modelStatistics.push(
        identifyModelState({
            numberChannels: numberServiceChannels,
            numberFreeChannels,
            numberFreePlacesInQueue,
            numberPlaceInQueue: numberPlaceQueue,
        })
    );

    return modelStatistics;
}
