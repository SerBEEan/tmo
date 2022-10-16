const getNumber = LCG();

function random(seed = 1) {
    return Math.log(1 - getNumber()) / (-1 * seed);
}

function LCG() {
    const m = 5, a = 3, c = 1;
    let lastX = m;

    return function() {
        lastX = (a * lastX + c) % m;
        return lastX / m;
    }
}

exports.random = random;