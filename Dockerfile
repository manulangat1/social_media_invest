FROM node:18-alpine

ENV description = This is a pipeline for the  social media cum online funndraising platform 

ENV author = Emmanuel Langat 

ENV author_email = emmanuelthedeveloper@gmail.com 


WORKDIR /app 

COPY package*.json /app/   

RUN npm install  -f

COPY . . 

EXPOSE 3000

CMD [ "npm" , "run" , "start:dev"]