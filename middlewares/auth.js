const jwt = require('jsonwebtoken');

exports.ErrorHandler=(err, req, res, next) => {
  console.log(err.stack);
  res.send("Something broke!");
}

exports.isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({
      message: 'Access denied: Admins only'
    })
  }

  next()
}

//את הפונקציה הזו עשיתי בפרויקט של המתכונים ונעזרתי בגיפיטי לא עשיתי אותה לבד...
exports.auth = (req, res, next) => {
  try {
      if (!req.headers.authorization) {
          return res.status(401).json({ message: "אימות נכשל - חסר טוקן בבקשה" });
      }
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      
      req.user = decodedToken;
      
      next();
  } catch (error) {
      
      if (error.name === 'TokenExpiredError') {
          return res.status(401).json({ message: "פג התוקף של הטוקן, נא להתחבר מחדש" });
      }
      
      if (error.name === 'JsonWebTokenError') {
          return res.status(401).json({ message: "טוקן לא תקין או שגוי" });
      }

      return res.status(401).json({ message: "אימות נכשל" });
  }
};

