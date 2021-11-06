/// <reference types="node" />
import { BufferVisitor } from './common';
import { Frame } from './frame';
import { ConnectionID, PacketNumber, SocketAddress, QuicTags, SessionType } from './protocol';
export declare function parsePacket(bufv: BufferVisitor, packetSentBy: SessionType): Packet;
/** Packet representing a base Packet. */
export declare abstract class Packet {
    static fromBuffer(_bufv: BufferVisitor, _flag?: number, _packetSentBy?: SessionType): Packet;
    flag: number;
    connectionID: ConnectionID;
    sentTime: number;
    constructor(connectionID: ConnectionID, flag: number);
    isReset(): boolean;
    isNegotiation(): boolean;
    isRegular(): boolean;
    valueOf(): {
        connectionID: string;
        flag: number;
    };
    toString(): string;
    abstract byteLen(): number;
    abstract writeTo(bufv: BufferVisitor): BufferVisitor;
}
/** ResetPacket representing a reset Packet. */
export declare class ResetPacket extends Packet {
    static fromBuffer(bufv: BufferVisitor): ResetPacket;
    nonceProof: Buffer;
    packetNumber: PacketNumber | null;
    socketAddress: SocketAddress | null;
    tags: QuicTags;
    constructor(connectionID: ConnectionID, tags: QuicTags);
    valueOf(): {
        connectionID: string;
        flag: number;
        packetNumber: number | null;
        socketAddress: {
            address: string;
            family: string;
            port: number;
        } | null;
        nonceProof: Buffer;
    };
    byteLen(): number;
    writeTo(bufv: BufferVisitor): BufferVisitor;
}
/** NegotiationPacket representing a negotiation Packet. */
export declare class NegotiationPacket extends Packet {
    static fromConnectionID(connectionID: ConnectionID): NegotiationPacket;
    static fromBuffer(bufv: BufferVisitor): NegotiationPacket;
    versions: string[];
    constructor(connectionID: ConnectionID, versions: string[]);
    valueOf(): {
        connectionID: string;
        flag: number;
        versions: string[];
    };
    byteLen(): number;
    writeTo(bufv: BufferVisitor): BufferVisitor;
}
/** RegularPacket representing a regular Packet. */
export declare class RegularPacket extends Packet {
    static fromBuffer(bufv: BufferVisitor, flag: number, packetSentBy: SessionType): RegularPacket;
    packetNumber: PacketNumber;
    version: string;
    nonce: Buffer | null;
    frames: Frame[];
    isRetransmittable: boolean;
    constructor(connectionID: ConnectionID, packetNumber: PacketNumber, nonce?: Buffer | null);
    valueOf(): {
        connectionID: string;
        flag: number;
        version: string;
        packetNumber: number;
        nonce: Buffer | null;
        frames: {
            name: string;
            type: number;
        }[];
    };
    setVersion(version: string): void;
    setPacketNumber(packetNumber: PacketNumber): void;
    needAck(): boolean;
    parseFrames(bufv: BufferVisitor): void;
    addFrames(...frames: Frame[]): this;
    headerLen(): number;
    byteLen(): number;
    writeTo(bufv: BufferVisitor): BufferVisitor;
}
