import { EntityRepository, Repository } from "typeorm";
import TipNotification from "../../modules/entities/tip-notification.entity";

@EntityRepository(TipNotification)
export class TipNotificationRepository extends Repository<TipNotification> {}
