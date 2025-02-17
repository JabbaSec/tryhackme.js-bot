const { Listener } = require('@sapphire/framework');
const { blue, gray, green, magenta, magentaBright, white, yellow } = require('colorette');

const dev = process.env.NODE_ENV !== 'production';
const style = dev ? yellow : blue;

class UserEvent extends Listener {
	constructor(context, options = {}) {
		super(context, {
			...options,
			once: true
		});
	}

	run() {
		this.printBanner();
		this.printStoreDebugInformation();
	}

	printBanner() {
		const success = green('+');

		const llc = dev ? magentaBright : white;
		const blc = dev ? magenta : blue;

		const line01 = llc('');
		const line02 = llc('');
		const line03 = llc('');

		// Offset Pad
		const pad = ' '.repeat(7);

		console.log(String.raw`
  _____           ____        _   __  __
 |_   _| __ _   _| __ )  ___ | |_|  \/  | ___
   | || '__| | | |  _ \ / _ \| __| |\/| |/ _ \
   | || |  | |_| | |_) | (_) | |_| |  | |  __/
   |_||_|   \__, |____/ \___/ \__|_|  |_|\___|
            |___/                             `);
		console.log(
			String.raw`
${line01} ${pad}${blc('1.0.0')}
${line02} ${pad}[${success}] Gateway
${line03}${dev ? ` ${pad}${blc('<')}${llc('/')}${blc('>')} ${llc('DEVELOPMENT MODE')}` : ''}
		`.trim()
		);
	}

	printStoreDebugInformation() {
		const { client, logger } = this.container;
		const stores = [...client.stores.values()];
		const last = stores.pop();

		for (const store of stores) console.log(this.styleStore(store, false));
		console.log(this.styleStore(last, true));
	}

	styleStore(store, last) {
		return gray(`${last ? '└─' : '├─'} Loaded ${style(store.size.toString().padEnd(3, ' '))} ${store.name}.`);
	}
}

module.exports = {
	UserEvent
};
