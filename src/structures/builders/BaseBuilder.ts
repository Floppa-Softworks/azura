export abstract class BaseBuilder {
	abstract toJSON(): string;
	abstract toString(): string;
	abstract clone(): unknown;
}
