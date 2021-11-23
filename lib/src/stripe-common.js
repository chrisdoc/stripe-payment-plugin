"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stripe_1 = __importDefault(require("stripe"));
function getGateway(args) {
    // Reference: https://github.com/stripe/stripe-node
    return new stripe_1.default(args.secretKey.toString(), {
        apiVersion: '2020-08-27',
        appInfo: {
            name: 'VendureIOStripePlugin',
            version: '1.0.0',
            url: 'https://github.com/gaiusmathew/stripe-payment-plugin',
        },
    });
}
exports.getGateway = getGateway;
//# sourceMappingURL=stripe-common.js.map