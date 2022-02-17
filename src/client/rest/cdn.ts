import { CDN_URL, VALID_FILE_EXTENSIONS } from "../../lib/constants";
import { FileExtensions } from "../../lib/types";
import { AzuraError } from "../../lib/utils";

export class CDN {
	public avatar(
		userId: string,
		avatarHash: string,
		extension: FileExtensions,
	) {
		if (!VALID_FILE_EXTENSIONS.includes(extension)) {
			throw new AzuraError(
				`The file extension ${extension} is not a valid file extension.`,
			);
		}
		return this.makeUrl(`/users/${userId}/avatars/${avatarHash}`);
	}

	private makeUrl(path: string) {
		return `${CDN_URL}${path}`;
	}
}
