"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.post = void 0;
const success_api_1 = require("../api/success.api");
const custom_error_1 = __importDefault(require("../errors/custom.error"));
/**
 * Exposed service endpoint.
 * - Receives a POST request, parses the action and the controller
 * and returns it to the correct controller. We should be use 3. `Cart`, `Order` and `Payments`
 *
 * @param {Request} request The express request
 * @param {Response} response The express response
 * @returns
 */
const post = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { resource } = request.body;
    if (!resource) {
        throw new custom_error_1.default(400, 'Bad request - Missing body resource parameter.');
    }
    if (resource.typeId !== 'order') {
        throw new custom_error_1.default(400, `Bad request. Allowed value is 'order'.`);
    }
    try {
        const data = yield orderController(resource);
        if (data && data.statusCode === 200) {
            (0, success_api_1.apiSuccess)(200, data.actions, response);
            return;
        }
        throw new custom_error_1.default(data ? data.statusCode : 400, JSON.stringify(data));
    }
    catch (error) {
        if (error instanceof Error) {
            throw new custom_error_1.default(500, error.message);
        }
    }
});
exports.post = post;
const orderController = (resource) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = {
            statusCode: 200,
            actions: [],
        };
        return data;
    }
    catch (error) { }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnRyb2xsZXJzL3NlcnZpY2UuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFDQSxvREFBZ0Q7QUFDaEQsMEVBQWlEO0FBR2pEOzs7Ozs7OztHQVFHO0FBQ0ksTUFBTSxJQUFJLEdBQUcsQ0FBTyxPQUFnQixFQUFFLFFBQWtCLEVBQUUsRUFBRTtJQUNqRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztJQUVsQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDZCxNQUFNLElBQUksc0JBQVcsQ0FDbkIsR0FBRyxFQUNILGdEQUFnRCxDQUNqRCxDQUFDO0lBQ0osQ0FBQztJQUVELElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxPQUFPLEVBQUUsQ0FBQztRQUNoQyxNQUFNLElBQUksc0JBQVcsQ0FBQyxHQUFHLEVBQUUsd0NBQXdDLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBRUQsSUFBSSxDQUFDO1FBQ0gsTUFBTSxJQUFJLEdBQUcsTUFBTSxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFN0MsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxHQUFHLEVBQUUsQ0FBQztZQUNwQyxJQUFBLHdCQUFVLEVBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDeEMsT0FBTztRQUNULENBQUM7UUFFRCxNQUFNLElBQUksc0JBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDNUUsQ0FBQztJQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7UUFDZixJQUFJLEtBQUssWUFBWSxLQUFLLEVBQUUsQ0FBQztZQUMzQixNQUFNLElBQUksc0JBQVcsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVDLENBQUM7SUFDSCxDQUFDO0FBQ0gsQ0FBQyxDQUFBLENBQUM7QUE1QlcsUUFBQSxJQUFJLFFBNEJmO0FBRUYsTUFBTSxlQUFlLEdBQUcsQ0FBTyxRQUFhLEVBQUUsRUFBRTtJQUM5QyxJQUFJLENBQUM7UUFDSCxNQUFNLElBQUksR0FBRztZQUNYLFVBQVUsRUFBRSxHQUFHO1lBQ2YsT0FBTyxFQUFFLEVBQUU7U0FDWixDQUFDO1FBRUYsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQyxDQUFBLENBQUM7QUFDcEIsQ0FBQyxDQUFBLENBQUMifQ==