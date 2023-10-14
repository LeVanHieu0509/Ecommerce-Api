import { FindConditions, LessThanOrEqual, MoreThan, MoreThanOrEqual, ObjectID, getCustomRepository } from "typeorm";
import { TipCommentsRepository } from "../../repositories/tip-js/TipCommentsRepositories";
import { NotFoundError } from "../../../core/error.response";
import TipComments from "../../modules/entities/tip-comment.entity";
import { findProductsRepo } from "../../modules/repos/product.repo";
import { getSelectData } from "../../../ultis";

class CommentServices {
  static async createComment({ productId, userId, content, parentCommentId = null }) {
    const tipCommentRepository = getCustomRepository(TipCommentsRepository);

    //1. check product exists
    const foundProduct = findProductsRepo({ product_id: productId, unSelect: [] });
    if (!foundProduct) throw new NotFoundError("Product not found");

    const newComment = await tipCommentRepository.create({
      comment_content: content,
      comment_parentId: parentCommentId,
      user_food: userId,
      tip_product: productId,
    });

    let rightValue: number;
    if (parentCommentId) {
      const parentComment = await tipCommentRepository.findOne(parentCommentId);
      if (!parentComment) throw new NotFoundError("Parent Comment Not Fount");

      rightValue = parentComment.comment_right;

      await tipCommentRepository.update(
        { tip_product: productId, comment_right: MoreThanOrEqual(rightValue) },
        { comment_right: () => "comment_right + 2" }
      );

      await tipCommentRepository.update(
        { tip_product: productId, comment_left: MoreThan(rightValue) },
        { comment_left: () => "comment_left + 2" }
      );
    } else {
      const maxRightValue = await tipCommentRepository
        .createQueryBuilder("tipComments")
        .select("tipComments.comment_right", "comment_right")
        .where("tipComments.tip_product = :productId", { productId })
        .orderBy("tipComments.comment_right", "DESC")
        .getOne();

      // const maxRightValue = await tipCommentRepository.findOne({
      //     where: { tip_product: productId },
      //     order: { comment_right: "DESC" },
      //     select: getSelectData(["comment_right"]),
      // });

      if (maxRightValue) {
        rightValue = maxRightValue.comment_right + 1;
      } else {
        rightValue = 1;
      }
    }

    newComment.comment_left = rightValue;
    newComment.comment_right = rightValue + 1;

    return await tipCommentRepository.save(newComment);
  }

  static async getCommentsByParentId({
    productId,
    parentCommentId = null,
    limit = 50,
    offset = 0, //skip
  }: any) {
    const tipCommentRepository = getCustomRepository(TipCommentsRepository);

    if (parentCommentId) {
      const parent = await tipCommentRepository.findOne({
        where: { id: parentCommentId },
      });

      if (!parent) throw new NotFoundError("Không tìm thấy parent comment");
      const comments = await tipCommentRepository.find({
        where: {
          tip_product: productId,

          comment_left: MoreThan(parent.comment_left),
          comment_right: LessThanOrEqual(parent.comment_right),
        },

        select: ["comment_left", "comment_right", "comment_content", "comment_parentId"],
        order: { comment_left: "ASC" },
      });

      return comments;
    }

    const comments = await tipCommentRepository.find({
      where: {
        tip_product: productId,
      },
      select: ["comment_left", "comment_right", "comment_content", "comment_parentId"],
      order: { comment_left: "ASC" },
    });

    return comments;
  }

  static async deleteComment({ commentId, productId }) {
    // Muốn xoá được comment thì buộc phải xác định được viền trái và viền phải
    // Độ rộng là bao nhiêu viền
    // Lựa chọn node có giá trị lớn hơn right, nhưng right của node > right delete thì update - width

    //check the product exists in the database
    const tipCommentRepository = getCustomRepository(TipCommentsRepository);

    const foundProduct = findProductsRepo({ product_id: productId, unSelect: [] });
    if (!foundProduct) throw new NotFoundError("Product not found");

    //1. Xac dinh gia tri left va right cua comment can xoa
    const comment = await tipCommentRepository.findOne(commentId);
    if (!comment) throw new NotFoundError("Comment not found");

    const leftValue = comment.comment_left;
    const rightValue = comment.comment_right;

    //2. Tinh width
    const width = rightValue - leftValue + 1;
    //3. Xoa tat ca comment id con

    const deletedItem = await tipCommentRepository.delete({
      tip_product: productId,
      comment_right: LessThanOrEqual(rightValue),
      comment_left: MoreThanOrEqual(leftValue),
    });
    //4. Cap nhat cac gia tri left va right con lai

    await tipCommentRepository.update(
      { tip_product: productId, comment_right: MoreThanOrEqual(rightValue) },
      { comment_right: () => `comment_right - ${width}` }
    );

    await tipCommentRepository.update(
      { tip_product: productId, comment_left: MoreThan(rightValue) },
      { comment_left: () => `comment_left - ${width}` }
    );

    return {
      deletedRow: deletedItem.affected,
    };
  }
}

export default CommentServices;
