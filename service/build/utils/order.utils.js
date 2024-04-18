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
    const { id, createdBy, createdAt, shippingAddress, shippingInfo, customerEmail, lineItems, store, } = body.resource.obj;
    return {
        supplier: supplierRestID,
        order_reference: id,
        order_date: createdAt,
        additional_order_reference: body.resource.typeId,
        end_user_purchase_order_reference: createdBy.user.id,
        shipping_store_number: store.key,
        test_flag: false,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXIudXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvb3JkZXIudXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsMkRBQXdEO0FBQ3hELHFFQUEwRDtBQUcxRCxNQUFNLFFBQVEsR0FBRyxDQUFDLElBQWlCLEVBQUUsY0FBc0IsRUFBRSxFQUFFO0lBQzdELE1BQU0sRUFDSixFQUFFLEVBQ0YsU0FBUyxFQUNULFNBQVMsRUFDVCxlQUFlLEVBQ2YsWUFBWSxFQUNaLGFBQWEsRUFDYixTQUFTLEVBQ1QsS0FBSyxHQUNOLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7SUFFdEIsT0FBTztRQUNMLFFBQVEsRUFBRSxjQUFjO1FBQ3hCLGVBQWUsRUFBRSxFQUFFO1FBQ25CLFVBQVUsRUFBRSxTQUFTO1FBQ3JCLDBCQUEwQixFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTTtRQUNoRCxpQ0FBaUMsRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDcEQscUJBQXFCLEVBQUUsS0FBSyxDQUFDLEdBQUc7UUFDaEMsU0FBUyxFQUFFLEtBQUs7UUFDaEIsS0FBSyxFQUFFLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFjLEVBQUUsRUFBRTtZQUN0QyxPQUFPO2dCQUNMLGFBQWEsRUFBRSxZQUFZLENBQUMsS0FBSyxDQUFDLFlBQVk7Z0JBQzlDLHNCQUFzQixFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRztnQkFDeEMsY0FBYyxFQUFFLElBQUksQ0FBQyxTQUFTO2dCQUM5QixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ3hCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtnQkFDdkIsZUFBZSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDOUQsUUFBUSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUNwRSxDQUFDLENBQ0Y7Z0JBQ0QsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQzNELFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxHQUFHO2dCQUNuQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzthQUNoRSxDQUFDO1FBQ0osQ0FBQyxDQUFDO1FBQ0YsZ0JBQWdCLEVBQUU7WUFDaEIsU0FBUyxFQUFFLEdBQUcsZUFBZSxDQUFDLFNBQVMsSUFBSSxlQUFlLENBQUMsUUFBUSxFQUFFO1lBQ3JFLE1BQU0sRUFBRSxHQUFHLGVBQWUsQ0FBQyxZQUFZLElBQUksZUFBZSxDQUFDLFVBQVUsRUFBRTtZQUN2RSxJQUFJLEVBQUUsZUFBZSxDQUFDLElBQUk7WUFDMUIsS0FBSyxFQUFFLGVBQWUsQ0FBQyxLQUFLO1lBQzVCLFdBQVcsRUFBRSxlQUFlLENBQUMsVUFBVTtZQUN2QyxLQUFLLEVBQUUsYUFBYTtZQUNwQixPQUFPLEVBQUUsZUFBZSxDQUFDLE9BQU87U0FDakM7UUFDRCxhQUFhLEVBQUUsU0FBUztLQUN6QixDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBWU8sNEJBQVE7QUFWakIsTUFBTSxVQUFVLEdBQUcsQ0FBTyxTQUFpQixFQUFFLEVBQUU7SUFDN0MsTUFBTSxPQUFPLEdBQUcsTUFBTSxJQUFBLDZCQUFhLEdBQUU7U0FDbEMsUUFBUSxFQUFFO1NBQ1YsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxDQUFDO1NBQ3pCLEdBQUcsRUFBRTtTQUNMLE9BQU8sRUFBRSxDQUFDO0lBRWIsT0FBTyxHQUFHLCtCQUFVLGNBQWMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUN4RCxDQUFDLENBQUEsQ0FBQztBQUVpQixnQ0FBVSJ9