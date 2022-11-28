import { sumArrays, divideArray } from './utils/array';
import { Plain } from './typings/Object';

export type StatisticsData = number[][];

interface IdentifyModelStateParams {
    numberPlaceInQueue: number;
    numberChannels: number;
    numberFreePlacesInQueue: number;
    numberFreeChannels: number;
}

export function identifyModelState(params: IdentifyModelStateParams): number[] {
    const {
        numberFreeChannels,
        numberFreePlacesInQueue,
        numberChannels,
        numberPlaceInQueue,
    } = params;

    const numberCases = numberPlaceInQueue + numberChannels + 1;
    const numberBusyChannels = numberChannels - numberFreeChannels;
    const numberBusyPlaceInQueue = numberPlaceInQueue - numberFreePlacesInQueue;
    
    const state = Array(numberCases).fill(0);
    state[numberBusyChannels + numberBusyPlaceInQueue] = 1;

    return state;
}

export function calculateStatistics(statisticsOnModels: number[][][], numberRuns: number): number[][] {
    const statistics: number[][] = statisticsOnModels[0];
    
    for (let i = 1; i < statisticsOnModels.length; i++) {
        const model = statisticsOnModels[i];

        for (let j = 0; j < model.length; j++) {
            const modelState = model[j];

            statistics[j] = sumArrays(statistics[j], modelState);
        }
    }
    
    for (let i = 0; i < statistics.length; i++) {
        statistics[i] = divideArray(statistics[i], numberRuns);
    }

    return statistics;
}

export function printStatistics(statistics: number[][], step: number) {
    const result: Plain<number>[] = [];

    for (let i = 0; i < statistics.length; i++) {
        const obj: Plain<number> = { time: step * (i + 1) };
        const probabilities = statistics[i];
        
        for (let j = 0; j < probabilities.length; j++) {
            obj[`P${j}`] = probabilities[j]
        }

        result.push(obj);
    }
    
    console.table(result);
}
