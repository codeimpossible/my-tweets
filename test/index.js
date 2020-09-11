const fs = require('fs');
const path = require('path');
const pkg = require('./../package.json');
const { fail } = require('assert');

let testsDir = path.resolve(__dirname);
let suites = fs.readdirSync(testsDir)
                .filter(f => f.endsWith('.js') && f.startsWith('test_'))
                .map(f => {
                    return {
                        name: f,
                        module: require(path.resolve(__dirname, f))
                    };
                });

// add any shared data here
let logs = [];
let context = {
    logger: {
        log: (msg) => {
            logs.push(msg);
        }
    }
};

console.log(`🧪 Test Runner for ${pkg.name} v${pkg.version}`);
console.log(`> loaded ${suites.length} test suites.`);

(async function() {
    let testCount = 0;
    let passCount = 0;
    let failCount = 0;
    for(var i = 0; i <= suites.length - 1; i++) {
        let suite = suites[i];
        let tests = Object.keys(suite.module);
        let getTest = (name) => suite.module[name];
        console.log(`:: ${suite.name} loaded with ${tests.length} tests.`);
        for (var ii = 0; ii <= tests.length - 1; ii++) {
            var testName = tests[ii];
            try {
                process.stdout.write(`:: ${suite.name} :: ${testName} ... `);
                let test = getTest(testName);
                if (testName.endsWith('_async')) {
                    await test(context);
                } else {
                    test(context);
                }
                process.stdout.write('✔\n');
                passCount++;
            } catch (e) {
                failCount++;
                process.stdout.write('📛\n');
                console.error(e);
            }
            testCount++;
        }
    }
    console.log(`> ran ${testCount} tests. ${passCount} passed. ${failCount} failed.`);
})();
