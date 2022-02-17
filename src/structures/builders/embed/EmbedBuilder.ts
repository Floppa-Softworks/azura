import { RawEmbedData } from "../../../lib/types";
import { BaseBuilder } from "../BaseBuilder";
import { timestampSchema, titleSchema } from "./Assertions";

export class EmbedBuilder extends BaseBuilder {
	public data: RawEmbedData;

	public constructor(data: RawEmbedData = {}) {
		super();
		if (data.timestamp != null)
			data.timestamp = new Date(data.timestamp).toISOString();
		this.data = data;
	}

	public get title() {
		return this.data.title ?? "";
	}

	public get timestamp() {
		return this.data.timestamp ?? new Date().toISOString();
	}

	public setTitle(title: string) {
		titleSchema.parse(title);
		this.data.title = title;
	}

	public setTimestamp(date?: Date) {
		const newDate = date ?? new Date();
		timestampSchema.parse(newDate);
		this.data.timestamp = newDate.toISOString();
	}

	public clone() {
		return new EmbedBuilder(this.data);
	}

	public toJSON() {
		return JSON.stringify(this.data);
	}

	public toString() {
		return "[object EmbedBuilder]";
	}
}
