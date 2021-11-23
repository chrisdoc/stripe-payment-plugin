"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generated_types_1 = require("@vendure/common/lib/generated-types");
const core_1 = require("@vendure/core");
const stripe_common_1 = require("./stripe-common");
const constants_1 = require("./constants");
/**
 * The handler for stripe payments
 */
exports.stripePaymentMethodHandler = new core_1.PaymentMethodHandler({
    code: 'stripe',
    description: [{ languageCode: generated_types_1.LanguageCode.en, value: 'stripe_description' }],
    args: {
        automaticCapture: {
            type: 'boolean',
        },
        secretKey: {
            type: 'string',
            label: [{ languageCode: generated_types_1.LanguageCode.en, value: 'stripe_secret_key' }],
        },
        publishedKey: {
            type: 'string',
            label: [{ languageCode: generated_types_1.LanguageCode.en, value: 'stripe_published_key' }],
        },
    },
    createPayment: async (order, args, metadata) => {
        const gateway = stripe_common_1.getGateway(args);
        let intent;
        try {
            intent = await gateway.paymentIntents.create({
                amount: order.total,
                currency: order.currencyCode,
                payment_method: metadata.paymentMethod.id,
                capture_method: args.automaticCapture ? 'automatic' : 'manual',
                confirmation_method: args.automaticCapture ? 'automatic' : 'manual',
                confirm: true,
            });
        }
        catch (e) {
            core_1.Logger.error(e, constants_1.loggerCtx);
        }
        return {
            amount: order.total,
            state: args.automaticCapture ? 'Settled' : 'Authorized',
            transactionId: intent.id.toString(),
            metadata: intent,
        };
    },
    settlePayment: async (order, payment, args) => {
        const gateway = stripe_common_1.getGateway(args);
        let response;
        try {
            response = await gateway.paymentIntents.capture(payment.metadata.id, {
                amount_to_capture: order.total,
            });
        }
        catch (e) {
            core_1.Logger.error(e, constants_1.loggerCtx);
            return {
                success: false,
                metadata: response,
            };
        }
        return {
            success: true,
            metadata: response,
        };
    },
    createRefund: async (input, total, order, payment, args) => {
        const gateway = stripe_common_1.getGateway(args);
        let response;
        try {
            response = await gateway.refunds.create({
                payment_intent: payment.metadata.id,
                amount: total,
                reason: 'requested_by_customer',
            });
        }
        catch (e) {
            // TODO: might be a better way to handle errors from bad responses.
            // https://stripe.com/docs/error-codes#charge-already-refunded
            if (e.type === 'StripeInvalidRequestError') {
                switch (e.code) {
                    case 'charge_already_refunded':
                        return {
                            state: 'Failed',
                            transactionId: payment.transactionId,
                            metadata: {
                                response: e.raw,
                            },
                        };
                }
            }
        }
        if ((response === null || response === void 0 ? void 0 : response.status) === 'failed') {
            return {
                state: 'Failed',
                transactionId: response.id,
                metadata: response,
            };
        }
        return {
            state: 'Settled',
            transactionId: response === null || response === void 0 ? void 0 : response.id,
            metadata: response,
        };
    },
});
//# sourceMappingURL=stripe-payment-methods.js.map