package com.aerion.thermal;

public final class ThermalThresholdCalculator {

    private static final int BASE_THRESHOLD = 100;

    public int calculateThreshold(int ambientTemperature) {
        return BASE_THRESHOLD - Math.abs(ambientTemperature) / 2;
    }
}
