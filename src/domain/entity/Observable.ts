export default class Observable {
	private listeners: { callback: Function }[];

	constructor () {
		this.listeners = [];
	}

	register (callback: Function) {
		this.listeners.push({ callback });
		return {
			unregister: () => {
				this.listeners = this.listeners.filter(listener => listener.callback !== callback);
			}

		}
	}

	notify (event: any) {
		for (const listener of this.listeners) {
			listener.callback(event);
		}
	}
}