import { APP_CONFIG } from "@/types/common.constant";

export function buildAssetPath(
    assetPath: string,
    basePath: string = APP_CONFIG.basePath,
): string {
    return `${basePath}${assetPath}`;
}
