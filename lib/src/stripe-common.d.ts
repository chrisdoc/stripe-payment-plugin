import Stripe from 'stripe';
import { PaymentMethodArgsHash } from './types';
export declare function getGateway(args: PaymentMethodArgsHash): Stripe;
