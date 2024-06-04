import UtilsRepoModel, { IUtilsDocument } from "../../schemas/utils.schema";

export async function getContentsByModuleName(module: string): Promise<IUtilsDocument | any> {
    return UtilsRepoModel.findOne({ module });
}

export async function saveContents(module: string, content: string): Promise<IUtilsDocument | any> {
    return UtilsRepoModel.create({
        module,
        content
    });
}

export async function updateContents(module: string, content: string): Promise<any> {
    return UtilsRepoModel.updateOne({ module }, { content });
}

export async function getAllContents(): Promise<IUtilsDocument[]> {
    return UtilsRepoModel.find().sort({ updatedAt: -1 });
}

export async function deleteModuleContent(module: string): Promise<any> {
    return UtilsRepoModel.deleteOne({ module });
}