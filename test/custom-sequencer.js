const Sequencer = require("@jest/test-sequencer").default;

class CustomSequencer extends Sequencer {
    /**
     * Select tests for shard requested via --shard=shardIndex/shardCount
     * Sharding is applied before sorting
     */
    shard(tests, {shardIndex, shardCount}) {
        const shardSize = Math.ceil(tests.length / shardCount);
        const shardStart = shardSize * (shardIndex - 1);
        const shardEnd = shardSize * shardIndex;

        return [...tests]
            .sort((testA, testB) => (testA.path < testB.path ? 1 : -1))
            .slice(shardStart, shardEnd);
    }

    /**
     * Sort test to determine order of execution
     * Sorting is applied after sharding
     */
    sort(tests) {
        // Test structure information
        // https://github.com/facebook/jest/blob/6e5b1d60a1214e792b5229993b5475445e9c1a6e/packages/jest-test-result/src/types.ts#L182-L186
        const copyTests = Array.from(tests);
        return copyTests.sort((testA, testB) => (testA.path < testB.path ? 1 : -1));
    }
}

module.exports = CustomSequencer;
