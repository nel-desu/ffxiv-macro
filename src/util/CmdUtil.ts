
export function commandLength(cmd: string) {
    if (cmd.length <= 0) {
        return length;
    }
    let len = 0;
    for (let i = 0; i < cmd.length; i++) {
        const charCode = cmd.charCodeAt(i);
        len += (charCode >= 32 && charCode < 127) ? 1 : 3;
    }
    return len;
}
