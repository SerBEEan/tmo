import { simulationModel } from './model';
import { calculateStatistics, printStatistics, StatisticsData } from './statistics';

const   NUMBER_SERVICE_CHANNELS = 3,  // число каналов обслуживания
        NUMBER_PLACE_QUEUE = 2,       // число мест в очереди
        INTENSITY_RECEIPT_APPS = 7,   // интенсивность поступления заявок
        INTENSITY_SERVICE_APPS = 2,   // интенсивность обслуживания заявок
        STATISTICS_STEP = 100,        // шаг сбора статистики
        MODAL_TIME_LIMIT = 1600;

const NUMBER_RUNS = 1000;

function main() {
    const statisticsOnModels: StatisticsData[] = [];

    for (let i = 0; i < NUMBER_RUNS; i++) {
        statisticsOnModels.push(
            simulationModel({
                intensityReceiptApps: INTENSITY_RECEIPT_APPS,
                intensityServiceApps: INTENSITY_SERVICE_APPS,
                numberPlaceQueue: NUMBER_PLACE_QUEUE,
                numberServiceChannels: NUMBER_SERVICE_CHANNELS,
                statisticStep: STATISTICS_STEP,
                modalTimeLimit: MODAL_TIME_LIMIT,
            })
        );
    }
    
    printStatistics(calculateStatistics(statisticsOnModels, NUMBER_RUNS), STATISTICS_STEP);
}

main();
