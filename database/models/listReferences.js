'use strict';
module.exports = (sequelize, DataTypes) => {
  const listReferences = sequelize.define('list_references', {
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    value: DataTypes.STRING
  }, {    
    tableName: 'list_references',
    underscored: true,
    timestamps: false,
  });

  listReferences.associate = function(models) {
    // associations can be defined here
  };
  return listReferences;
};