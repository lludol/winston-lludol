const colors = require('colors');
const winston = require('winston');

/**
 * Winston handle the winston logger instance and define its configuration.
 */
class Winston {
	/**
	 * Create Winston instance with a custom configuration.
	 * @constructor
	 */
	constructor() {
		colors.setTheme(winston.config.npm.colors);

		const customFilter = winston.format((info) => {
			const pattern = /(\[[A-Za-z]+])/g;
			info.message = info.message.replace(pattern, (str, p1) => p1.white);
			return info;
		});

		this.logger = winston.createLogger({
			level:  'silly',
			levels: winston.config.npm.levels,
			format: winston.format.combine(
				winston.format.splat(),
				customFilter(),
				winston.format.timestamp({
					format: 'YYYY-MM-DD hh:mm:ss',
				}),
				winston.format.printf((info) => `${info.timestamp.grey} ${this.constructor.formatLevel(info)} ${info.message} ${this.constructor.formatMeta(info)}`),
			),
			transports: [
				new winston.transports.Console({
					stderrLevels: ['error', 'debug'],
				}),
			],
		});
	}

	/**
	 * Format the error level to be displayed in color.
	 * @param  {Object} options - The Winston Object to get the error level.
	 * @return {String} The String formatted.
	 */
	static formatLevel(options) {
		return colors[options.level](options.level.toUpperCase());
	}

	/**
	 * Format the meta object.
	 * @param  {Object} options - The Winston object to get the meta Object.
	 * @return {String} The meta formatted.
	 */
	static formatMeta(options) {
		const meta = options[Symbol.for('splat')];
		if (meta && meta.length) {
			return `\n\t${JSON.stringify(meta.length === 1 ? meta[0] : meta)}`;
		}
		return '';
	}
}

module.exports = (new Winston()).logger;
