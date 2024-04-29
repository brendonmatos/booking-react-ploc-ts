export class Observable <T> {
	private listeners: { callback: (event: T) => void }[];

	constructor () {
		this.listeners = [];
	}

	register (callback: (event: T) => void) {
		this.listeners.push({ callback });
		return {
			unregister: () => {
				this.listeners = this.listeners.filter(listener => listener.callback !== callback);
			}
		}
	}

	notify (event: T) {
		for (const listener of this.listeners) {
			listener.callback(event);
		}
	}
}

export class ReactiveValue<T> {
	private value: T;
	private observable: Observable<T>;

	constructor (initialValue: T) {
		this.value = initialValue;
		this.observable = new Observable();
	}

	get () {
		return this.value;
	}

	set (newValue: T) {
		this.value = newValue;
		this.observable.notify(this.value);
	}

	subscribe (callback: (value: T) => void) {
		return this.observable.register(callback);
	}
}