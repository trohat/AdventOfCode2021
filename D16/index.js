console.log("AOC 2021 - Day 16: Packet Decoder");

const prepare = hex => {
    //console.log("Hex len:", hex.length);
    let bin = "";
    for (let i = 0; i < hex.length; i++) {
        bin += parseInt(hex.at(i), 16).toString(2).padStart(4,"0")
    }
    //console.log("Bin len:", bin.length);
    return bin;
};

const task = (bits, task) => {
    let versionSum = 0;

    const decode = () => {
        let version = bits.slice(0,3);
        bits = bits.slice(3);
        //console.log("Version: ", version);
        versionSum += parseInt(version, 2);

        let type = bits.slice(0,3);
        bits = bits.slice(3);
        type = parseInt(type, 2);

        if (type === 4) {
            let prefix; 
            let binNumber = "";
            do {
                prefix = bits.slice(0,1);
                binNumber += bits.slice(1,5);
                bits = bits.slice(5);

            } while (prefix === "1");

            return parseInt(binNumber, 2);
        } else {
            lengthType = bits.slice(0,1);
            bits = bits.slice(1);
            let operands = [];
            
            if (lengthType === "0") {
                let subpacketsLength = bits.slice(0,15);
                bits = bits.slice(15);
                subpacketsLength = parseInt(subpacketsLength, 2);
                let bitsLength = bits.length;
                while (bits.length > bitsLength - subpacketsLength) {
                    //console.log("start lengh type ID - total length", subpacketsLength, "remaining length", - bitsLength + bits.length + subpacketsLength);
                    operands.push(decode());
                    //console.log("end lengh type ID - total length", subpacketsLength, "remaining length", subpacketsLength - (bitsLength - bits.length));
                }
            } else {
                console.assert(lengthType === "1");
                let subpackets = bits.slice(0,11);
                bits = bits.slice(11);
                subpackets = parseInt(subpackets, 2);
                for (let i = 0; i < subpackets; i++) {
                    //console.log("lengh type ID - subpackets", subpackets, "subpacket", i)
                    operands.push(decode());
                }
            }
            operands = operands.filter(o => o !== undefined);
            let result;
            switch (type) {
                case 0:
                    result = operands.reduce((acc, curr) => acc + curr, 0);
                    break;
                case 1:
                    result = operands.reduce((acc, curr) => acc * curr, 1);
                    break;
                case 2:
                    result = operands.min();
                    break;
                case 3:
                    result = operands.max();
                    break;
                case 5:
                    result = operands[0] > operands[1] ? 1 : 0;
                    break;
                case 6:
                    result = operands[0] < operands[1] ? 1 : 0;
                    break;
                case 7:
                    result = operands[0] == operands[1] ? 1 : 0;
                    break;
                default:
                    console.log("Wrong type");
            }
            
            return result;
        }
    }

    let result = decode();

    if (task === "task2") return result;

    return versionSum;
};

let testdata1 = `D2FE28`;
let testdata2 = `38006F45291200`;
let testdata3 = `EE00D40C823060`;
let testdata4 = `8A004A801A8002F478`;
let testdata5 = `620080001611562C8802118E34`;
let testdata6 = `C0015000016115A2E0802F182340`;
let testdata7 = `A0016C880162017C3686B18A3D4780`;

let testdata21 = `C200B40A82`;
let testdata22 = `04005AC33890`;
let testdata23 = `880086C3E88112`;
let testdata24 = `CE00C43D881120`;
let testdata25 = `D8005AC2A8F0`;
let testdata26 = `F600BC2D8F`;
let testdata27 = `9C005AC2F8F0`;
let testdata28 = `9C0141080250320F1802104A08`;


testdata1 = prepare(testdata1);
testdata2 = prepare(testdata2);
testdata3 = prepare(testdata3);
testdata4 = prepare(testdata4);
testdata5 = prepare(testdata5);
testdata6 = prepare(testdata6);
testdata7 = prepare(testdata7);

testdata21 = prepare(testdata21);
testdata22 = prepare(testdata22);
testdata23 = prepare(testdata23);
testdata24 = prepare(testdata24);
testdata25 = prepare(testdata25);
testdata26 = prepare(testdata26);
testdata27 = prepare(testdata27);
testdata28 = prepare(testdata28);

console.log("Test data:");
console.log(testdata2);

inputdata = prepare(inputdata);

console.log("Input data:");
console.log(inputdata);

console.log("");

doEqualTest(task(testdata1), 6);
doEqualTest(task(testdata2), 9);
doEqualTest(task(testdata3), 14);
doEqualTest(task(testdata4), 16);
doEqualTest(task(testdata5), 12);
doEqualTest(task(testdata6), 23);
doEqualTest(task(testdata7), 31);

console.time("Task 1");
console.log("Task 1: " + task(inputdata));
console.timeEnd("Task 1");

console.log("");

doEqualTest(task(testdata21, "task2"), 3);
doEqualTest(task(testdata22, "task2"), 54);
doEqualTest(task(testdata23, "task2"), 7);
doEqualTest(task(testdata24, "task2"), 9);
doEqualTest(task(testdata25, "task2"), 1);
doEqualTest(task(testdata26, "task2"), 0);
doEqualTest(task(testdata27, "task2"), 0);
doEqualTest(task(testdata28, "task2"), 1);

console.time("Task 2");
console.log("Task 2: " + task(inputdata, "task2"));
console.timeEnd("Task 2");