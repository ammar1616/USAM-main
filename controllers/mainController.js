const fs = require('fs');
const path = require('path');
const Joi = require('joi');
const Swal = require('sweetalert2');
const teams = require('../teams/teams.json');
const { users, contactus_users } = require("../models/user.model")
const { v4: uuidv4 } = require('uuid');

const branchesjson = './teams/teams.json';




exports.index = async (req, res, next) => {
    const { page } = req.params;
    const main = ['home', 'projects', 'contact'];
    const game = ['game', 'quiz', 'memory', 'tic-tac-toe', 'word-guess'];
    const join = ['partners', 'community', 'volunteers', 'ambassadors'];
    const branch = ['branch', 'teams'];
    const admin = ['admin', 'adminLogin']

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
        } else if (admin.includes(page)) {
            data.page = page;
            data.page_path = `admin/${page}`;
        } else if (page == 'favicon.ico') return;
    } else if (page == undefined) {
        data.page = 'home';
        data.page_path = 'home';
    }
    return res.render('index', { data, error: "" });
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


exports.applyform = async (req, res) => {
    const { fullname, email, phone, dateofbirth, job_title, company_name, country, city, fb_url, committee, education, attend_before, role } = req.body

    const userSchema = Joi.object({
        fullname: Joi.string().trim().min(1).required().regex(/^[a-zA-Z\s]*$/).messages({
            'string.min': 'Full name cannot be empty.',
            'any.required': 'Full name is required.',
            'string.empty': 'Full name cannot be empty.',
            'string.pattern.base': 'Full name can only contain letters and spaces.',
        }),
        email: Joi.string().email().trim().required().messages({
            'string.email': 'Please provide a valid email address.',
            'any.required': 'Email is required.',
            'string.empty': 'Email cannot be empty.',
        }),
        phone: Joi.string().trim().min(10).max(15).pattern(/^[0-9+\s]+$/).required().messages({
            'string.pattern.base': 'Phone number can only contain numbers and spaces.',
            'string.min': 'Phone number should have at least 10 digits.',
            'string.max': 'Phone number should not exceed 15 characters.',
            'any.required': 'Phone number is required.',
            'string.empty': 'Phone number cannot be empty.',
        }),
        dateofbirth: Joi.date().iso().messages({
            'date.iso': 'Date of birth should be in ISO date format (e.g., YYYY-MM-DD).',
        }),
        job_title: Joi.string().trim().required().messages({
            'any.required': 'Job title is required.',
            'string.empty': 'Job title cannot be empty.',
        }),
        company_name: Joi.string().trim().required().messages({
            'any.required': 'Company name is required.',
            'string.empty': 'Company name cannot be empty.',
        }),
        country: Joi.string().trim().required().messages({
            'any.required': 'Country is required.',
            'string.empty': 'Country cannot be empty.',
        }),
        city: Joi.string().trim().required().messages({
            'any.required': 'City is required.',
            'string.empty': 'City cannot be empty.',
        }),
        fb_url: Joi.string().uri().messages({
            'string.uri': 'Please provide a valid URI for Facebook URL.',
        }),
        committee: Joi.string().trim().messages(),
        education: Joi.string().trim().required().messages({
            'any.required': 'Education field is required.',
            'string.empty': 'Education field cannot be empty.',
        }),
        attend_before: Joi.required().messages({
            'any.required': 'Please indicate if you have attended before.',
        }),
        role: Joi.string().trim().required().messages({
            'any.required': 'Role is required.',
            'string.empty': 'Role cannot be empty.',
        }),
    });

    const routes = {
        partners: 'sections/join/partners.ejs',
        community: 'sections/join/community.ejs',
        ambassador: 'sections/join/ambassadors.ejs',
        volunteer: 'sections/join/volunteers.ejs'
    };

    try {
        // Validate the request body against the schema
        const { error, value } = userSchema.validate(req.body);
        if (error) {
            // If validation fails, return an error response
            return res.render(routes[req.body.role], { error: error.details[0].message });
        }

        const newuser = await users.create(value);
        res.redirect('/');

    } catch (err) {
        // Handle any other errors that may occur during user creation
        console.error(err);
        res.status(500).json({ error: 'Internal server error11111' });
    }
}


exports.contactus = async (req, res) => {
    const { fullname, email, phone, message } = req.body

    const userSchema = Joi.object({
        fullname: Joi.string().trim().required().regex(/^[a-zA-Z\s]*$/).min(1).messages({
            'string.min': 'Full name cannot be empty.',
            'any.required': 'Full name is required.',
            'string.empty': 'Full name cannot be empty.',
            'string.pattern.base': 'Full name can only contain letters and spaces.',
        }),
        email: Joi.string().email().trim().required().messages({
            'string.email': 'Please provide a valid email address.',
            'any.required': 'Email is required.',
            'string.empty': 'Email cannot be empty.',
        }),
        phone: Joi.string().trim().min(10).max(15).pattern(/^[0-9+\s]+$/).required().messages({
            'string.pattern.base': 'Phone number can only contain numbers and spaces.',
            'string.min': 'Phone number should have at least 10 digits.',
            'string.max': 'Phone number should not exceed 15 characters.',
            'any.required': 'Phone number is required.',
            'string.empty': 'Phone number cannot be empty.',
        }),
        message: Joi.string().trim().required().min(1).messages({
            'string.min': 'Message cannot be empty.',
            'any.required': 'Message is required.',
            'string.empty': 'Message cannot be empty.',

        }),
    });

    try {
        // Validate the request body against the schema
        const { error, value } = userSchema.validate(req.body);
        if (error) {
            // If validation fails, return an error response
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error,
            })
            return res.status(400).render('pages/contact', { error: error.details[0].message });
        } else {
            // If validation passes, create a new user
            const newcontactus = await contactus_users.create(value);
            const successMessage = 'Data Sent Successfully';
            Swal.fire(
                'Done',
                'We will contact you soon',
                'success'
            )
            res.redirect("/");
        }

    } catch (err) {
        // Handle any other errors that may occur during user creation
        console.error(err);
        res.status(500).json({ error: 'Internal server error22222' });
    }
}


//==================================================//
// for admin dashboard


const saveData = (data) => {
    let stringFyData = JSON.stringify(data);
    fs.writeFileSync(branchesjson, stringFyData)
}

const readData = () => {
    let data = fs.readFileSync(branchesjson, 'utf8');
    return JSON.parse(data);
}

exports.getTeamMembers = (req, res) => {
    let data = readData()
    // console.log(data);
    res.json({ message: "Data", data });
}

exports.addMemberTeam = (req, res) => {
    try {
        const memberId = uuidv4();
        const member = req.body;
        console.log(req.body);
        const newMember = {
            id: memberId,
            name: member.name,
            title: member.title,
            linkedin: member.linkedin,
            facebook: member.facebook,
            instagram: member.instagram,
            image: req.file.filename
        };
        let oldData = readData();
        const city = member.city

        if (oldData[city]) {
            oldData[city].push(newMember);
        } else {
            oldData[city] = [newMember];
        }
        saveData(oldData);
        // res.status(200).send("New member added successfully.");
        res.status(200).redirect("/admin");

    } catch (error) {
        console.error("Error adding member:", error);
        res.status(500).send("Internal Server Error");

    }
}
exports.updateMemberTeam = async(req, res) => {
    try {
        console.log(req.body);
        const updatedMember = req.body;
        // console.log(updatedMember);
        const { city, id } = updatedMember;
        console.log(city);
        console.log(id);
        let oldData = readData();

        if (oldData[city]) {
            const cityMembers = oldData[city];
            const memberIndex = cityMembers.findIndex(member => member.id === id);
            // console.log(oldData[city][memberIndex].image);
            console.log(req.body.image);
            if (memberIndex !== -1) {
                // Update the existing member with the new data
                const oldImagePath = 'teams/img/' + oldData[city][memberIndex].image
                oldData[city][memberIndex] = updatedMember;
                oldData[city][memberIndex].image = req.file.filename
                await fs.promises.unlink(oldImagePath);
                saveData(oldData);
                // res.status(200).send("Member updated successfully.");
                res.status(200).redirect("/admin");
            } else {
                res.status(404).send("Member not found in the specified city.");
            }
        } else {
            res.status(400).send("City not found in the data.");
        }
    } catch (error) {
        console.error("Error updating member:", error);
        res.status(500).send("Internal Server Error");
    }
}



exports.deleteMemberTeam = async (req, res) => {
    try {
        const { city, id } = req.body;
        console.log(city, id);
        let oldData = readData();
        if (oldData[city]) {
            const cityMembers = oldData[city];
            const memberIndex = cityMembers.findIndex(member => member.id === id);
            if (memberIndex !== -1) {
                // Remove the member from the array
                let imgpath = 'teams/img/' + cityMembers[memberIndex].image
                await fs.promises.unlink(imgpath);
                oldData[city].splice(memberIndex, 1);
                saveData(oldData);
                // res.status(200).send("Member deleted successfully.");
                console.log("test");
                res.status(200).redirect("/admin");
            } else {
                res.status(404).send("Member not found in the specified city.");
            }
        } else {
            res.status(400).send("City not found in the data.");
        }
    } catch (error) {
        console.error("Error deleting member:", error);
        res.status(500).send("Internal Server Error");
    }
}
