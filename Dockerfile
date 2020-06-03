FROM ubuntu:latest
RUN mkdir SlackBot && \
    apt update && \
    apt install nodejs -y && \
    apt install npm -y && \
    npm install -g typescript
WORKDIR /SlackBot
COPY . /SlackBot
RUN chmod +x ./start.sh
ENTRYPOINT ["/settings/start.sh"]