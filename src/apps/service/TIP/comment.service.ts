import { FindConditions, LessThanOrEqual, MoreThan, MoreThanOrEqual, ObjectID, getCustomRepository } from "typeorm";
import { TipCommentsRepository } from "../../repositories/tip-js/TipCommentsRepositories";
import { NotFoundError } from "../../../core/error.response";
import TipComments from "../../modules/entities/tip-comment.entity";

class CommentServices {


    static async createComment({ productId, userId, content, parentCommentId = null }) {
        const tipCommentRepository = getCustomRepository(TipCommentsRepository);

        const newComment = await tipCommentRepository.create({
            comment_content: content,
            comment_parentId: parentCommentId,
            user_food: userId,
            tip_product: productId,
        });

        let rightValue: number;
        if (parentCommentId) {
            const parentComment = await tipCommentRepository.findOne(parentCommentId)
            if (!parentComment) throw new NotFoundError("Parent Comment Not Fount");

            rightValue = parentComment.comment_right //10
            console.log("rightValue1", rightValue)

            await tipCommentRepository.update(
                { tip_product: productId, comment_right: MoreThanOrEqual(rightValue) },
                { comment_right: () => "comment_right + 2" }
            );

            await tipCommentRepository.update(
                { tip_product: productId, comment_left: MoreThan(rightValue) },
                { comment_left: () => "comment_left + 2" }
            );
        } else {
            const maxRightValue = await tipCommentRepository.createQueryBuilder('tipComments')
                .select('tipComments.comment_right', 'comment_right')
                .where('tipComments.tip_product = :productId', { productId })
                .orderBy('tipComments.comment_right', 'DESC')
                .getOne();

            // const maxRightValue = await tipCommentRepository.findOne({
            //     where: { tip_product: productId },
            //     order: { comment_right: "DESC" },
            //     select: ["comment_right"],
            // });

            if (maxRightValue) {
                rightValue = maxRightValue.comment_right + 1
            }
            else {
                rightValue = 1;
            }
        }

        newComment.comment_left = rightValue;
        newComment.comment_right = rightValue + 1;

        const res = await tipCommentRepository.save(newComment);

        return res;
    }

    static async getCommentsByParentId({
        productId,
        parentCommentId = null,
        limit = 50,
        offset = 0 //skip
    }: any) {
        const tipCommentRepository = getCustomRepository(TipCommentsRepository);
        console.log("productId", productId)
        console.log("parentCommentId", parentCommentId)

        if (parentCommentId) {
            const parent = await tipCommentRepository.findOne({
                where: { id: parentCommentId }
            })

            if (!parent) throw new NotFoundError("Không tìm thấy parent comment");
            const comments = await tipCommentRepository.find({
                where: {
                    tip_product: productId,

                    comment_left: MoreThan(parent.comment_left),
                    comment_right: LessThanOrEqual(parent.comment_right),
                },
                select: ["comment_left", "comment_right", "comment_content", "comment_parentId"],
                order: { comment_left: "ASC" },
            })

            return comments
        }

        const comments = await tipCommentRepository.find({
            where: {
                tip_product: productId,

            },
            select: ["comment_left", "comment_right", "comment_content", "comment_parentId"],
            order: { comment_left: "ASC" },
        })
        return comments
    }
}

export default CommentServices