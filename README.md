# lmdb-move
Moves one LMDB key value to another, i.e. renames, within the scope of a transaction

# Installation

```bash
npm install lmdb-move
```

# Usage

```javascript
import {open} from "lmdb";
import {withExtensions} from "lmdb-move";

const db = withExtensions(open("test"));
await db.put("key1","value1");
await db.move("key1","key2");
```

## API

### async db.move(key:lmdbKey,destKey:lmdbKey,?overwrite:boolean,?version:number,?ifVersion:number) - returns boolean

Moves the value at `key` to `destKey` with the optional `version`. If `overwrite` is `true` and `destKey` already exists, it will be overwritten. Otherwise, an Error is thrown. If `key` does not exist an Error is thrown. If optional `ifVersion` does not match current version, the function returns `false`.

### withExtensions(db:lmdbDatabase,extensions:object) - returns lmdbDatabase`

Extends an LMDB database and any child databases it opens to have the `extensions` provided as well as any child databases it opens. This utility is common to other `lmdb` extensions like `lmdb-patch`, `lmdb-copy`, `lmdb-move`.

# Testing

Unit testing is conducted with Jest.

File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------|---------|----------|---------|---------|-------------------
All files |   66.66 |    57.14 |     100 |     100 |
index.js |   66.66 |    57.14 |     100 |     100 | 3-11


# Release Notes (Reverse Chronological Order)

2023-04-27 v0.1.2 Simplified use of `withExtensions`.

2023-04-24 v0.1.1 Documentation formatting.

2023-04-20 v0.1.0 Now throws if key does not exist to move.

2023-04-19 v0.0.1 Initial public release
