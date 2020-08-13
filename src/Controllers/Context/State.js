import { ctx } from '../../canvas';

export function push() {
    ctx.save()
}

export function pop() {
    ctx.restore()
}