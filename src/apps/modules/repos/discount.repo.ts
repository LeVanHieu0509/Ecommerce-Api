import { unGetSelectData } from "../../../ultis";

export const findAllDiscountCodesUnselect = async ({
  limit = 50,
  page = 1,
  sort = "ctime",
  filter,
  unSelect,
  modal,
}) => {
  const skip = (page - 1) * limit;
  const sortBy = sort === "ctime" ? { _id: -1 } : { id: 1 };
  const documents = await modal.find({
    filter: filter,
    sort: sortBy,
    skip: skip,
    limit: limit,
    unSelect: unGetSelectData(unSelect),
  });

  return documents;
};

export const findAllDiscountCodesSelect = async ({ limit = 50, page = 1, sort = "ctime", filter, select, modal }) => {
  const skip = (page - 1) * limit;
  const sortBy = sort === "ctime" ? { _id: -1 } : { id: 1 };
  const documents = await modal.find({
    filter: filter,
    sort: sortBy,
    skip: skip,
    limit: limit,
    select: select,
  });

  return documents;
};

export const checkDiscountExists = async ({ modal, filter }) => {
  return await modal.findOne(filter);
};
