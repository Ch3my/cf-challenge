FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Add this ARG instruction
ARG VITE_API_URL

# Make the ARG available as an ENV during the build (important for Vite)
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]
EXPOSE 4173