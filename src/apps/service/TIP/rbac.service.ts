import { readFileSync } from "fs";
import { join } from "path";
import { Like, getCustomRepository, getManager } from "typeorm";
import { TipResourceRepository } from "../../repositories/tip-js/TipResourceRepositories";
import { TipRoleRepository } from "../../repositories/tip-js/TipRoleRepositories";

const rol_grants = [
  {
    role: "admin",
    resource: "profile",
    action: "update:any",
    attributes: "*",
  },
  {
    role: "admin",
    resource: "balance",
    action: "update:any",
    attributes: "*, !mount",
  },

  {
    role: "shop",
    resource: "profile",
    action: "update:any",
    attributes: "*",
  },
  {
    role: "shop",
    resource: "balance",
    action: "update:any",
    attributes: "*, !mount",
  },

  {
    role: "user",
    resource: "profile",
    action: "update:any",
    attributes: "*",
  },
  {
    role: "user",
    resource: "balance",
    action: "update:any",
    attributes: "*",
  },
];

//admin có grant => tỏng grant thì chưa 1 list resource

export const createResource = async ({
  name = "profile",
  slug = "p00001",
  description = "",
}: {
  name: string;
  slug: string;
  description: string;
}) => {
  try {
    //1. check name or slug exists
    //2. new resource
    const tipResourceRepository = getCustomRepository(TipResourceRepository);
    const resource = await tipResourceRepository.create({
      src_name: name,
      src_slug: slug,
      src_description: description,
    });
    await tipResourceRepository.save(resource);
    return resource;
  } catch (error) {
    return error;
  }
};

// admin lay
export const resourceList = async ({
  userId = 0,
  limit = 30,
  offset = 0,
  search = "",
}: {
  userId: number;
  limit: number;
  offset: number;
  search: string;
}) => {
  try {
    //1. check admin ? middleware function

    //2. get list of resource
    const tipResourceRepository = getCustomRepository(TipResourceRepository);
    const resources = await tipResourceRepository.find({
      select: ["src_name", "src_slug", "src_description", "createdAt", "id"],
      where: {
        src_name: Like(`%${search}%`),
      },
      take: limit,
      skip: offset,
    });

    return resources;
  } catch (error) {
    return error;
  }
};

export const createRole = async ({
  name = "shop",
  slug = "s00001",
  description = "extend from shop user",
  grants = [],
}) => {
  try {
    //1. check role exists

    //2. nre role
    const tipRoleRepository = getCustomRepository(TipRoleRepository);
    const role = tipRoleRepository.create({
      rol_description: description,
      rol_name: name,
      rol_slug: slug,
      rol_grants: JSON.stringify(grants),
    });

    await tipRoleRepository.save(role);

    return role;
  } catch (error) {
    return error;
  }
};

export const roleList = async ({
  userId = 0,
  limit = 30,
  offset = 0,
  search = "",
}: {
  userId?: number;
  limit?: number;
  offset?: number;
  search?: string;
}) => {
  try {
    const queryScript = readFileSync(join(process.cwd(), "src/sql/query-rabc.sql")).toString();
    const users = await getManager().query(queryScript);

    return users;
  } catch (error) {
    return error;
  }
};
