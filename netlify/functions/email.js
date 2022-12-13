const axios = require("axios");

exports.handler = async function (event, context) {
    try {
      const { id } = event.queryStringParameters;
      const response = await axios.get(`${process.env.TODO_BASE_URL}/${id}`);
      console.log(process.env.EMAILJS_API_KEY)
      console.log("EEHEHE")
      return {
        statusCode: 200,
        body: JSON.stringify({ title: process.env.EMAILJS_API_KEY }),
      };
    } catch (err) {
      return {
        statusCode: 404,
        body: err.toString(),
      };
    }
  };
