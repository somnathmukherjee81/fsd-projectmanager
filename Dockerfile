# --- BASE ---
FROM node:8-alpine AS base

# Set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# Copy files to working directory
COPY package.json .

# Install dependencies
RUN npm install
RUN npm install -g @angular/cli@6.0.8

# Copy all files
COPY . .
EXPOSE 8080

# Start the app
CMD [ "ng", "serve" ]
