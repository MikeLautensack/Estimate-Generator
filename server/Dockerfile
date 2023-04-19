FROM node:19

WORKDIR /app/

COPY package*.json .

RUN npm i

COPY  . .

EXPOSE 9000

ENV secret=13646382927
ENV Mongo_URL='mongodb+srv://MikeL:lillyandlexy@estimate-generator.rrescsi.mongodb.net/Estimate-Generator?retryWrites=true&w=majority'
ENV PORT=9000

CMD ["node", "index.js"]