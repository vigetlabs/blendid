FROM node:4.6.1
MAINTAINER You <your_email@example.dom>

RUN mkdir /app

WORKDIR /app

COPY package.json ./

RUN ["npm", "install"]

COPY karma.conf.js ./
COPY gulpfile.js/ ./gulpfile.js

# If you don't plan to deploy this container to production, you can comment this line out, and instead just mount src and public as volumes.
COPY src/ ./src

CMD ["npm", "run", "gulp", "production"]
