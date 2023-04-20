async function move(key,destKey,overwrite,version,ifVersion) {
    const entry = this.getEntry(key,{versions:true});
    if(!entry) throw new Error(`Cannot move ${key} to ${destKey} because ${key} does not exist`);
    if(ifVersion && entry.version!==ifVersion) return false;
    if(!overwrite && this.get(destKey)!==undefined) throw new Error(`Cannot move ${key} to ${destKey} because ${destKey} already exists`);
    let result;
    await this.transaction(async () => {
        result = this.put(destKey,entry.value,version);
        if(!result) throw new Error(`Failed to copy value from ${key} when moving to ${destKey}`);
        result = this.remove(key,ifVersion);
        if(!result) throw new Error(`Failed to remove original when moving ${key} to ${destKey}`);
    })
    return result;
}

import {withExtensions} from "lmdb-extend";

export {move as default,move,withExtensions};