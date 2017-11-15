# Restart without stopping server.

## How to use.

```
$ git clone git@github.com:wooyaggo/nonstop_server.git
```

then you need to install packages for project and global.

```
$ npm run init
```


## Using

Compile and run.

```
$ tsc
$ node bin
```

TypeScript will compile <code>/src</code> into <code>/bin</code>. 

And run bin/index.js, it will make <code>.restart</code> file for watching restart signal.

## Update without stopping.

Update your code.

For instance, see <code>/src/server.ts:22</code>, update <code>fix</code> variable.

Then compile it.

```
$ tsc
```

Then you update <code>.restart </code>file.

On Linux.

```
$ touch .restart
```

On Windows

```
$ echo "" >> .restart
```

Then server will be restart one by one in order without losing request already in progress.