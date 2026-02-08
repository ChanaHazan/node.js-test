exports.login = (req, res) => {

    const { userName, pass } = req.body
    if (!userName || !passWord)
        res.status(400).json({ err: "feilds req" })

    const isActive = Users.find(x => x.passWord === pass&&x.firstName==userName)
    if (!isActive)
    {
        res.status(401).json({ err: "user not found" })
    }

    res.status(200).send()

}