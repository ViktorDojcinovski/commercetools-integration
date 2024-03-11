"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertString = exports.assertError = exports.assert = void 0;
function assert(condition, message) {
    if (!condition) {
        throw new Error(`Assertion failed: ${message}`);
    }
}
exports.assert = assert;
function assertError(value, message) {
    assert(value instanceof Error, message !== null && message !== void 0 ? message : 'Invalid error value');
}
exports.assertError = assertError;
function assertString(value, message) {
    assert(typeof value === 'string', message !== null && message !== void 0 ? message : 'Invalid string value');
}
exports.assertString = assertString;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXJ0LnV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2Fzc2VydC51dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxTQUFnQixNQUFNLENBQUMsU0FBa0IsRUFBRSxPQUFlO0lBQ3hELElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNmLE1BQU0sSUFBSSxLQUFLLENBQUMscUJBQXFCLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDbEQsQ0FBQztBQUNILENBQUM7QUFKRCx3QkFJQztBQUVELFNBQWdCLFdBQVcsQ0FDekIsS0FBYyxFQUNkLE9BQWdCO0lBRWhCLE1BQU0sQ0FBQyxLQUFLLFlBQVksS0FBSyxFQUFFLE9BQU8sYUFBUCxPQUFPLGNBQVAsT0FBTyxHQUFJLHFCQUFxQixDQUFDLENBQUM7QUFDbkUsQ0FBQztBQUxELGtDQUtDO0FBRUQsU0FBZ0IsWUFBWSxDQUMxQixLQUFjLEVBQ2QsT0FBZ0I7SUFFaEIsTUFBTSxDQUFDLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRSxPQUFPLGFBQVAsT0FBTyxjQUFQLE9BQU8sR0FBSSxzQkFBc0IsQ0FBQyxDQUFDO0FBQ3ZFLENBQUM7QUFMRCxvQ0FLQyJ9