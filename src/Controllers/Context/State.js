import { ctx } from '../../Meta/canvas';

export function push() {
    ctx.save()
}

export function pop() {
    ctx.restore()
}