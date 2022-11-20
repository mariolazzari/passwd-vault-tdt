import createServer from "./utils/createServer";
import logger from "../src/utils/logger";

async function main() {
  const app = createServer();

  try {
    const url = await app.listen({ port: 4000, host: "0.0.0.0" });

    logger.info(`Server started on ${url}`);
  } catch (ex) {
    logger.error(ex);
    process.exit(1);
  }
}

main();
