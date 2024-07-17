<!-- Step guide for developing datapipeline using Kafka and docker -->

##Prerequisites
Download Docker, Kafka and Node.js from official websites if not already.

1. Create a directory of your desired name, here i have named 'docker-pipeline.

2. Create a file inside it named 'docker-compose.yml' and write the code to start image zookeeper and kafka.

3. Go to terminal and run command 'docker-compose up -d' in order to compose the zookeeper and kafka images.

4. In order to check if images are created run command 'docker compose ps' and list of images that are created.

5. To double check a new container will be created on your docker desktop with the images that you included in here.

6. Now create a new folder named 'nodeApp' and run command 'npm init y' to install node modules and package.json files.

7. Now in order to install express, socker.io and kafkajs, navigate to your terminal and run command 'npm install express socket.io kafkajs kafka-node'.

8. To double check they are installed, navigate to package.json file and you will be able to see the installed dependencies along with their version.

9. Now we will create the kafka topic by running command "docker exec -it kafka_assignment kafka-topics.sh --create --topic stock-price --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1" in your terminal.
   ##Note: here the term 'kafka_assignment' is name of container and term 'stock-price' is name of topic. Also note that this step can be done right now or in the end.

10. Now create file producer.js and write code that will connect kafka broker and send a random price from 'NNTP' to the 'stock-price' topic every 5 seconds.

11. Create a Consumer.js file inside nodeApp folder and write respective code that will subscribe to "stock-price" topic and log the data received to the console

12. create a new file 'Server.js' inside nodeApp folder and write respective code to setup Express server with Socket.Io for real-time communication(You can use any other real-time communication tool). It serves the 'index.html' file when client is connected to the server.Each message will be parsed and emitted to server when the client is connected via help of Socket.IO . Specify your port here. For me it is on port 3001.

13. Make an 'index.html' file to set up the webpage and display the real-time stock information.

###Steps to run existing project###

1. Navigate to terminal and run 'docker-compose up -d'
2. Then run 'docker-compose ps' to check the running images
3. Then change directory to the folder where producer and server files are.
4. Then run command 'node producer.js' to start producing the values.
5. On another terminal panel run command 'node server.js' to start port and receive data.
6. Navigate to your browser and type 'localhost:3001' and you can see the real-time stock-price updates.
"# Datapipeline" 
