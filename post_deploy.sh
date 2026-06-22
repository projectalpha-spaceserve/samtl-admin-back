#!/bin/sh
set -e

echo "Running Prisma generate..."
npx prisma generate

echo "Starting NestJS app..."
yarn start:prod