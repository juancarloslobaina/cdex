package com.jacdl.domain;

import static com.jacdl.domain.AssertUtils.bigDecimalCompareTo;
import static org.assertj.core.api.Assertions.assertThat;

public class ClientAsserts {

    /**
     * Asserts that the entity has all properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertClientAllPropertiesEquals(Client expected, Client actual) {
        assertClientAutoGeneratedPropertiesEquals(expected, actual);
        assertClientAllUpdatablePropertiesEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all updatable properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertClientAllUpdatablePropertiesEquals(Client expected, Client actual) {
        assertClientUpdatableFieldsEquals(expected, actual);
        assertClientUpdatableRelationshipsEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all the auto generated properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertClientAutoGeneratedPropertiesEquals(Client expected, Client actual) {
        assertThat(expected)
            .as("Verify Client auto generated properties")
            .satisfies(e -> assertThat(e.getId()).as("check id").isEqualTo(actual.getId()));
    }

    /**
     * Asserts that the entity has all the updatable fields set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertClientUpdatableFieldsEquals(Client expected, Client actual) {
        assertThat(expected)
            .as("Verify Client relevant properties")
            .satisfies(
                e -> assertThat(e.getBalance()).as("check balance").usingComparator(bigDecimalCompareTo).isEqualTo(actual.getBalance())
            );
    }

    /**
     * Asserts that the entity has all the updatable relationships set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertClientUpdatableRelationshipsEquals(Client expected, Client actual) {
        assertThat(expected)
            .as("Verify Client relationships")
            .satisfies(e -> assertThat(e.getProviders()).as("check providers").isEqualTo(actual.getProviders()));
    }
}
