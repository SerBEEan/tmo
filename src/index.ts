import { simulationModel } from './model';
import { calculateStatistics, printStatistics } from './statistics';

const   NUMBER_SERVICE_CHANNELS = 1,  // число каналов обслуживания
        NUMBER_PLACE_QUEUE = 1,       // число мест в очереди
        INTENSITY_SERVICE_APPS = 2,   // интенсивность обслуживания заявок
        INTENSITY_RECEIPT_APPS = 2,   // интенсивность поступления заявок
        STATISTICS_STEP = 100;        // шаг сбора статистики

const NUMBER_RUNS = 1000;

function main() {
    const statisticsOnModels: number[][][] = [];

    for (let i = 0; i < NUMBER_RUNS; i++) {
        statisticsOnModels.push(
            simulationModel({
                intensityReceiptApps: INTENSITY_RECEIPT_APPS,
                intensityServiceApps: INTENSITY_SERVICE_APPS,
                numberPlaceQueue: NUMBER_PLACE_QUEUE,
                numberServiceChannels: NUMBER_SERVICE_CHANNELS,
                statisticStep: STATISTICS_STEP,
            })
        );
    }
    
    printStatistics(calculateStatistics(statisticsOnModels, NUMBER_RUNS), STATISTICS_STEP);
}

main();
