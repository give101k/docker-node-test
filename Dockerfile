FROM node:10.13-alpine
RUN mkdir -p /code
WORKDIR /code
ADD . /code
RUN npm install -g -s --no-progress yarn && \
	yarn && \
	#yarn run build && \
	#yarn run prune && \
	yarn cache clean
CMD [ "yarn", "start" ]
EXPOSE 3001