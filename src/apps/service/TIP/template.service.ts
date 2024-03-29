import { getCustomRepository } from "typeorm";
import htmlEmailToken from "../../../ultis/tem.html";
import { TipTemplateRepository } from "../../repositories/tip-js/TipTemplateRepositorie";

const newTemplate = async ({ tem_name, tem_html }) => {
  const tipTemplateRepository = getCustomRepository(TipTemplateRepository);

  //1. check if template exits

  const newToken = await tipTemplateRepository.create({
    tem_name, //unique name
    tem_html: htmlEmailToken,
  });

  const result = await tipTemplateRepository.save(newToken);

  return result;
};

// Module nào sẽ đảm nhiệm trách nhiệm riêng cho từng function
const getTemplate = async ({ tem_name }) => {
  const tipTemplateRepository = getCustomRepository(TipTemplateRepository);

  const template = await tipTemplateRepository.findOne({ tem_name });

  return template;
};

export { getTemplate, newTemplate };
