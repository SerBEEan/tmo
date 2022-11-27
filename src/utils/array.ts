export function sumArrays(one: number[], two: number[]): number[] {
    return one.map((num, index) => two[index] + num);
}

export function divideArray(arr: number[], divider: number): number[] {
    return arr.map((num) => num / divider);
}
