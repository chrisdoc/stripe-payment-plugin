import { OnVendureBootstrap } from '@vendure/core';
import { INestApplication } from '@nestjs/common';
/**
 * This plugin implements the Stripe (https://www.stripe.com/) payment provider.
 */
export declare class StripePlugin implements OnVendureBootstrap {
    static beforeVendureBootstrap(app: INestApplication): void | Promise<void>;
    onVendureBootstrap(): Promise<void>;
}
