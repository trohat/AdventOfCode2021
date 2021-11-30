let testNumber = 0;

const doEqualTest = (calculated, expected) => {
    testNumber++;
    if (calculated === expected) {
        console.info(`Test number ${testNumber} passed.`);
    } else {
        console.error(`Test number ${testNumber} did not pass.`);
        console.warn(`Expected value: ${expected}`);
        console.warn(`Computed value: ${calculated}`);
    }
};