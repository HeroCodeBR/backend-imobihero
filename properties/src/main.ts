import { ExpressAdapter } from './infra/http/express';
import swagger from './infra/swagger';
// import { KafkaService } from './infra/kafka/kafkaService';

console.log('🏠 Properties Microservice is starting...');

const httpServer = new ExpressAdapter();
const port = (process.env.PORT as unknown as number) || 3334;

// Initialize Kafka - Disabled for now
// const kafkaService = new KafkaService();
// kafkaService.connect().then(() => {
//   console.log('📨 Kafka connected successfully');
// }).catch(error => {
//   console.error('❌ Kafka connection failed:', error);
// });

httpServer.listen(port);
swagger(httpServer.app);

console.log(`🚀 Properties Microservice running on port ${port}`);