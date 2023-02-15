import { Sequelize, DataTypes } from "sequelize";

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD as string,
  // "DONI",
  // "root",
  // "root",
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: parseInt(process.env.DB_PORT as string),
  }
);

const connection = async () => {
  try {
    await sequelize.authenticate();
    console.log("🟢 SEQUELIZE Connection has been established successfully.");
  } catch (error) {
    console.error("🔴 SEQUELIZE Unable to connect to the database:", error);
  }
};
//Test connection
// connection();

const User = sequelize.define(
  "User",
  {
    // Model attributes are defined here
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hash_password: {
      type: DataTypes.STRING,
      allowNull: false,
      // allowNull defaults to true
    },
    prenom: {
      type: DataTypes.STRING,
      allowNull: false,
      // allowNull defaults to true
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
      // allowNull defaults to true
    },

    role: {
      type: DataTypes.STRING,
      allowNull: false,
      // allowNull defaults to true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      // allowNull defaults to true
    },
    societe: {
      type: DataTypes.STRING,
      allowNull: false,
      // allowNull defaults to true
    },
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      // allowNull defaults to true
    },
  },
  {
    // Other model options go here
    timestamps: false,
  }
);

const Bulletin = sequelize.define(
  "Bulletin",
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

const Ticket = sequelize.define("Ticket", {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  sujet: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  details: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

connection();
export { connection, sequelize, User, Bulletin, Ticket };
