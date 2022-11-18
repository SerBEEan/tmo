type GetNumber = () => number;

function LCG(): GetNumber {
    const m = 5, a = 3, c = 1;
    let lastX = m;

    return function() {
        lastX = (a * lastX + c) % m;
        return lastX / m;
    }
}

const getNumber = LCG();

export function random(seed: number = 1): number {
    return Math.log(1 - getNumber()) / (-1 * seed);
}
