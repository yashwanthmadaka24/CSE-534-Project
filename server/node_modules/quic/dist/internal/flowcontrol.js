'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
// **Github:** https://github.com/fidm/quic
//
// **License:** MIT
// https://docs.google.com/document/d/1F2YfdDXKpy20WVKJueEf4abn_LVZHhMUMS5gX6Pgjl4/edit#
class FlowController {
    constructor(windowSize, windowSizeLimit) {
        // Both stream and session windows start with a default value of 16 KB
        this.maxSendOffset = 16 * 1024;
        this.maxReceiveOffset = 16 * 1024;
        this.maxReceiveWindowSize = windowSize;
        this.maxReceiveWindowSizeLimit = windowSizeLimit;
        this.writtenOffset = 0;
        this.consumedOffset = 0;
        this.highestReceivedOffset = 0;
        this.lastWindowUpdateAt = 0;
    }
    updateMaxSendOffset(byteOffset) {
        if (byteOffset > this.maxSendOffset) {
            this.maxSendOffset = byteOffset;
            return true;
        }
        return false;
    }
    shouldUpdateWindow() {
        return (this.maxReceiveOffset - this.consumedOffset) < (this.maxReceiveWindowSize / 2);
    }
    updateWindowOffset(rtt) {
        const time = Date.now();
        this._autoTuning(rtt, time);
        this.lastWindowUpdateAt = time;
        this.maxReceiveOffset = this.consumedOffset + this.maxReceiveWindowSize;
        return this.maxReceiveOffset;
    }
    _autoTuning(rtt, now) {
        if (this.lastWindowUpdateAt > 0 && this.maxReceiveWindowSize < this.maxReceiveWindowSizeLimit &&
            (now - this.lastWindowUpdateAt <= rtt * 2)) {
            this.maxReceiveWindowSize =
                Math.min(this.maxReceiveWindowSize * 2, this.maxReceiveWindowSizeLimit);
        }
    }
}
exports.FlowController = FlowController;
class ConnectionFlowController extends FlowController {
    constructor(windowSize, windowSizeLimit) {
        super(windowSize, windowSizeLimit);
        this.lastBlockedAt = 0;
        this.lastBlockedStreamId = 0;
    }
    updateBlockedFrame(streamId, rcvTime) {
        this.lastBlockedAt = rcvTime;
        this.lastBlockedStreamId = streamId;
    }
}
exports.ConnectionFlowController = ConnectionFlowController;
class StreamFlowController extends FlowController {
    constructor(windowSize, windowSizeLimit, cfc) {
        super(windowSize, windowSizeLimit);
        this.cfc = cfc;
    }
    updateWrittenOffset(byteLen) {
        this.writtenOffset += byteLen;
        this.cfc.writtenOffset += byteLen;
    }
    updateConsumedOffset(consumedOffset) {
        if (consumedOffset > this.consumedOffset) {
            this.cfc.consumedOffset -= this.consumedOffset;
            this.consumedOffset = consumedOffset;
            this.cfc.consumedOffset += consumedOffset;
        }
    }
    updateHighestReceived(byteOffset) {
        if (byteOffset > this.highestReceivedOffset) {
            this.cfc.highestReceivedOffset -= this.highestReceivedOffset;
            this.highestReceivedOffset = byteOffset;
            this.cfc.highestReceivedOffset += byteOffset;
        }
    }
    isBlocked() {
        return this.highestReceivedOffset > this.maxReceiveOffset;
    }
    willBlocked(byteLen) {
        return byteLen > 0 && (this.maxSendOffset - this.writtenOffset < byteLen);
    }
}
exports.StreamFlowController = StreamFlowController;
//# sourceMappingURL=flowcontrol.js.map