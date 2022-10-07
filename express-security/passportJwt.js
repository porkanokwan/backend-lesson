const passport = require("passport");

module.exports = passport.authenticate("jwt", { session: false });
// ให้ authenticate ด้วย jwt และไม่ได้ใช้ session เลยให้เป็น false
