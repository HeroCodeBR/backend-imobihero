import { PropertyUseCase } from '@/app/usecases/property.usecase';
import { PropertyRepositoryPrisma } from '@/infra/repositories/property.repository';
import { KafkaService } from '@/infra/kafka/kafkaService';

export const makePropertyFactory = () => {
  const propertyRepository = new PropertyRepositoryPrisma();
  const kafkaService = new KafkaService();
  const propertyUseCase = new PropertyUseCase(propertyRepository, kafkaService);
  return propertyUseCase;
};