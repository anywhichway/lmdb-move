import {open}  from "lmdb";
import {move,withExtensions} from "./index.js";

const db = withExtensions(open("test",{create:true,useVersions:true}),{move});

test("move",async () => {
    await db.put("hello","world");
    expect(await db.move("hello","goodbye")).toBe(true);
    expect(db.get("hello")).toBeUndefined();
    expect(db.get("goodbye")).toBe("world");
})