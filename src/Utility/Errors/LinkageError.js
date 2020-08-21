export default class LinkageError extends Error {
    constructor(msg) {
        this.name = msg;
        super(msg);
    }
}