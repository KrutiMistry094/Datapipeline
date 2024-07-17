//producer.js
const { Kafka } = require("kafkajs");
const kafka = new Kafka({ clientId: "stock-app", brokers: ["localhost:9092"] });
const producer = kafka.producer();

const run = async () => {
  await producer.connect();
  setInterval(async () => {
    const price = (Math.random() * (200 - 100) + 100).toFixed(2);
    await producer.send({
      topic: "stock-price",
      messages: [{ value: JSON.stringify({ symbol: "NNTP", price }) }],
    });
    console.log(`Sent: ${price}`);
  }, 5000);
};

run().catch(console.error);
