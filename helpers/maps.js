// --- Maps ---

const generalDirs = [{ x: 0, y: -1 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }];

const wordsToDirs = new Map([["up", { x: 0, y: -1 }], ["right", { x: 1, y: 0 }], ["down", { x: 0, y: 1 }], ["left", { x: -1, y: 0 }] ]);

const charsToDirs = new Map([["U", { x: 0, y: -1 }], ["R", { x: 1, y: 0 }], ["D", { x: 0, y: 1 }], ["L", { x: -1, y: 0 }] ]);

const graphicsToDirs = new Map([["^", { x: 0, y: -1 }], [">", { x: 1, y: 0 }], ["v", { x: 0, y: 1 }], ["<", { x: -1, y: 0 }] ]);

const charsToWords = new Map([["L", "left"], ["R", "right"], ["U", "up"], ["D", "down"]]);

const graphicsToWords = new Map([["<", "left"], [">", "right"], ["^", "up"], ["v", "down"]]);

const leftTurns = new Map([["up", "left"], ["left", "down"], ["down", "right"], ["right", "up"]]);

const rightTurns = new Map([["up", "right"], ["right", "down"], ["down", "left"], ["left", "up"]]);
