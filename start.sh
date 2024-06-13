#!/bin/sh

cd frontend
npm run dev &
cd ..
bun run --hot backend.js

