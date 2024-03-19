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
exports.orderController = exports.post = void 0;
const success_api_1 = require("../api/success.api");
const custom_error_1 = __importDefault(require("../errors/custom.error"));
const axios_client_api_1 = __importDefault(require("../api/axios-client.api"));
const virtualstock_const_1 = require("../consts/virtualstock.const");
const order_utils_1 = require("../utils/order.utils");
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
    var _a, _b;
    const { body } = request;
    const { resource } = body;
    if (!resource) {
        throw new custom_error_1.default(400, 'Bad request - Missing body resource parameter.');
    }
    if (resource.typeId !== 'order') {
        throw new custom_error_1.default(400, `Bad request. Allowed value is 'order'.`);
    }
    try {
        const virtualStockApiClient = (0, axios_client_api_1.default)({
            baseURL: virtualstock_const_1.virtualStockApi_v4,
            auth: {
                username: (_a = process.env.CTP_VS_USERNAME) !== null && _a !== void 0 ? _a : '',
                password: (_b = process.env.CTP_VS_PASSWORD) !== null && _b !== void 0 ? _b : '',
            },
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = yield orderController(body, virtualStockApiClient);
        if (data && data.statusCode === 200) {
            (0, success_api_1.apiSuccess)(200, data.actions, response);
            return;
        }
    }
    catch (error) {
        if (error instanceof Error) {
            throw new custom_error_1.default(500, error.message);
        }
    }
});
exports.post = post;
/**
 *
 * @param resource
 * @param client
 * @returns OrderControllerResponse
 */
const orderController = (body, client) => __awaiter(void 0, void 0, void 0, function* () {
    const updateActions = [];
    try {
        const supplierRestID = yield (0, order_utils_1.mapChannel)(Object.keys(body.order.lineItems[0].variant.availability.channels)[0]);
        const order = (0, order_utils_1.mapOrder)(body, supplierRestID);
        yield client.post('/orders/?format=json', order);
        const updateAction = {
            action: 'dispatchOrderToVirtualStock',
            updateProductData: false,
        };
        updateActions.push(updateAction);
        const data = {
            statusCode: 200,
            actions: updateActions,
        };
        return data;
    }
    catch (error) {
        throw new custom_error_1.default(500, error.message);
    }
});
exports.orderController = orderController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnRyb2xsZXJzL3NlcnZpY2UuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFJQSxvREFBZ0Q7QUFDaEQsMEVBQWlEO0FBQ2pELCtFQUFrRDtBQUVsRCxxRUFBa0U7QUFDbEUsc0RBQTREO0FBRTVEOzs7Ozs7OztHQVFHO0FBQ0gsTUFBTSxJQUFJLEdBQUcsQ0FBTyxPQUFnQixFQUFFLFFBQWtCLEVBQUUsRUFBRTs7SUFDMUQsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLE9BQU8sQ0FBQztJQUN6QixNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsSUFBSSxDQUFDO0lBRTFCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNkLE1BQU0sSUFBSSxzQkFBVyxDQUNuQixHQUFHLEVBQ0gsZ0RBQWdELENBQ2pELENBQUM7SUFDSixDQUFDO0lBRUQsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLE9BQU8sRUFBRSxDQUFDO1FBQ2hDLE1BQU0sSUFBSSxzQkFBVyxDQUFDLEdBQUcsRUFBRSx3Q0FBd0MsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFFRCxJQUFJLENBQUM7UUFDSCxNQUFNLHFCQUFxQixHQUFHLElBQUEsMEJBQVcsRUFBQztZQUN4QyxPQUFPLEVBQUUsdUNBQWtCO1lBQzNCLElBQUksRUFBRTtnQkFDSixRQUFRLEVBQUUsTUFBQSxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsbUNBQUksRUFBRTtnQkFDM0MsUUFBUSxFQUFFLE1BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLG1DQUFJLEVBQUU7YUFDNUM7WUFDRCxPQUFPLEVBQUU7Z0JBQ1AsY0FBYyxFQUFFLGtCQUFrQjthQUNuQztTQUNGLENBQUMsQ0FBQztRQUVILE1BQU0sSUFBSSxHQUFHLE1BQU0sZUFBZSxDQUFDLElBQUksRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO1FBRWhFLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssR0FBRyxFQUFFLENBQUM7WUFDcEMsSUFBQSx3QkFBVSxFQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ3hDLE9BQU87UUFDVCxDQUFDO0lBQ0gsQ0FBQztJQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7UUFDZixJQUFJLEtBQUssWUFBWSxLQUFLLEVBQUUsQ0FBQztZQUMzQixNQUFNLElBQUksc0JBQVcsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVDLENBQUM7SUFDSCxDQUFDO0FBQ0gsQ0FBQyxDQUFBLENBQUM7QUFvQ08sb0JBQUk7QUFsQ2I7Ozs7O0dBS0c7QUFDSCxNQUFNLGVBQWUsR0FBRyxDQUN0QixJQUFpQixFQUNqQixNQUFhLEVBQ3FCLEVBQUU7SUFDcEMsTUFBTSxhQUFhLEdBQXdCLEVBQUUsQ0FBQztJQUM5QyxJQUFJLENBQUM7UUFDSCxNQUFNLGNBQWMsR0FBRyxNQUFNLElBQUEsd0JBQVUsRUFDckMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUN0RSxDQUFDO1FBQ0YsTUFBTSxLQUFLLEdBQUcsSUFBQSxzQkFBUSxFQUFDLElBQUksRUFBRSxjQUFjLENBQUMsQ0FBQztRQUM3QyxNQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDakQsTUFBTSxZQUFZLEdBQWlCO1lBQ2pDLE1BQU0sRUFBRSw2QkFBNkI7WUFDckMsaUJBQWlCLEVBQUUsS0FBSztTQUN6QixDQUFDO1FBQ0YsYUFBYSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUVqQyxNQUFNLElBQUksR0FBRztZQUNYLFVBQVUsRUFBRSxHQUFHO1lBQ2YsT0FBTyxFQUFFLGFBQWE7U0FDdkIsQ0FBQztRQUVGLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUFDLE9BQU8sS0FBVSxFQUFFLENBQUM7UUFDcEIsTUFBTSxJQUFJLHNCQUFXLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM1QyxDQUFDO0FBQ0gsQ0FBQyxDQUFBLENBQUM7QUFFYSwwQ0FBZSJ9