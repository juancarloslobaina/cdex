package com.jacdl.domain;

import static org.assertj.core.api.Assertions.assertThat;

public class BeneficiaryAsserts {

    /**
     * Asserts that the entity has all properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertBeneficiaryAllPropertiesEquals(Beneficiary expected, Beneficiary actual) {
        assertBeneficiaryAutoGeneratedPropertiesEquals(expected, actual);
        assertBeneficiaryAllUpdatablePropertiesEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all updatable properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertBeneficiaryAllUpdatablePropertiesEquals(Beneficiary expected, Beneficiary actual) {
        assertBeneficiaryUpdatableFieldsEquals(expected, actual);
        assertBeneficiaryUpdatableRelationshipsEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all the auto generated properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertBeneficiaryAutoGeneratedPropertiesEquals(Beneficiary expected, Beneficiary actual) {
        assertThat(expected)
            .as("Verify Beneficiary auto generated properties")
            .satisfies(e -> assertThat(e.getId()).as("check id").isEqualTo(actual.getId()));
    }

    /**
     * Asserts that the entity has all the updatable fields set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertBeneficiaryUpdatableFieldsEquals(Beneficiary expected, Beneficiary actual) {
        assertThat(expected)
            .as("Verify Beneficiary relevant properties")
            .satisfies(e -> assertThat(e.getAlias()).as("check alias").isEqualTo(actual.getAlias()))
            .satisfies(e -> assertThat(e.getPhone()).as("check phone").isEqualTo(actual.getPhone()))
            .satisfies(e -> assertThat(e.getCity()).as("check city").isEqualTo(actual.getCity()))
            .satisfies(e -> assertThat(e.getAddress()).as("check address").isEqualTo(actual.getAddress()))
            .satisfies(e -> assertThat(e.getReferenceAddress()).as("check referenceAddress").isEqualTo(actual.getReferenceAddress()));
    }

    /**
     * Asserts that the entity has all the updatable relationships set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertBeneficiaryUpdatableRelationshipsEquals(Beneficiary expected, Beneficiary actual) {}
}
