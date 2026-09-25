package com.aerion.thermal;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

final class ThermalThresholdCalculatorTest {

    private final ThermalThresholdCalculator calculator = new ThermalThresholdCalculator();

    @Test
    void shouldReduceThresholdForPositiveTemperature() {
        assertEquals(90, calculator.calculateThreshold(20));
    }

    @Test
    void shouldKeepBaseThresholdAtZero() {
        assertEquals(100, calculator.calculateThreshold(0));
    }

    @Test
    void shouldIncreaseThresholdForNegativeTemperature() {
        assertEquals(110, calculator.calculateThreshold(-20));
    }
}
