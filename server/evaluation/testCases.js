const testCases = [
  {
    name: 'Java concept',
    intent: 'EXPLAIN_CONCEPT',
    message: 'Explain Java for loops simply.',
    expected: 'Explains initialization, condition, and update.',
    checks: [
      'Mentions initialization',
      'Explains the loop condition',
      'Explains the update',
    ],
  },
  {
    name: 'Generate hint',
    intent: 'GENERATE_HINT',
    message: 'Give me a hint for finding the largest array element.',
    expected: 'Provides a hint without complete code.',
    checks: [
      'Suggests tracking the largest value',
      'Does not give a complete program',
    ],
  },
  {
    name: 'Review code',
    intent: 'REVIEW_CODE',
    message: 'Review this Java code: int a = 10 / 0;',
    expected: 'Identifies the Java compile-time division-by-zero error.',
    checks: [
      'Identifies division by zero',
      'Correctly states that this integer constant expression causes a compile-time error in Java',
      'Does not claim that this exact Java statement throws ArithmeticException at runtime',
    ],
  },
  {
    name: 'Analyze error',
    intent: 'ANALYZE_ERROR',
    message: 'What causes a NullPointerException in Java?',
    expected: 'Explains using a null reference where an object is required.',
    checks: [
      'Explains null references',
      'Gives a relevant example or cause',
    ],
  },
  {
    name: 'Debug code',
    intent: 'DEBUG_CODE',
    message: 'Why does my Java loop never stop?',
    expected: 'Explains how an incorrect loop condition or update can cause an infinite loop.',
    checks: [
      'Explains an infinite loop',
      'Identifies a condition or update problem',
      'Suggests a relevant debugging step',
    ],
  },
];

module.exports = testCases;
