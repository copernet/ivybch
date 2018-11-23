"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("./errors");
function getDepth(stack, name) {
    const reversedStack = [...stack].reverse();
    return reversedStack.indexOf(name);
}
function pick(stack, depth) {
    const item = stack[stack.length - depth - 1];
    stack.push("picked(" + item + ")"); // to prevent it from getting grabbed
}
function roll(stack, depth) {
    const item = stack[stack.length - depth - 1];
    stack.splice(stack.length - depth - 1, 1);
    stack.push("rolled(" + item + ")");
}
function popMany(stack, numToPop) {
    for (let i = 0; i < numToPop; i++) {
        stack.pop();
    }
}
function pushResult(stack) {
    stack.push("(result)");
}
function compileStackOps(ops) {
    const newOps = [];
    const emit = (op) => {
        newOps.push(op);
    };
    const firstOp = ops.shift();
    if (!firstOp || firstOp.type !== "beginContract") {
        throw new errors_1.BugError("first operation must be beginContract");
    }
    const contract = firstOp.contract;
    const contractParameterNames = contract.parameters
        .filter(param => param.itemType !== "Value")
        .filter(param => contract.referenceCounts.get(param.name) !== 1)
        .map(param => param.name)
        .reverse();
    const clauseSelector = contract.clauseSelector && contract.numClauses > 1
        ? [contract.clauseSelector]
        : [];
    const defaultCounts = new Map();
    if (contract.clauseSelector) {
        defaultCounts.set(contract.clauseSelector, contract.numClauses - 1);
    }
    // for (let name of contractParameterNames) {
    //   defaultCounts.set(name, contract)
    // }
    const defaultStack = [...clauseSelector, ...contractParameterNames];
    let stack = defaultStack;
    let counts = defaultCounts;
    contract.parameters
        .slice()
        .reverse()
        .filter(param => param.itemType !== "Value")
        .filter(param => contract.referenceCounts.get(param.name) !== 1)
        .map(param => emit({ type: "pushParameter", name: param.name }));
    for (const op of ops) {
        switch (op.type) {
            case "beginContract": {
                throw new errors_1.BugError("only one beginContract op is allowed per contract");
            }
            case "beginClause": {
                if (op.clause.referenceCounts === undefined) {
                    throw new errors_1.BugError("reference counts map surprisingly undefined");
                }
                counts = new Map(op.clause.referenceCounts);
                const clauseParameterNames = op.clause.parameters
                    .map(param => param.name)
                    .reverse();
                stack = [...clauseParameterNames, ...defaultStack];
                // empty the stack of parameters that aren't used in this clause
                counts.forEach((value, key) => {
                    if (value === 0 && contract.referenceCounts.get(key) !== 1) {
                        const depth = getDepth(stack, key);
                        if (depth === -1) {
                            throw new errors_1.BugError(key + " not found in stack");
                        }
                        emit({ type: "roll", depth });
                        roll(stack, depth);
                        emit({ type: "drop" });
                        popMany(stack, 1);
                    }
                });
                // remove clause selector if it's still there
                if (contract.clauseSelector &&
                    stack.indexOf(contract.clauseSelector) !== -1) {
                    const depth = getDepth(stack, contract.clauseSelector);
                    if (depth === -1) {
                        throw new errors_1.BugError(contract.clauseSelector + " not found in stack");
                    }
                    emit({ type: "roll", depth });
                    roll(stack, depth);
                    emit({ type: "drop" });
                    popMany(stack, 1);
                }
                break;
            }
            case "endClause": {
                if (stack.length !== 1) {
                    throw new errors_1.BugError("stack not empty after clause " + op.clause.name);
                }
                counts = defaultCounts;
                stack = defaultStack;
                break;
            }
            case "get": {
                const name = op.variable.name;
                if (contract.referenceCounts.get(name) === 1) {
                    emit({ type: "pushParameter", name });
                    pushResult(stack);
                    continue;
                }
                const count = counts.get(op.variable.name);
                if (count === undefined) {
                    throw new errors_1.BugError("reference count unexpectedly undefined");
                }
                if (count <= 0) {
                    throw new errors_1.BugError("reference count unexpectedly " + count);
                }
                const depth = getDepth(stack, op.variable.name);
                if (depth === -1) {
                    throw new errors_1.BugError(op.variable.name + " not found in stack");
                }
                if (count === 1) {
                    emit({ type: "roll", depth });
                    roll(stack, depth);
                }
                else {
                    emit({ type: "pick", depth });
                    pick(stack, depth);
                }
                counts.set(op.variable.name, count - 1);
                break;
            }
            case "instructionOp": {
                const numInputs = op.expression.args.length;
                popMany(stack, numInputs);
                pushResult(stack);
                emit(op);
                break;
            }
            case "verify": {
                popMany(stack, 1);
                emit(op);
                break;
            }
            case "push": {
                pushResult(stack);
                emit(op);
                break;
            }
            case "beginIf": {
                popMany(stack, 1);
                emit(op);
                break;
            }
            default:
                emit(op);
        }
    }
    return newOps;
}
exports.compileStackOps = compileStackOps;
//# sourceMappingURL=stack.js.map