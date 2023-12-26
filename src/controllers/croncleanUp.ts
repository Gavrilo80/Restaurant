import BlackListToken from "../models/BlackListToken";

const cleanUp = async () => {
  try {
    const content = await BlackListToken.findAll({ attributes: ['token'] });
    if (content.length === 0) {
      console.log("No records were found to clean up.");
    } else {
      await BlackListToken.destroy({ truncate: true });
      console.log("Database has been cleaned up successfully. Records deleted");
    }
  } catch (error) {
    console.error("An error occurred during database cleanup:", error);
  }
}

export default cleanUp