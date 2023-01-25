// For Netlify Functions

const { PrismaClient, Prisma } = require("@prisma/client");
const client = new PrismaClient();

exports.handler = async () => {
  console.log("Runtime");
  console.log(process.platform);
  console.log(process.release);
  console.log(process.config);
  console.log(process.env);

  try {
    await client.user.deleteMany({});

    process.env.DEBUG = "*";

    await client.user.create({
      data: {
        id: "1234567890",
        email: "alice@prisma.io",
        nick: "al",
        // Comment/uncomment this and in schema.prisma
        name: "Alice",
      },
    });
  } catch (e) {
    console.log(e.message);

    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: e.message }),
    };
  }

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ok: true }),
  };
};
