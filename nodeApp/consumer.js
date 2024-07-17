//consumer.js
const { Kafka } = require("kafkajs");
const kafka = new Kafka({ clientId: "stock-app", brokers: ["localhost:9092"] });
const consumer = kafka.consumer({ groupId: "stock-group" });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "stock-price", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const stockData = JSON.parse(message.value.toString());
      console.log(`Received: ${stockData.symbol} - $${stockData.price}`);
      
    },
  });
};

run().catch(console.error);
