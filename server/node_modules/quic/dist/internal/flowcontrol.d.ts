export declare class FlowController {
    maxSendOffset: number;
    maxReceiveOffset: number;
    maxReceiveWindowSize: number;
    maxReceiveWindowSizeLimit: number;
    writtenOffset: number;
    consumedOffset: number;
    highestReceivedOffset: number;
    lastWindowUpdateAt: number;
    constructor(windowSize: number, windowSizeLimit: number);
    updateMaxSendOffset(byteOffset: number): boolean;
    shouldUpdateWindow(): boolean;
    updateWindowOffset(rtt: number): number;
    _autoTuning(rtt: number, now: number): void;
}
export declare class ConnectionFlowController extends FlowController {
    lastBlockedAt: number;
    lastBlockedStreamId: number;
    constructor(windowSize: number, windowSizeLimit: number);
    updateBlockedFrame(streamId: number, rcvTime: number): void;
}
export declare class StreamFlowController extends FlowController {
    cfc: ConnectionFlowController;
    constructor(windowSize: number, windowSizeLimit: number, cfc: ConnectionFlowController);
    updateWrittenOffset(byteLen: number): void;
    updateConsumedOffset(consumedOffset: number): void;
    updateHighestReceived(byteOffset: number): void;
    isBlocked(): boolean;
    willBlocked(byteLen: number): boolean;
}
