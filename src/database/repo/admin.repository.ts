import AdminRepoModel from "../../schemas/admin.schema";

export async function findAdminById(id: string) {
  return AdminRepoModel.findOne({
    _id: id,
  });
}
