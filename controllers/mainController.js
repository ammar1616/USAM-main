const fs = require('fs');
const path = require('path');
const teams = require('../teams/teams.json');
const { users, contactus_users } = require("../models/user.model")


exports.index = async(req, res, next) => {
    const { page } = req.params;
    const main = ['home', 'projects', 'contact'];
    const game = ['game', 'quiz', 'memory', 'tic-tac-toe', 'word-guess'];
    const join = ['partners', 'community', 'volunteers', 'ambassadors'];
    const branch = ['branch', 'teams'];

    let data = {
        page: '404',
        page_path: '404',
    };

    if (page) {
        if (main.includes(page)) {
            data.page = page;
            data.page_path = `${page}`;
        } else if (game.includes(page)) {
            data.page = page;
            data.page_path = `game/${page}`;
        } else if (join.includes(page)) {
            data.page = page;
            data.page_path = `join/${page}`;
        } else if (branch.includes(page)) {
            data.page = page;
            data.page_path = `branch/${page}`;
        } else if (page == 'favicon.ico') return;
    } else if (page == undefined) {
        data.page = 'home';
        data.page_path = 'home';
    }
    return res.render('index', { data });
};
exports.getTeams = (req, res, next) => {
    const { page } = req.params;
    if (page == 'teams-data') {
        return res.json(teams);
    } else next();
};
exports.getImage = (req, res) => {
    const img = req.params.img;
    const imagePath = path.join(__dirname, '../teams/img', img);
    fs.readFile(imagePath, (err, data) => {
        if (err) {
            res.status(404).send('Image not found');
        } else {
            res.contentType('image/jpeg');
            return res.send(data);
        }
    });
};


exports.applyform = async(req, res) => {
    const { fullname, email, phone, dateofbirth, job_title, company_name, country, city, fb_url, committee, education, attend_before, role } = req.body
    const newuser = await users.create({
        fullname,
        email,
        phone,
        dateofbirth,
        job_title,
        company_name,
        country,
        city,
        fb_url,
        committee,
        education,
        attend_before,
        role
    })
    res.redirect('/');
}

exports.contactus = async(req, res) => {
    const { fullname, email, phone, message } = req.body
    const newcontactus = await contactus_users.create({
        fullname,
        email,
        phone,
        message
    })
    res.redirect('/');
}