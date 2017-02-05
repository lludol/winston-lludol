const colors	= require('colors');
const winston	= require('winston');
const moment	= require('moment');

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

		this.logger = new (winston.Logger)({
			level:   'silly',
			levels:  winston.config.npm.levels,
			filters: [function (level, msg) {
				const pattern = /(\[[A-Za-z]+])/g;
				return msg.replace(pattern, (str, p1) => p1.white);
			}],
			transports: [
				new (winston.transports.Console)({
					colorize:  true,
					timestamp: () => moment().format('YYYY-MM-DD hh:mm:ss'),
					formatter: (options) => `${options.timestamp().grey} ${this.constructor.formatLevel(options)} ${options.message} ${this.constructor.formatMeta(options)}`,
				}),
			],
		});
		this.logger.winston = winston;
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
		if (options.meta && Object.keys(options.meta).length) {
			return `\n\t${JSON.stringify(options.meta)}`;
		}
		return '';
	}
}

module.exports = (new Winston()).logger;
