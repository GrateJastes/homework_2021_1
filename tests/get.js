'use strict';

QUnit.module('Тестируем функцию get', function () {
	QUnit.test('get работает правильно c объектами с существующими свойствами', function (assert) {
		const object = {
			foo: 'bar',
			deep: {
				nested: {
					field: 'baz'
				}
			}
		};

		assert.strictEqual(get(object, '.foo'), object.foo);
		assert.strictEqual(get(object, '.deep.nested.field'), object.deep.nested.field);

		assert.deepEqual(get(object, '.deep.nested'), object.deep.nested);
		assert.deepEqual(get(object, '.deep'), object.deep);

		// assert.deepEqual(get(object, '.'), object);
		// because I don't think it's an appropriate behavior
	});

	QUnit.test('get работает правильно c массивами', function (assert) {
		const object = {
			foo: 'bar',
			baz: [ 1, 2, 3 ],
			deep: [
				{foobar: '42'}
			]
		};

		assert.strictEqual(get(object, '.foo.0'), object.foo[ 0 ]);
		assert.strictEqual(get(object, '.foo.length'), object.foo.length);
		assert.strictEqual(get(object, '.baz.0'), object.baz[ 0 ]);
		assert.strictEqual(get(object, '.baz.length'), object.baz.length);
		assert.strictEqual(get(object, '.deep.0.foobar'), object.deep[ 0 ].foobar);
	});

	QUnit.test('get работает правильно c объектами без свойств', function (assert) {
		const object = {
			foo: {
				bar: 42
			}
		};

		assert.strictEqual(get(object, '.foobar'), undefined);
		assert.strictEqual(get(object, '.foo.baz'), undefined);
		assert.strictEqual(get(object, '.baz.0'), undefined);
		assert.strictEqual(get(object, '.baz.length'), undefined);
		assert.strictEqual(get(object, '.0.1.2'), undefined);
	});

	QUnit.test('get работает правильно с некорректным вводом', function (assert) {
		const object = {
			foo: 'bar',
			bar: [ 1, 2, 3 ],
			deep: {
				nested: {
					field: 'baz'
				}
			}
		};

		assert.throws(() => get(), new TypeError('Incorrect type'));
		assert.throws(() => get(object), new TypeError('Incorrect type'));
		assert.throws(() => get('object', '.foo'), new TypeError('Incorrect type'));
		assert.throws(() => get(object, object), new TypeError('Incorrect type'));

		assert.throws(() => get(object, ''), new Error('Property path invalid'));
		assert.throws(() => get(object, ' '), new Error('Property path invalid'));
		assert.throws(() => get(object, 'foo'), new Error('Property path invalid'));

		assert.strictEqual(get(object, '.'), undefined)
		assert.strictEqual(get(object, '.foo.'), undefined)
		assert.strictEqual(get(object, '.deep..nested'), undefined)
		assert.strictEqual(get(object, '.bar.val'), undefined)
	})
});
