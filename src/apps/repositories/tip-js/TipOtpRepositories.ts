import { EntityRepository, Repository } from "typeorm";
import { TipOtp } from "../../modules/entities/otp.entity";

@EntityRepository(TipOtp)
export class TipOtpRepository extends Repository<TipOtp> {}
