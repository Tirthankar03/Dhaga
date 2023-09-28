import jwt from 'jsonwebtoken'

const generateTokenAndSetCookie =( userId, res) => {
    console.log(process.env.JWT_SECRET);
    const token = jwt.sign({userId}, process.env.JWT_SECRET,{
        expiresIn: "15d",
    })
    res.cookie("jwt", token,{
        httpOnly: true, //no JS access
        maxAge: 15*24*60*60*1000,
        sameSite: "Strict", //CSRF
    });

    return token;
}

export default generateTokenAndSetCookie