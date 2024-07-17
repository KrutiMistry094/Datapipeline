//Author- Kruti Mistry
//Date- 2024-07-17
//INTP-302 Assignment: Developing Data Pipeline

const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const { Kafka } = require("kafkajs");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const kafka = new Kafka({ clientId: "stock-app", brokers: ["localhost:9092"] });
const consumer = kafka.consumer({ groupId: "stock-group" });

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("New client connected");

  consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const stockData = JSON.parse(message.value.toString());
      console.log(`Emitting: ${stockData.symbol} - $${stockData.price}`);
      socket.emit("stock-data", JSON.stringify(stockData));
    },
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "stock-price", fromBeginning: true });

  server.listen(3001, () => {
    console.log("Listening on port 3001");
  });
};

run().catch(console.error);
