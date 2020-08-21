'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('list_references', [
      { value: "subtest_1_ist", code: "SE" },
      { value: "subtest_2_ist", code: "WA" },
      { value: "subtest_3_ist", code: "AN" },
      { value: "subtest_4_ist", code: "GE" },
      { value: "subtest_5_ist", code: "RA" },
      { value: "subtest_6_ist", code: "ZR" },
      { value: "subtest_7_ist", code: "FA" },
      { value: "subtest_8_ist", code: "WU" },
      { value: "subtest_9_ist", code: "ME" },
      { value: "bagian_1_verb_ling", code: "M1" },
      { value: "bagian_2_log_math", code: "M2" },
      { value: "bagian_3_spat", code: "M3" },
      { value: "bagian_4_mus", code: "M4" },
      { value: "bagian_5_bod_kin", code: "M5" },
      { value: "bagian_6_inter", code: "M6" },
      { value: "bagian_7_intra", code: "M7" },
      { value: "bagian_8_nat", code: "M8" }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('list_references', null, {});
  }
};
