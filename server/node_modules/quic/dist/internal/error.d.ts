import { BufferVisitor } from './common';
/** QUICError representing a QUIC Error. */
export declare class QUICError extends Error {
    static fromError(err?: any): QUICError;
    static fromBuffer(bufv: BufferVisitor): QUICError;
    static checkAny(err?: any): QUICError | QUICStreamError | null;
    name: string;
    code: number;
    constructor(nameOrCode: string | number);
    readonly isNoError: boolean;
    valueOf(): {
        name: string;
        code: number;
        message: string;
    };
    byteLen(): number;
    writeTo(bufv: BufferVisitor): BufferVisitor;
}
/** QUICError representing a QUIC Stream Error. */
export declare class QUICStreamError extends Error {
    static fromError(err?: any): QUICStreamError;
    static fromBuffer(bufv: BufferVisitor): QUICStreamError;
    static checkAny(err?: any): QUICError | QUICStreamError | null;
    name: string;
    code: number;
    constructor(nameOrCode: string | number);
    readonly isNoError: boolean;
    valueOf(): {
        name: string;
        code: number;
        message: string;
    };
    byteLen(): number;
    writeTo(bufv: BufferVisitor): BufferVisitor;
}
export declare const QuicError: typeof QUICError & object & {
    QUIC_NO_ERROR: {
        code: number;
        message: string;
    };
    QUIC_INTERNAL_ERROR: {
        code: number;
        message: string;
    };
    QUIC_STREAM_DATA_AFTER_TERMINATION: {
        code: number;
        message: string;
    };
    QUIC_INVALID_PACKET_HEADER: {
        code: number;
        message: string;
    };
    QUIC_INVALID_FRAME_DATA: {
        code: number;
        message: string;
    };
    QUIC_MISSING_PAYLOAD: {
        code: number;
        message: string;
    };
    QUIC_INVALID_FEC_DATA: {
        code: number;
        message: string;
    };
    QUIC_INVALID_STREAM_DATA: {
        code: number;
        message: string;
    };
    QUIC_OVERLAPPING_STREAM_DATA: {
        code: number;
        message: string;
    };
    QUIC_UNENCRYPTED_STREAM_DATA: {
        code: number;
        message: string;
    };
    QUIC_ATTEMPT_TO_SEND_UNENCRYPTED_STREAM_DATA: {
        code: number;
        message: string;
    };
    QUIC_MAYBE_CORRUPTED_MEMORY: {
        code: number;
        message: string;
    };
    QUIC_UNENCRYPTED_FEC_DATA: {
        code: number;
        message: string;
    };
    QUIC_INVALID_RST_STREAM_DATA: {
        code: number;
        message: string;
    };
    QUIC_INVALID_CONNECTION_CLOSE_DATA: {
        code: number;
        message: string;
    };
    QUIC_INVALID_GOAWAY_DATA: {
        code: number;
        message: string;
    };
    QUIC_INVALID_WINDOW_UPDATE_DATA: {
        code: number;
        message: string;
    };
    QUIC_INVALID_BLOCKED_DATA: {
        code: number;
        message: string;
    };
    QUIC_INVALID_STOP_WAITING_DATA: {
        code: number;
        message: string;
    };
    QUIC_INVALID_PATH_CLOSE_DATA: {
        code: number;
        message: string;
    };
    QUIC_INVALID_ACK_DATA: {
        code: number;
        message: string;
    };
    QUIC_INVALID_VERSION_NEGOTIATION_PACKET: {
        code: number;
        message: string;
    };
    QUIC_INVALID_PUBLIC_RST_PACKET: {
        code: number;
        message: string;
    };
    QUIC_DECRYPTION_FAILURE: {
        code: number;
        message: string;
    };
    QUIC_ENCRYPTION_FAILURE: {
        code: number;
        message: string;
    };
    QUIC_PACKET_TOO_LARGE: {
        code: number;
        message: string;
    };
    QUIC_PEER_GOING_AWAY: {
        code: number;
        message: string;
    };
    QUIC_INVALID_STREAM_ID: {
        code: number;
        message: string;
    };
    QUIC_INVALID_PRIORITY: {
        code: number;
        message: string;
    };
    QUIC_TOO_MANY_OPEN_STREAMS: {
        code: number;
        message: string;
    };
    QUIC_TOO_MANY_AVAILABLE_STREAMS: {
        code: number;
        message: string;
    };
    QUIC_PUBLIC_RESET: {
        code: number;
        message: string;
    };
    QUIC_INVALID_VERSION: {
        code: number;
        message: string;
    };
    QUIC_INVALID_HEADER_ID: {
        code: number;
        message: string;
    };
    QUIC_INVALID_NEGOTIATED_VALUE: {
        code: number;
        message: string;
    };
    QUIC_DECOMPRESSION_FAILURE: {
        code: number;
        message: string;
    };
    QUIC_NETWORK_IDLE_TIMEOUT: {
        code: number;
        message: string;
    };
    QUIC_HANDSHAKE_TIMEOUT: {
        code: number;
        message: string;
    };
    QUIC_ERROR_MIGRATING_ADDRESS: {
        code: number;
        message: string;
    };
    QUIC_ERROR_MIGRATING_PORT: {
        code: number;
        message: string;
    };
    QUIC_PACKET_WRITE_ERROR: {
        code: number;
        message: string;
    };
    QUIC_PACKET_READ_ERROR: {
        code: number;
        message: string;
    };
    QUIC_EMPTY_STREAM_FRAME_NO_FIN: {
        code: number;
        message: string;
    };
    QUIC_INVALID_HEADERS_STREAM_DATA: {
        code: number;
        message: string;
    };
    QUIC_HEADERS_STREAM_DATA_DECOMPRESS_FAILURE: {
        code: number;
        message: string;
    };
    QUIC_FLOW_CONTROL_RECEIVED_TOO_MUCH_DATA: {
        code: number;
        message: string;
    };
    QUIC_FLOW_CONTROL_SENT_TOO_MUCH_DATA: {
        code: number;
        message: string;
    };
    QUIC_FLOW_CONTROL_INVALID_WINDOW: {
        code: number;
        message: string;
    };
    QUIC_CONNECTION_IP_POOLED: {
        code: number;
        message: string;
    };
    QUIC_TOO_MANY_OUTSTANDING_SENT_PACKETS: {
        code: number;
        message: string;
    };
    QUIC_TOO_MANY_OUTSTANDING_RECEIVED_PACKETS: {
        code: number;
        message: string;
    };
    QUIC_CONNECTION_CANCELLED: {
        code: number;
        message: string;
    };
    QUIC_BAD_PACKET_LOSS_RATE: {
        code: number;
        message: string;
    };
    QUIC_PUBLIC_RESETS_POST_HANDSHAKE: {
        code: number;
        message: string;
    };
    QUIC_FAILED_TO_SERIALIZE_PACKET: {
        code: number;
        message: string;
    };
    QUIC_TOO_MANY_RTOS: {
        code: number;
        message: string;
    };
    QUIC_HANDSHAKE_FAILED: {
        code: number;
        message: string;
    };
    QUIC_CRYPTO_TAGS_OUT_OF_ORDER: {
        code: number;
        message: string;
    };
    QUIC_CRYPTO_TOO_MANY_ENTRIES: {
        code: number;
        message: string;
    };
    QUIC_CRYPTO_INVALID_VALUE_LENGTH: {
        code: number;
        message: string;
    };
    QUIC_CRYPTO_MESSAGE_AFTER_HANDSHAKE_COMPLETE: {
        code: number;
        message: string;
    };
    QUIC_INVALID_CRYPTO_MESSAGE_TYPE: {
        code: number;
        message: string;
    };
    QUIC_INVALID_CRYPTO_MESSAGE_PARAMETER: {
        code: number;
        message: string;
    };
    QUIC_INVALID_CHANNEL_ID_SIGNATURE: {
        code: number;
        message: string;
    };
    QUIC_CRYPTO_MESSAGE_PARAMETER_NOT_FOUND: {
        code: number;
        message: string;
    };
    QUIC_CRYPTO_MESSAGE_PARAMETER_NO_OVERLAP: {
        code: number;
        message: string;
    };
    QUIC_CRYPTO_MESSAGE_INDEX_NOT_FOUND: {
        code: number;
        message: string;
    };
    QUIC_UNSUPPORTED_PROOF_DEMAND: {
        code: number;
        message: string;
    };
    QUIC_CRYPTO_INTERNAL_ERROR: {
        code: number;
        message: string;
    };
    QUIC_CRYPTO_VERSION_NOT_SUPPORTED: {
        code: number;
        message: string;
    };
    QUIC_CRYPTO_HANDSHAKE_STATELESS_REJECT: {
        code: number;
        message: string;
    };
    QUIC_CRYPTO_NO_SUPPORT: {
        code: number;
        message: string;
    };
    QUIC_CRYPTO_TOO_MANY_REJECTS: {
        code: number;
        message: string;
    };
    QUIC_PROOF_INVALID: {
        code: number;
        message: string;
    };
    QUIC_CRYPTO_DUPLICATE_TAG: {
        code: number;
        message: string;
    };
    QUIC_CRYPTO_ENCRYPTION_LEVEL_INCORRECT: {
        code: number;
        message: string;
    };
    QUIC_CRYPTO_SERVER_CONFIG_EXPIRED: {
        code: number;
        message: string;
    };
    QUIC_CRYPTO_SYMMETRIC_KEY_SETUP_FAILED: {
        code: number;
        message: string;
    };
    QUIC_CRYPTO_MESSAGE_WHILE_VALIDATING_CLIENT_HELLO: {
        code: number;
        message: string;
    };
    QUIC_CRYPTO_UPDATE_BEFORE_HANDSHAKE_COMPLETE: {
        code: number;
        message: string;
    };
    QUIC_CRYPTO_CHLO_TOO_LARGE: {
        code: number;
        message: string;
    };
    QUIC_VERSION_NEGOTIATION_MISMATCH: {
        code: number;
        message: string;
    };
    QUIC_BAD_MULTIPATH_FLAG: {
        code: number;
        message: string;
    };
    QUIC_MULTIPATH_PATH_DOES_NOT_EXIST: {
        code: number;
        message: string;
    };
    QUIC_MULTIPATH_PATH_NOT_ACTIVE: {
        code: number;
        message: string;
    };
    QUIC_IP_ADDRESS_CHANGED: {
        code: number;
        message: string;
    };
    QUIC_CONNECTION_MIGRATION_NO_MIGRATABLE_STREAMS: {
        code: number;
        message: string;
    };
    QUIC_CONNECTION_MIGRATION_TOO_MANY_CHANGES: {
        code: number;
        message: string;
    };
    QUIC_CONNECTION_MIGRATION_NO_NEW_NETWORK: {
        code: number;
        message: string;
    };
    QUIC_CONNECTION_MIGRATION_NON_MIGRATABLE_STREAM: {
        code: number;
        message: string;
    };
    QUIC_TOO_MANY_FRAME_GAPS: {
        code: number;
        message: string;
    };
    QUIC_STREAM_SEQUENCER_INVALID_STATE: {
        code: number;
        message: string;
    };
    QUIC_TOO_MANY_SESSIONS_ON_SERVER: {
        code: number;
        message: string;
    };
    QUIC_LAST_ERROR: {
        code: number;
        message: string;
    };
};
export declare const StreamError: typeof QUICStreamError & object & {
    QUIC_STREAM_NO_ERROR: {
        code: number;
        message: string;
    };
    QUIC_ERROR_PROCESSING_STREAM: {
        code: number;
        message: string;
    };
    QUIC_MULTIPLE_TERMINATION_OFFSETS: {
        code: number;
        message: string;
    };
    QUIC_BAD_APPLICATION_PAYLOAD: {
        code: number;
        message: string;
    };
    QUIC_STREAM_CONNECTION_ERROR: {
        code: number;
        message: string;
    };
    QUIC_STREAM_PEER_GOING_AWAY: {
        code: number;
        message: string;
    };
    QUIC_STREAM_CANCELLED: {
        code: number;
        message: string;
    };
    QUIC_RST_ACKNOWLEDGEMENT: {
        code: number;
        message: string;
    };
    QUIC_REFUSED_STREAM: {
        code: number;
        message: string;
    };
    QUIC_INVALID_PROMISE_URL: {
        code: number;
        message: string;
    };
    QUIC_UNAUTHORIZED_PROMISE_URL: {
        code: number;
        message: string;
    };
    QUIC_DUPLICATE_PROMISE_URL: {
        code: number;
        message: string;
    };
    QUIC_PROMISE_VARY_MISMATCH: {
        code: number;
        message: string;
    };
    QUIC_INVALID_PROMISE_METHOD: {
        code: number;
        message: string;
    };
    QUIC_PUSH_STREAM_TIMED_OUT: {
        code: number;
        message: string;
    };
    QUIC_HEADERS_TOO_LARGE: {
        code: number;
        message: string;
    };
    QUIC_STREAM_LAST_ERROR: {
        code: number;
        message: string;
    };
};
