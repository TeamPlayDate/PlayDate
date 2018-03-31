module.exports = function(sequelize, DataTypes) {
	var user_interest_relationship = sequelize.define("user_interest_relationship",{
        id: {
        	    type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            }
        ,
        userId:
        {
          type: DataTypes.STRING,
          allowNull: false
        },
        interestId:
        {
          type: DataTypes.INTEGER,
          allowNull: false
        }
        },{  
           timestamps: false
    });
    
    user_interest_relationship.associate = function(models){
        user_interest_relationship.belongsTo(models.user);
        user_interest_relationship.belongsTo(models.interest);
    };
  
    return user_interest_relationship;
};