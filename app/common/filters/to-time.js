export function toTime() {
    return function( time ) {
        return `${time >= 60 && `${Math.floor(time / 60)}:`}${`${100 + time % 60}`.slice(1)}`;
    }
}