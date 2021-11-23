/// <reference types="node" />
import http from 'http';
export interface RawBodyIncomingMessage extends http.IncomingMessage {
    rawBody: string;
}
