import { Collection } from "collection-data";

export abstract class BaseCache<T, K> extends Collection<T, K> {
	abstract fetch(id: string): unknown;
}
