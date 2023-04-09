
app.post('/register', (req, res) => {
    // authenticate user and generate JWT token
    User.findOne({ email: req.body.email, password: req.body.password })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Invalid email or password.' });
            }
            const payload = { id: user.id, email: user.email };
            const token = jwt.sign(payload, process.env.APP_KEY);
            res.json({ token: token });
        })
        .catch(err => res.status(500).json({ message: 'Internal server error.' }));
});
app.post('/login', (req, res) => {
    // authenticate user and generate JWT token
    User.findOne({ email: req.body.email, password: req.body.password })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Invalid email or password.' });
            }
            const payload = { id: user.id, email: user.email };
            const token = jwt.sign(payload, process.env.APP_KEY);
            res.json({ token: token });
        })
        .catch(err => res.status(500).json({ message: 'Internal server error.' }));
});
