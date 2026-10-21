import { defineConfig, defineProject } from 'vitest/config';

export default defineConfig({
  test: {
    projects: [
      defineProject({
        test: {
          name: 'unit',
          include: [
            'test/cacheable.test.ts',
            'test/compression.test.ts',
            'test/cors.test.ts',
            'test/metrics.test.ts',
            'test/requestId.test.ts',
            'test/security-headers.test.ts',
            'test/shutdown.test.ts',
            'test/routes/serializeStream.test.ts',
          ],
          environment: 'node',
          testTimeout: 10000,
          hookTimeout: 10000,
        },
      }),
      defineProject({
        test: {
          name: 'integration',
          include: ['test/**/*.test.ts'],
          exclude: [
            'test/cacheable.test.ts',
            'test/compression.test.ts',
            'test/cors.test.ts',
            'test/metrics.test.ts',
            'test/requestId.test.ts',
            'test/security-headers.test.ts',
            'test/shutdown.test.ts',
            'test/routes/serializeStream.test.ts',
          ],
          environment: 'node',
          setupFiles: ['./test/setup.ts'],
          testTimeout: 20000,
          hookTimeout: 20000,
          // Integration tests share one Postgres test DB and reset it between
          // tests — running files in parallel would race on that shared state.
          fileParallelism: false,
        },
      }),
    ],
  },
});
