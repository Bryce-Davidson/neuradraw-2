export default class TweenError extends Error {
    constructor(msg) {
        this.name = "TweenError";
        super(msg);
    }
}