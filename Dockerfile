FROM node:22-alpine

# Set working directory
WORKDIR /app

# Install required tools
RUN apk update && apk add --no-cache jq openssl bash

# Copy dependency files first (better cache usage)
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the app (optional if running in prod mode)
RUN yarn build

# Expose NestJS port
EXPOSE 3000

# Add post-deploy script
COPY post_deploy.sh /post_deploy.sh
RUN chmod +x /post_deploy.sh

# Start app
CMD ["/post_deploy.sh"]