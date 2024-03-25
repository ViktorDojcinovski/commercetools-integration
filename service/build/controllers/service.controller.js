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
const refreshToken_utils_1 = require("../utils/refreshToken.utils");
const logger_utils_1 = require("../utils/logger.utils");
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
    const { body } = request;
    const { resource } = body;
    if (!resource) {
        throw new custom_error_1.default(400, 'Bad request. Missing body resource parameter.');
    }
    if (resource.typeId !== 'order') {
        throw new custom_error_1.default(400, `Bad request. Allowed value is 'order'.`);
    }
    try {
        const virtualStockApiClient = (0, axios_client_api_1.default)({
            baseURL: virtualstock_const_1.virtualStockApi_v4,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
            },
        });
        const data = yield orderController(body, virtualStockApiClient);
        if (data && data.statusCode === 200) {
            (0, success_api_1.apiSuccess)(data.statusCode, data.actions, response);
            return;
        }
    }
    catch (error) {
        if (error instanceof Error) {
            throw new custom_error_1.default(error.statusCode || 500, error.message, error.errors);
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
    const supplierRestID = yield (0, order_utils_1.mapChannel)(Object.keys(body.order.lineItems[0].variant.availability.channels)[0]);
    const order = (0, order_utils_1.mapOrder)(body, supplierRestID);
    try {
        yield client.post('/orders/?format=json', order);
    }
    catch (error) {
        const { response: { status }, } = error;
        if (error.response) {
            switch (status) {
                case 500:
                    logger_utils_1.logger.error('error.response.data.error: ', JSON.stringify(error.response.data.error));
                    throw new custom_error_1.default(500, 'Failed to process the order.', error.response.data.error);
                case 401: {
                    logger_utils_1.logger.info('...refreshing token');
                    try {
                        const updatedClient = yield (0, refreshToken_utils_1.refreshToken)(client);
                        yield updatedClient.post('/orders/?format=json', order);
                    }
                    catch (error) {
                        throw new custom_error_1.default(error.response.status, 'Failed to refresh token or to process the order. Please try again later.', error.response.data.error);
                    }
                    break;
                }
                default:
                    throw new custom_error_1.default(status, error.response.data.error);
            }
        }
        else {
            throw new custom_error_1.default(500, 'Internal server error. Please try again later.');
        }
    }
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
});
exports.orderController = orderController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnRyb2xsZXJzL3NlcnZpY2UuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFJQSxvREFBZ0Q7QUFDaEQsMEVBQWlEO0FBQ2pELCtFQUFrRDtBQUVsRCxxRUFBa0U7QUFDbEUsc0RBQTREO0FBQzVELG9FQUEyRDtBQUMzRCx3REFBK0M7QUFFL0M7Ozs7Ozs7O0dBUUc7QUFDSCxNQUFNLElBQUksR0FBRyxDQUFPLE9BQWdCLEVBQUUsUUFBa0IsRUFBRSxFQUFFO0lBQzFELE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxPQUFPLENBQUM7SUFDekIsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLElBQUksQ0FBQztJQUUxQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDZCxNQUFNLElBQUksc0JBQVcsQ0FBQyxHQUFHLEVBQUUsK0NBQStDLENBQUMsQ0FBQztJQUM5RSxDQUFDO0lBRUQsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLE9BQU8sRUFBRSxDQUFDO1FBQ2hDLE1BQU0sSUFBSSxzQkFBVyxDQUFDLEdBQUcsRUFBRSx3Q0FBd0MsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFFRCxJQUFJLENBQUM7UUFDSCxNQUFNLHFCQUFxQixHQUFHLElBQUEsMEJBQVcsRUFBQztZQUN4QyxPQUFPLEVBQUUsdUNBQWtCO1lBQzNCLE9BQU8sRUFBRTtnQkFDUCxjQUFjLEVBQUUsa0JBQWtCO2dCQUNsQyxhQUFhLEVBQUUsVUFBVSxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRTthQUNsRDtTQUNGLENBQUMsQ0FBQztRQUNILE1BQU0sSUFBSSxHQUFHLE1BQU0sZUFBZSxDQUFDLElBQUksRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO1FBRWhFLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssR0FBRyxF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