type GetNumber = () => number;

function LCG(): GetNumber {
    const m = 2147483647, a = 4827, c = 0;
    let lastX = 1 % m;

    return function() {
        lastX = (a * lastX + c) % m;
        return lastX / m;
    }
}

const getNumber = LCG();

export function random(param: number = 1): number {
    return Math.log(1 - getNumber()) / (-1 * param);
}
