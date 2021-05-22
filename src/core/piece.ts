import Movement from './movement'
import Chess from './chess'

export default class Piece {
    pieceType: string;
    color: string;

    constructor(pieceType: string, color: string) {
        this.pieceType = pieceType;
        this.color = color;
    }

    private __getPawnCaptureMovements(x: number, y: number, chess: Chess) {
        const movements: Movement[] = [];
        const piece = this;

        if (piece.color === 'white') {
            if (
                chess.isAValidPosition(x + 1, y + 1) &&
                    chess.getPiece(x + 1, y + 1) &&
                    chess.getPiece(x + 1, y + 1).color === 'black'
            ) {
                movements.push({
                    x: x + 1,
                    y: y + 1,
                });
            }

            if (
                chess.isAValidPosition(x - 1, y + 1) &&
                    chess.getPiece(x - 1, y + 1) &&
                    chess.getPiece(x - 1, y + 1).color === 'black'
            ) {
                movements.push({
                    x: x - 1,
                    y: y + 1,
                });
            }
        }

        if (piece.color === 'black') {
            if (
                chess.isAValidPosition(x - 1, y - 1) &&
                    chess.getPiece(x - 1, y - 1) &&
                    chess.getPiece(x - 1, y - 1).color === 'white'
            ) {
                movements.push({
                    x: x - 1,
                    y: y - 1,
                });
            }

            if (
                chess.isAValidPosition(x + 1, y - 1) &&
                    chess.getPiece(x + 1, y - 1) &&
                    chess.getPiece(x + 1, y - 1).color === 'white'
            ) {
                movements.push({
                    x: x + 1,
                    y: y - 1,
                });
            }
        }

        return movements;
    }


    private __getPawnMovements(x: number, y: number, chess: Chess) {
        const pawnMovements = this.__getPawnMoveMovements(x, y, chess);
        const captureMovements = this.__getPawnCaptureMovements(x, y, chess);
        const allPawnMovements = pawnMovements.concat(captureMovements);

        return allPawnMovements;
    }

    private __getKingMovements(x: number, y: number, chess: Chess) {
        const kingMovements = this.__getKingMoveMovements(x, y, chess);
        const captureMovements = this.__getKingCaptureMovements(x, y, chess);
        const allKingMovements = kingMovements.concat(captureMovements);

        return allKingMovements;
    }


    private __getKingMoveMovements(x: number, y: number, chess: Chess) {
        const movements: Movement[] = [];

        const kingPossibleMovs = [
            { x: x, y: y + 1 },
            { x: x - 1, y: y + 1 },
            { x: x - 1, y: y },
            { x: x - 1, y: y - 1 },
            { x: x, y: y - 1 },
            { x: x + 1, y: y - 1 },
            { x: x + 1, y: y },
            { x: x + 1, y: y + 1 },
        ];

        kingPossibleMovs.forEach((possibleMov) =>
            this.__addIfValidMovement(possibleMov.x, possibleMov.y, movements, chess));

        return movements;
    }

    private __getKingCaptureMovements(x: number, y: number, chess: Chess) {
        const movements: Movement[] = [];
        const pieceThatCaptures = this;

        const kingPossibleCaptures = [
            { x: x, y: y + 1 },
            { x: x - 1, y: y + 1 },
            { x: x - 1, y: y },
            { x: x - 1, y: y - 1 },
            { x: x, y: y - 1 },
            { x: x + 1, y: y - 1 },
            { x: x + 1, y: y },
            { x: x + 1, y: y + 1 },
        ];

        kingPossibleCaptures.forEach((possibleCapture) =>
            this.__addIfValidCapture(
                possibleCapture.x,
                possibleCapture.y,
                movements,
                pieceThatCaptures,
                chess
            ));

        return movements;
    }

    private __getPawnMoveMovements(x: number, y: number, chess: Chess) {
        const piece = this;
        const movements: Movement[] = [];

        if (piece.color === 'white') {
            this.__addIfValidMovement(x, y + 1, movements, chess);

            if (y === 1 && !chess.hasPiece(x, y + 1)) {
                this.__addIfValidMovement(x, y + 2, movements, chess);
            }
        }

        if (piece.color === 'black') {
            this.__addIfValidMovement(x, y - 1, movements, chess);

            if (y === 6 && !chess.hasPiece(x, y - 1)) {
                this.__addIfValidMovement(x, y - 2, movements, chess);
            }
        }

        return movements;
    }

    private __addIfValidMovement(x: number, y: number, movements: Movement[], chess: Chess) {
        if (!chess.hasPiece(x, y) && chess.isAValidPosition(x, y)) {
            movements.push({ x: x, y: y });
        }
    }

    private __addIfValidCapture(
        x: number,
        y: number,
        movements: Movement[],
        pieceThatCaptures: Piece,
        chess: Chess
    ) {
        const hasPiece = chess.hasPiece(x, y);
        const isAValidPosition = chess.isAValidPosition(x, y);
        const pieceToCapture = chess.getPiece(x, y);

        if (
            hasPiece &&
                isAValidPosition &&
                pieceThatCaptures.color !== pieceToCapture.color
        ) {
            movements.push({ x: x, y: y });
        }
    }

    getMovements(x: number, y: number, chess: Chess) {
        switch (this.pieceType) {
            case 'king':
                return this.__getKingMovements(x, y, chess);

            case 'pawn':
                return this.__getPawnMovements(x, y, chess);

            case 'doge':
                return [];
        }
    }
}
