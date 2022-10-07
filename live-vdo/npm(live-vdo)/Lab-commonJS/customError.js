class CustomError extends Error {
    constructor(message, statusCode){
        super(message);
        this.stausCode = statusCode;
    }
}

// new CustomError('Invalid username', 400);
// new Error('Invalid username'); // Error เป็น built-in prototype ที่ให้ค่า error obj ออกมา แล้วมี message เป็น 'Invalid username'
module.exports = CustomError;