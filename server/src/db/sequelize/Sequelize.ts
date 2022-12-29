import { Sequelize, DataTypes } from "sequelize";

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize("FAKE_DB", "root", "root", {
  host: "localhost",
  dialect: "mysql",
  port: 40000,
});

const connection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

const User = sequelize.define(
  "User",
  {
    // Model attributes are defined here
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      // allowNull defaults to true
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      // allowNull defaults to true
    },
    service: {
      type: DataTypes.STRING,
      allowNull: false,
      // allowNull defaults to true
    },
    admin: {
      type: DataTypes.STRING,
      allowNull: false,
      // allowNull defaults to true
    },
  },
  {
    // Other model options go here
    timestamps: false,
  }
);

// User.findAll({where : {username : , password : }})

export { connection, sequelize, User };
