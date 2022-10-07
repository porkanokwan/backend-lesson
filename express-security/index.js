// const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// const message = "123456";

// const run = async () => {
//   const hashed = await bcrypt.hash(message, 11);
//   console.log(hashed); // ค่า salt จะต่างกันทุกครั้ง ทำให้ hashed value ต่างกันทุกครั้งที่ save
// };

// const test = async () => {
//   // check hash value ว่าตรงกับ message ไหม จะ return ค่าเป็น true/false
//   const isMatch = await bcrypt.compare(
//     message,
//     "$2a$11$pJqDsIu6etr1v23/26VxqeSuGLZS/IqlsQ3UsZLrYY2oJOF33ZQoe"
//   );
//   console.log(isMatch);
// };

// run();
// test();

const payload = {
  message: "Hello my friends",
};

// const secretKey = "codecamp";

// const token = jwt.sign(payload, secretKey);

// console.log(token); // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXNzYWdlIjoiSGVsbG8gbXkgZnJpZW5kcyIsImlhdCI6MTY1NDc5MDE0MH0._ng76IhrUQPRr6wfcC3GNB2hT1XSvtDrZHT70c1FqxI

// const tokenToverify =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXNzYWdlIjoiSGVsbG8gbXkgZnJpZW5kcyIsImlhdCI6MTY1NDc5MDE0MH0._ng76IhrUQPRr6wfcC3GNB2hT1XSvtDrZHT70c1FqxI";

// ใช้ try catch ดักจับ error
// try {
//   const verify = jwt.verify(tokenToverify, "codecamp");
//   console.log(verify);
// } catch (err) {
//   console.log(err);
// }

const token = jwt.sign(payload, "test", {
  expiresIn: 60, // หมดอายุภายใน 60s
});

console.log(token);

try {
  const verify = jwt.verify(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXNzYWdlIjoiSGVsbG8gbXkgZnJpZW5kcyIsImlhdCI6MTY1NDgyOTcxNywiZXhwIjoxNjU0ODI5Nzc3fQ.9aW2ILr7T1Ki3qDV4AZXaV4huP88Z0BSQC8gvXmQ9Io",
    "test"
  );
  console.log(verify); // { message: 'Hello my friends', iat: 1654790140 } ได้ payload ออกมา
} catch (err) {
  console.log(err); // TokenExpiredError: jwt expired เพราะเราตั้ง option ไว้ 5s
}
