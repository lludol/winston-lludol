const { expect } = require('chai');
const testConsole = require('test-console');
const logger = require('../src/main.js');

describe('winston-lludol', () => {
	describe('test output format of the logger', () => {
		beforeEach(() => {
			this.color = String.raw`\\u\d{3}b\[\d{2}m`;

			this.dateRegex = String.raw`${this.color}\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}${this.color}`;
			this.levelRegex = String.raw`${this.color}(ERROR|WARN|INFO|VERBOSE|DEBUG|SILLY)${this.color}`;

			this.baseRegex = String.raw`${this.dateRegex} ${this.levelRegex} (.+)? \\n`;
			this.regex = new RegExp(String.raw`^"${this.baseRegex}"$`);

			this.whiteSquareBrackets = String.raw`\\u001b\[37m\[(.+)?\]\\u001b\[39m( .+)?`;
			this.regexWhiteSquareBrackets = new RegExp(String.raw`^"${this.dateRegex} ${this.levelRegex} ${this.whiteSquareBrackets} \\n"$`);

			this.stdout = testConsole.stdout;
			this.stderr = testConsole.stderr;
		});

		it('logger.error must match the format', (done) => {
			const output = this.stderr.inspectSync(() => {
				logger.error('error');
			});

			expect(JSON.stringify(output[0])).to.match(this.regex);
			done();
		});
		it('logger.info must match the format', (done) => {
			const output = this.stdout.inspectSync(() => {
				logger.info('info');
			});

			expect(JSON.stringify(output[0])).to.match(this.regex);
			done();
		});
		it('logger.verbose must match the format', (done) => {
			const output = this.stdout.inspectSync(() => {
				logger.verbose('verbose');
			});

			expect(JSON.stringify(output[0])).to.match(this.regex);
			done();
		});
		it('logger.debug must match the format', (done) => {
			const output = this.stderr.inspectSync(() => {
				logger.debug('debug');
			});

			expect(JSON.stringify(output[0])).to.match(this.regex);
			done();
		});
		it('logger.silly must match the format', (done) => {
			const output = this.stdout.inspectSync(() => {
				logger.silly('silly');
			});

			expect(JSON.stringify(output[0])).to.match(this.regex);
			done();
		});

		it('logger.error with meta must match the format', (done) => {
			const output = this.stderr.inspectSync(() => {
				logger.error('error', { foo: 'bar' });
			});

			const regexWithMeta = new RegExp(String.raw`^"${this.baseRegex}\\t{\\"foo\\":\\"bar\\"}\\n"$`);
			expect(JSON.stringify(output[0])).to.match(regexWithMeta);
			done();
		});

		it('logger.info with message between [] must be in white', (done) => {
			const output = this.stdout.inspectSync(() => {
				logger.info('[foo]');
			});

			expect(JSON.stringify(output[0])).to.match(this.regexWhiteSquareBrackets);
			done();
		});
	});
});
