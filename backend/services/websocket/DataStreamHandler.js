/**
 * Data Stream Handler
 * Handles incoming tick data from Angel One WebSocket
 * Forwards raw data to frontend (no parsing - frontend handles it)
 */

import { createLogger } from '../../utils/logger.js';

const logger = createLogger('DataStreamHandler');

class DataStreamHandler {
    constructor(socketIOServer) {
        this.socketIO = socketIOServer;
        this.tickCount = 0;
        this.lastTickTime = null;
    }

    /**
     * Handle incoming tick data from WebSocket
     * Simply forwards raw data to frontend via Socket.IO
     * @param {any} tickData - Raw tick data from Angel One
     */
    handleTickData(tickData) {
        try {
            // Update stats
            this.tickCount++;
            this.lastTickTime = Date.now();

            // Log tick info (only every 10 ticks to avoid spam)
            if (this.tickCount % 10 === 0) {
                logger.debug(`Processed ${this.tickCount} ticks`, {
                    type: typeof tickData,
                    hasContent: !!tickData?.content,
                    isBuffer: tickData instanceof Buffer,
                    isArray: Array.isArray(tickData)
                });
            }

            // Forward raw data to all connected Socket.IO clients
            // Frontend's stockDataParser.js will parse it
            if (this.socketIO) {
                this.socketIO.emit('tick_data', tickData);
            }

        } catch (error) {
            logger.error('Error handling tick data:', error);
        }
    }

    /**
     * Handle WebSocket errors
     */
    handleError(error) {
        logger.error('WebSocket Error:', error);

        if (this.socketIO) {
            this.socketIO.emit('websocket_error', {
                message: error.message || 'WebSocket error occurred',
                timestamp: Date.now()
            });
        }
    }

    /**
     * Handle WebSocket disconnection
     */
    handleDisconnect() {
        logger.warn('WebSocket disconnected');

        if (this.socketIO) {
            this.socketIO.emit('websocket_disconnected', {
                timestamp: Date.now()
            });
        }
    }

    /**
     * Get statistics
     */
    getStats() {
        return {
            tickCount: this.tickCount,
            lastTickTime: this.lastTickTime,
            uptime: this.lastTickTime ? Date.now() - this.lastTickTime : 0
        };
    }

    /**
     * Reset statistics
     */
    resetStats() {
        this.tickCount = 0;
        this.lastTickTime = null;
        logger.info('Statistics reset');
    }
}

export default DataStreamHandler;
