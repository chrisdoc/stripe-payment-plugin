"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@vendure/core");
const body_parser_1 = require("body-parser");
const clone_buffer_1 = __importDefault(require("clone-buffer"));
const stripe_payment_methods_1 = require("./stripe-payment-methods");
/**
 * This plugin implements the Stripe (https://www.stripe.com/) payment provider.
 */
let StripePlugin = class StripePlugin {
    static beforeVendureBootstrap(app) {
        // https://yanndanthu.github.io/2019/07/04/Checking-Stripe-Webhook-Signatures-from-NestJS.html
        app.use(body_parser_1.json({
            verify(req, res, buf) {
                if (req.headers['stripe-signature'] && Buffer.isBuffer(buf)) {
                    req.rawBody = clone_buffer_1.default(buf);
                }
                return true;
            },
        }));
    }
    async onVendureBootstrap() {
        // nothing to see here.
    }
};
StripePlugin = __decorate([
    core_1.VendurePlugin({
        imports: [core_1.PluginCommonModule],
        controllers: [],
        configuration: (config) => {
            config.paymentOptions.paymentMethodHandlers.push(stripe_payment_methods_1.stripePaymentMethodHandler);
            return config;
        },
    })
], StripePlugin);
exports.StripePlugin = StripePlugin;
//# sourceMappingURL=plugin.js.map