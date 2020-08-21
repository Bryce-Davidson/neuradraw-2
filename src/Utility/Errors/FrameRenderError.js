export default class FrameRenderError extends Error {
    constructor(msg) {
        this.name = "FrameRenderError";
        super(msg);
    }
}