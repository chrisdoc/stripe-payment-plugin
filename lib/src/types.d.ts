import { ConfigArgValues } from '@vendure/core/dist/common/configurable-operation';
import { stripePaymentMethodHandler } from './stripe-payment-methods';
export declare type PaymentMethodArgsHash = ConfigArgValues<typeof stripePaymentMethodHandler['args']>;
