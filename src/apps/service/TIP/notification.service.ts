import { getCustomRepository } from "typeorm";
import { TipCommentsRepository } from "../../repositories/tip-js/TipCommentsRepositories";
import { TipNotificationRepository } from "../../repositories/tip-js/TipNotiRepositories";

export const pushNotiToSystem = async ({
    type = 'SHOP-001',
    receivedId = 1,
    senderId = 1,
    options = {}
}) => {
    let noti_content: string;
    const tipNotification = getCustomRepository(TipNotificationRepository);

    switch (type) {
        case "SHOP-001":
            noti_content = " @@@ vừa đặt thêm một sản phẩm: @@@"
            break;
        case "PROMOTION-001":
            noti_content = " @@@ vừa thêm mới một voucher: @@@"
            break;

        default:
            break;
    }

    const newNoti = await tipNotification.create({
        noti_content: noti_content,
        noti_receivedId: receivedId,
        noti_senderId: senderId,
        noti_type: type,
        noti_options: JSON.stringify(options)
    })

    const result = await tipNotification.save(newNoti);

    return result
}

export const listNotiByUser = async ({
    userId = 1,
    type = "ALL",
    isRead = 0
}) => {
    const tipNotification = getCustomRepository(TipNotificationRepository);
    const match = {
        noti_receivedId: userId
    }

    if (type !== "ALL") {
        match['noti_type'] = type
    }

    return await tipNotification
        .createQueryBuilder('tipNotification')
        .where(match)
        // .groupBy('tipNotification.noti')
        .select('id')
        .addSelect('noti_type')
        .addSelect('noti_senderId')
        .addSelect('noti_receivedId')
        .addSelect('noti_content')
        .addSelect('noti_options')
        .addSelect('createdAt')
        .getRawMany();

}