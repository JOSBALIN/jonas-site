const axios = require("axios");

exports.handler = async function (event, context) {
    console.log("UUU")
  try {
    const { id } = event.queryStringParameters;
    const response = await axios.get(`${process.env.TODO_BASE_URL}/${id}`);
    // console.log(process.env.EMAILJS_API_KEY)
    return {
      statusCode: 200,
      body: JSON.stringify({ title: response.data.title }),
    };
  } catch (err) {
    return {
      statusCode: 404,
      body: err.toString(),
    };
  }
};