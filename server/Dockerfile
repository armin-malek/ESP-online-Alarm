FROM node:16

# Create app directory
WORKDIR /app

# set timezone
RUN apt-get update && \
    apt-get install -yq tzdata && \
    ln -fs /usr/share/zoneinfo/َAsia/Tehran /etc/localtime && \
    dpkg-reconfigure -f noninteractive tzdata
ENV TZ="Asia/Tehran"

COPY package.json .

# generated prisma files
COPY prisma ./prisma/

# Bundle app source
COPY . .

# COPY ENV variable
#COPY .env .
COPY .env.production .env

RUN npm install
#RUN npm install -g dotenv-cli
# If you are building your code for production
# RUN npm ci --only=production

# Generate Prisma files
RUN npx prisma generate

#EXPOSE 3000

CMD [ "npm", "run", "start" ]