module.exports = function(sequelize, DataTypes) {
	var User_Interest_Relationship = sequelize.define("User_Interest_Relationship",{
        id: {
        	    type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
    });

    User_Interest_Relationship.associate = function(models){
    	User_Interest_Relationship.belongsTo(models.User,{foreignKey:"user_id"});
    	User_Interest_Relationship.belongsTo(models.Interest,{as:"interest_id",foreignKey:"id"});
    };

    return User_Interest_Relationship;
};