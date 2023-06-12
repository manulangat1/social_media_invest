FROM node:18-alphine

ENV description = This is a pipeline for the  social media cum online funndraising platform 

ENV author = Emmanuel Langat 

ENV author_email = emmanuelthedeveloper@gmail.com 


WORKDIR /app 

COPY package*.json /app/   

RUN npm install  

COPY . . 

CMD [ "npm" , "run" , "start:dev"]