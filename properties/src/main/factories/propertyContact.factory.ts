import { PropertyContactUseCase } from '@/app/usecases/propertyContact.usecase';
import { PropertyContactRepositoryPrisma } from '@/infra/repositories/propertyContact.repository';
import { PropertyRepositoryPrisma } from '@/infra/repositories/property.repository';
import { KafkaService } from '@/infra/kafka/kafkaService';
import { EmailService } from '@/infra/email/emailService';

export const makePropertyContactFactory = () => {
  const propertyContactRepository = new PropertyContactRepositoryPrisma();
  const propertyRepository = new PropertyRepositoryPrisma();
  const kafkaService = new KafkaService();
  const emailService = new EmailService();
  
  const propertyContactUseCase = new PropertyContactUseCase(
    propertyContactRepository,
    propertyRepository,
    kafkaService,
    emailService
  );
  
  return propertyContactUseCase;
};