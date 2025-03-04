# SmartBites


https://github.com/user-attachments/assets/cc38ba76-ab0f-4d88-a9d8-5f2023eef527



## Introduction

A food delivery web app that allows sellers to post their restaurants and menu and allows customer to order food from restaurants.

The Backend is integrated with : 

-> Kafka with Zookeeper to manage large number of orders at a time

-> Redis is used to cache huge data from and fetch and display them faster in ui.

Text Stack : ReactJS, Java Spring Boot


## Setup Instructions :

### Docker

Run the following docker containers :

Redis Container :

`docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest`

Zookeeper and Kafka Container , run in this order in separate terminals :

Start Zookeper Container and expose PORT 2181.

`docker run -p 2181:2181 zookeeper`

Start Kafka Container, expose PORT 9092 and setup ENV variables.

```bash 

docker run -p 9092:9092 `
-e KAFKA_ZOOKEEPER_CONNECT=<PRIVATE_IP>:2181 `
-e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://<PRIVATE_IP>:9092 `
-e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 `
confluentinc/cp-kafka
```






