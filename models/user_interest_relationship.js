module.exports = function(sequelize, DataTypes) {
	var User_Interest_Relationship = sequelize.define("User_Interest_Relationship",{
        id: {
        	    type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            }
        ,
        user_id:
        {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        interest_id:
        {
          type: DataTypes.INTEGER,
          allowNull: false
        }
        },{  
           timestamps: false
    });

 

    return User_Interest_Relationship;
};