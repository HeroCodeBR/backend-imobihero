import { Kafka, Producer, Consumer } from 'kafkajs';

export class KafkaService {
  private kafka: Kafka;
  private producer: Producer;
  private consumer: Consumer;

  constructor() {
    this.kafka = new Kafka({
      clientId: 'properties-service',
      brokers: [process.env.KAFKA_BROKERS || 'localhost:9092']
    });
    
    this.producer = this.kafka.producer();
    this.consumer = this.kafka.consumer({ 
      groupId: 'properties-service-group' 
    });
  }

  async connect(): Promise<void> {
    await this.producer.connect();
    await this.consumer.connect();
    console.log('✅ Kafka producer and consumer connected');
  }

  async disconnect(): Promise<void> {
    await this.producer.disconnect();
    await this.consumer.disconnect();
    console.log('❌ Kafka producer and consumer disconnected');
  }

  async publishEvent(topic: string, message: any): Promise<void> {
    try {
      await this.producer.send({
        topic,
        messages: [
          {
            value: JSON.stringify(message),
            timestamp: Date.now().toString()
          }
        ]
      });
      console.log(`📤 Event published to topic: ${topic}`, message);
    } catch (error) {
      console.error(`❌ Error publishing event to topic: ${topic}`, error);
      throw error;
    }
  }

  async subscribe(topics: string[], callback: (topic: string, message: any) => void): Promise<void> {
    await this.consumer.subscribe({ topics, fromBeginning: true });
    
    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        try {
          const value = message.value?.toString();
          if (value) {
            const parsedMessage = JSON.parse(value);
            console.log(`📥 Event received from topic: ${topic}`, parsedMessage);
            await callback(topic, parsedMessage);
          }
        } catch (error) {
          console.error(`❌ Error processing message from topic: ${topic}`, error);
        }
      }
    });
  }
}