# mlai website

This file provides guidance to assistants when working with code in this repository.

## Project Overview

This is the MLAI website - a React Router v7 application for a not-for-profit community based in Australia that aims to empower the Australian AI Community.

## Common advice

Add new routes to the `routes.ts` file


use [@TODO.md](@file:mlai-au/TODO.md) as your scratchpad to keep track.

you may use commands like `tree -I 'node_modules' mlai/ mlai-au/` to get an initial overview of the project structure.

# Migration advice

We're migrating `./mlai` to a new repo at `./mlai-au`, this means we'11 migrate page routes one by one to the new stack, from nextjs/vercel, to new standards compatible with wrangler and Cloudflare workers runtime, and react-router v7.

In many cases you should prefer to (first best):

1. Use `cp` (copy) commands and `read_file` (the first 50 lines) on new files to assess imports.
2. `read_file` the old file, then `write_file` the new file with updates applied.

Migration transformations:
- use `~/` instead of `@/` as the root alias

<important>
  Don't do too much at once! You can use
