FROM resin/imx6ul-var-dart-debian

RUN curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
RUN apt-get install -y nodejs
RUN apt-get install -y build-essential

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
