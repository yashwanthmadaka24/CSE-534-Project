'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
// **Github:** https://github.com/fidm/quic
//
// **License:** MIT
// https://github.com/lucas-clemente/quic-go/blob/master/internal/protocol/server_parameters.go
// MinRemoteIdleTimeout is the minimum value that we accept for the remote idle timeout
exports.MinRemoteIdleTimeout = 1000 * 5;
// DefaultIdleTimeout is the default idle timeout
exports.DefaultIdleTimeout = 1000 * 30;
// DefaultHandshakeTimeout is the default timeout for a connection until the crypto handshake succeeds.
exports.DefaultHandshakeTimeout = 1000 * 10;
// ClosedSessionDeleteTimeout the server ignores packets arriving on a connection that is already closed
// after this time all information about the old connection will be deleted
exports.ClosedSessionDeleteTimeout = 1000 * 60;
// MaxIdleTimeout is the max idle timeout
exports.MaxIdleTimeout = 10 * 60 * 1000;
// MaxIdleTimeoutServer is the maximum idle timeout that can be negotiated, for the server
exports.MaxIdleTimeoutServer = 1 * 60 * 1000;
exports.MaxStreamWaitingTimeout = 30 * 1000;
// The PING frame should be used to keep a connection alive when a stream is open.
// The default is to do this after 15 seconds of quiescence, which is much shorter than most NATs time out.
exports.PingFrameDelay = 15 * 1000;
// MaxOffset is the maximum value of a ByteCount
exports.MaxOffset = Number.MAX_SAFE_INTEGER; // 1<<62 - 1?
// MaxReceivePacketSize maximum packet size of any QUIC packet, based on
// ethernet's max size, minus the IP and UDP headers. IPv6 has a 40 byte header,
// UDP adds an additional 8 bytes.  This is a total overhead of 48 bytes.
// Ethernet's max packet size is 1500 bytes,  1500 - 48 = 1452.
//
// MaxPacketSizeIPv4 is the maximum packet size that we use for sending IPv4 packets.
exports.MaxPacketSizeIPv4 = 1252;
// MaxPacketSizeIPv6 is the maximum packet size that we use for sending IPv6 packets.
exports.MaxPacketSizeIPv6 = 1232;
exports.MaxReceivePacketSize = 1452;
exports.MaxStreamReadCacheSize = 1024 * 1024 * 2; // todo
// ----------
// DefaultTCPMSS is the default maximum packet size used in the Linux TCP implementation.
// Used in QUIC for congestion window computations in bytes.
exports.DefaultTCPMSS = 1460;
// MinClientHelloSize is the minimum size the server expects an inchoate CHLO to have (in gQUIC)
exports.MinClientHelloSize = 1024;
// MinInitialPacketSize is the minimum size an Initial packet (in IETF QUIC) is required to have.
exports.MinInitialPacketSize = 1200;
// MaxClientHellos is the maximum number of times we'll send a client hello
// The value 3 accounts for:
// * one failure due to an incorrect or missing source-address token
// * one failure due the server's certificate chain being unavailable
// and the server being unwilling to send it without a valid source-address token
exports.MaxClientHellos = 3;
// NonForwardSecurePacketSizeReduction is the number of bytes a non forward-secure packet has to be smaller than a forward-secure packet
// This makes sure that those packets can always be retransmitted without splitting the contained StreamFrames
exports.NonForwardSecurePacketSizeReduction = 50;
// DefaultMaxCongestionWindow is the default for the max congestion window
exports.DefaultMaxCongestionWindow = 1000;
// InitialCongestionWindow is the initial congestion window in QUIC packets
exports.InitialCongestionWindow = 32;
// MaxUndecryptablePackets limits the number of undecryptable packets that a
// session queues for later until it sends a public reset.
exports.MaxUndecryptablePackets = 10;
// PublicResetTimeout is the time to wait before sending a Public Reset when receiving too many undecryptable packets during the handshake
// This timeout allows the Go scheduler to switch to the Go rountine that reads the crypto stream and to escalate the crypto
exports.PublicResetTimeout = 500; // ms
// ReceiveStreamWindow is the stream-level flow control window for receiving data
// This is the value that Google servers are using
exports.ReceiveStreamWindow = (1 << 10) * 32; // 32 kB
// ReceiveConnectionWindow is the connection-level flow control window for receiving data
// This is the value that Google servers are using
exports.ReceiveConnectionWindow = (1 << 10) * 48; // 48 kB
// DefaultMaxReceiveStreamWindowServer is the default maximum stream-level flow control window for receiving data, for the server
// This is the value that Google servers are using
exports.DefaultMaxReceiveStreamWindowServer = 1 * (1 << 20); // 1 MB
// DefaultMaxReceiveConnectionWindowServer is the default connection-level flow control window for receiving data, for the server
// This is the value that Google servers are using
exports.DefaultMaxReceiveConnectionWindowServer = 1.5 * (1 << 20); // 1.5 MB
// DefaultMaxReceiveStreamWindowClient is the default maximum stream-level flow control window for receiving data, for the client
// This is the value that Chromium is using
exports.DefaultMaxReceiveStreamWindowClient = 6 * (1 << 20); // 6 MB
// DefaultMaxReceiveConnectionWindowClient is the default connection-level flow control window for receiving data, for the client
// This is the value that Google servers are using
exports.DefaultMaxReceiveConnectionWindowClient = 15 * (1 << 20); // 15 MB
// ConnectionFlowControlMultiplier determines how much larger the connection flow control windows
// needs to be relative to any stream's flow control window
// This is the value that Chromium is using
exports.ConnectionFlowControlMultiplier = 1.5;
// WindowUpdateThreshold is the fraction of the receive window that has to be consumed before an higher offset is advertised to the client
exports.WindowUpdateThreshold = 0.25;
// DefaultMaxIncomingStreams is the maximum number of streams that a peer may open
exports.DefaultMaxIncomingStreams = 100;
// DefaultMaxIncomingUniStreams is the maximum number of unidirectional streams that a peer may open
exports.DefaultMaxIncomingUniStreams = 100;
// MaxStreamsMultiplier is the slack the client is allowed for the maximum number of streams per connection,
// needed e.g. when packets are out of order or dropped. The minimum of this procentual increase and
// the absolute increment specified by MaxStreamsMinimumIncrement is used.
exports.MaxStreamsMultiplier = 1.1;
// MaxStreamsMinimumIncrement is the slack the client is allowed for the maximum number of
// streams per connection, needed e.g. when packets are out of order or dropped. The minimum of this
// absolute increment and the procentual increase specified by MaxStreamsMultiplier is used.
exports.MaxStreamsMinimumIncrement = 10;
// MaxSessionUnprocessedPackets is the max number of packets stored in each session that are not yet processed.
exports.MaxSessionUnprocessedPackets = exports.DefaultMaxCongestionWindow;
// SkipPacketAveragePeriodLength is the average period length in which one packet number is skipped to prevent an Optimistic ACK attack
// export const SkipPacketAveragePeriodLength = 500
// MaxTrackedSkippedPackets is the maximum number of skipped packet numbers
// the SentPacketHandler keep track of for Optimistic ACK attack mitigation
exports.MaxTrackedSkippedPackets = 10;
// MaxOutstandingSentPackets is maximum number of packets saved for retransmission.
// When reached, it imposes a soft limit on sending new packets:
// Sending ACKs and retransmission is still allowed, but now new regular packets can be sent.
exports.MaxOutstandingSentPackets = 2 * exports.DefaultMaxCongestionWindow;
// MaxTrackedSentPackets is maximum number of sent packets saved for retransmission.
// When reached, no more packets will be sent.
// This value *must* be larger than MaxOutstandingSentPackets.
exports.MaxTrackedSentPackets = exports.MaxOutstandingSentPackets * 5 / 4;
// MaxTrackedReceivedAckRanges is the maximum number of ACK ranges tracked
exports.MaxTrackedReceivedAckRanges = exports.DefaultMaxCongestionWindow;
// MaxNonRetransmittableAcks is the maximum number of packets containing an ACK, but no retransmittable frames, that we send in a row
exports.MaxNonRetransmittableAcks = 19;
// MaxStreamFrameSorterGaps is the maximum number of gaps between received StreamFrames
// prevents DoS attacks against the streamFrameSorter
exports.MaxStreamFrameSorterGaps = 1000;
// CryptoMaxParams is the upper limit for the number of parameters in a crypto message.
// Value taken from Chrome.
exports.CryptoMaxParams = 128;
// CryptoParameterMaxLength is the upper limit for the length of a parameter in a crypto message.
exports.CryptoParameterMaxLength = 4000;
// EphermalKeyLifetime is the lifetime of the ephermal key during the handshake, see handshake.getEphermalKEX.
exports.EphermalKeyLifetime = 1000 * 60;
// NumCachedCertificates is the number of cached compressed certificate chains, each taking ~1K space
exports.NumCachedCertificates = 128;
// MinStreamFrameSize is the minimum size that has to be left in a packet, so that we add another STREAM frame.
// This avoids splitting up STREAM frames into small pieces, which has 2 advantages:
// 1. it reduces the framing overhead
// 2. it reduces the head-of-line blocking, when a packet is lost
exports.MinStreamFrameSize = 128;
//# sourceMappingURL=constant.js.map