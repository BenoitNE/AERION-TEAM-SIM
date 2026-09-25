import { reviewSubmission } from './review-engine';

describe('reviewSubmission', () => {
  it('rejects an empty submission', () => {
    const result = reviewSubmission({ diff: '', testsRunLocally: false });

    expect(result.approved).toBe(false);
    expect(result.findings.some((finding) => finding.level === 'blocking')).toBe(true);
  });

  it('requests a regression test when only production code changes', () => {
    const result = reviewSubmission({
      testsRunLocally: true,
      diff: `
diff --git a/src/main/java/com/aerion/thermal/ThermalThresholdCalculator.java b/src/main/java/com/aerion/thermal/ThermalThresholdCalculator.java
--- a/src/main/java/com/aerion/thermal/ThermalThresholdCalculator.java
+++ b/src/main/java/com/aerion/thermal/ThermalThresholdCalculator.java
@@
- old
+ new
`,
    });

    expect(result.approved).toBe(false);
    expect(result.findings.some((finding) => finding.authorId === 'marc')).toBe(true);
  });

  it('approves a focused diff with production code, a negative regression test and local tests confirmed', () => {
    const result = reviewSubmission({
      testsRunLocally: true,
      diff: `
diff --git a/src/main/java/com/aerion/thermal/ThermalThresholdCalculator.java b/src/main/java/com/aerion/thermal/ThermalThresholdCalculator.java
--- a/src/main/java/com/aerion/thermal/ThermalThresholdCalculator.java
+++ b/src/main/java/com/aerion/thermal/ThermalThresholdCalculator.java
@@
- return 100 - Math.abs(ambientTemperature) / 2;
+ return 100 - ambientTemperature / 2;
diff --git a/src/test/java/com/aerion/thermal/ThermalThresholdCalculatorTest.java b/src/test/java/com/aerion/thermal/ThermalThresholdCalculatorTest.java
--- a/src/test/java/com/aerion/thermal/ThermalThresholdCalculatorTest.java
+++ b/src/test/java/com/aerion/thermal/ThermalThresholdCalculatorTest.java
@@
+ void shouldIncreaseThresholdForNegativeTemperature() {
+   assertEquals(110, calculator.calculateThreshold(-20));
+ }
`,
    });

    expect(result.approved).toBe(true);
  });
});
