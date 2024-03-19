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
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapChannel = exports.mapOrder = void 0;
const create_client_1 = require("../client/create.client");
const virtualstock_const_1 = require("../consts/virtualstock.const");
const mapOrder = (body, supplierRestID) => {
    const { id, createdBy, createdAt, shippingAddress, shippingInfo, customerEmail, lineItems, store, } = body.order;
    return {
        supplier: supplierRestID,
        order_reference: id,
        order_date: createdAt,
        additional_order_reference: body.resource.typeId,
        end_user_purchase_order_reference: createdBy.user.id,
        shipping_store_number: store.key,
        items: lineItems.map((item) => {
            return {
                currency_code: shippingInfo.price.currencyCode,
                retailer_sku_reference: item.variant.sku,
                line_reference: item.productId,
                name: item.name['en-GB'],
                quantity: item.quantity,
                unit_cost_price: (item.totalPrice.centAmount / 100).toFixed(2),
                subtotal: ((item.totalPrice.centAmount / 100) * item.quantity).toFixed(2),
                tax: (item.taxedPrice.totalNet.centAmount / 100).toFixed(2),
                tax_rate: item.taxRate.amount * 100,
                total: (item.taxedPrice.totalGross.centAmount / 100).toFixed(2),
            };
        }),
        shipping_address: {
            full_name: `${shippingAddress.firstName} ${shippingAddress.lastName}`,
            line_1: `${shippingAddress.streetNumber} ${shippingAddress.streetName}`,
            city: shippingAddress.city,
            state: shippingAddress.state,
            postal_code: shippingAddress.postalCode,
            email: customerEmail,
            country: shippingAddress.country,
        },
        promised_date: createdAt,
    };
};
exports.mapOrder = mapOrder;
const mapChannel = (channelId) => __awaiter(void 0, void 0, void 0, function* () {
    const channel = yield (0, create_client_1.createApiRoot)()
        .channels()
        .withId({ ID: channelId })
        .get()
        .execute();
    return `${virtualstock_const_1.edgeApi_v4}/suppliers/${channel.body.key}/`;
});
exports.mapChannel = mapChannel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXIudXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvb3JkZXIudXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsMkRBQXdEO0FBQ3hELHFFQUEwRDtBQUcxRCxNQUFNLFFBQVEsR0FBRyxDQUFDLElBQWlCLEVBQUUsY0FBc0IsRUFBRSxFQUFFO0lBQzdELE1BQU0sRUFDSixFQUFFLEVBQ0YsU0FBUyxFQUNULFNBQVMsRUFDVCxlQUFlLEVBQ2YsWUFBWSxFQUNaLGFBQWEsRUFDYixTQUFTLEVBQ1QsS0FBSyxHQUNOLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUVmLE9BQU87UUFDTCxRQUFRLEVBQUUsY0FBYztRQUN4QixlQUFlLEVBQUUsRUFBRTtRQUNuQixVQUFVLEVBQUUsU0FBUztRQUNyQiwwQkFBMEIsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU07UUFDaEQsaUNBQWlDLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ3BELHFCQUFxQixFQUFFLEtBQUssQ0FBQyxHQUFHO1FBQ2hDLEtBQUssRUFBRSxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBYyxFQUFFLEVBQUU7WUFDdEMsT0FBTztnQkFDTCxhQUFhLEVBQUUsWUFBWSxDQUFDLEtBQUssQ0FBQyxZQUFZO2dCQUM5QyxzQkFBc0IsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUc7Z0JBQ3hDLGNBQWMsRUFBRSxJQUFJLENBQUMsU0FBUztnQkFDOUIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUN4QixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7Z0JBQ3ZCLGVBQWUsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQzlELFFBQVEsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FDcEUsQ0FBQyxDQUNGO2dCQUNELEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUMzRCxRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsR0FBRztnQkFDbkMsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7YUFDaEUsQ0FBQztRQUNKLENBQUMsQ0FBQztRQUNGLGdCQUFnQixFQUFFO1lBQ2hCLFNBQVMsRUFBRSxHQUFHLGVBQWUsQ0FBQyxTQUFTLElBQUksZUFBZSxDQUFDLFFBQVEsRUFBRTtZQUNyRSxNQUFNLEVBQUUsR0FBRyxlQUFlLENBQUMsWUFBWSxJQUFJLGVBQWUsQ0FBQyxVQUFVLEVBQUU7WUFDdkUsSUFBSSxFQUFFLGVBQWUsQ0FBQyxJQUFJO1lBQzFCLEtBQUssRUFBRSxlQUFlLENBQUMsS0FBSztZQUM1QixXQUFXLEVBQUUsZUFBZSxDQUFDLFVBQVU7WUFDdkMsS0FBSyxFQUFFLGFBQWE7WUFDcEIsT0FBTyxFQUFFLGVBQWUsQ0FBQyxPQUFPO1NBQ2pDO1FBQ0QsYUFBYSxFQUFFLFNBQVM7S0FDekIsQ0FBQztBQUNKLENBQUMsQ0FBQztBQVlPLDRCQUFRO0FBVmpCLE1BQU0sVUFBVSxHQUFHLENBQU8sU0FBaUIsRUFBRSxFQUFFO0lBQzdDLE1BQU0sT0FBTyxHQUFHLE1BQU0sSUFBQSw2QkFBYSxHQUFFO1NBQ2xDLFFBQVEsRUFBRTtTQUNWLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsQ0FBQztTQUN6QixHQUFHLEVBQUU7U0FDTCxPQUFPLEVBQUUsQ0FBQztJQUViLE9BQU8sR0FBRywrQkFBVSxjQUFjLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDeEQsQ0FBQyxDQUFBLENBQUM7QUFFaUIsZ0NBQVUifQ==