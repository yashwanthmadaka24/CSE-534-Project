export declare class RTTStats {
    minRTT: number;
    latestRTT: number;
    smoothedRTT: number;
    constructor();
    readonly msRTT: number;
    updateRTT(sentTime: number, rcvTime: number, ackDelay: number): void;
}
